'use client'

import React, { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, Send, User, Bot, Calendar, ChevronDown, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { sendWebhookEvent } from '@/utils/webhook'

interface Message {
  id: string
  text: string
  sender: 'bot' | 'user'
  type?: 'text' | 'options' | 'calendar'
  options?: string[]
}

export default function SinergiaBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [inputText, setInputText] = useState('')
  const [currentStep, setCurrentStep] = useState(0) // Control flow
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Initial proactive message after 3 seconds on the site
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted && messages.length === 0) {
        setMessages([
          {
            id: 'init-1',
            text: 'Olá! Sou a SinergIA, sua arquiteta de soluções de IA em tempo real.',
            sender: 'bot',
            type: 'text'
          },
          {
            id: 'init-2',
            text: 'Qual é o maior gargalo operacional ou de vendas na sua empresa hoje?',
            sender: 'bot',
            type: 'text'
          }
        ])
      }
    }, 4000)

    return () => clearTimeout(timer)
  }, [hasInteracted, messages.length])

  const addBotMessage = (message: Omit<Message, 'id' | 'sender'>, delay: number = 1000) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { ...message, id: Date.now().toString(), sender: 'bot' }])
      setIsTyping(false)
    }, delay)
  }

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputText.trim()) return

    const userText = inputText.trim()
    setInputText('')
    setHasInteracted(true)

    // Append User Message
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userText, sender: 'user', type: 'text' }])
    
    // Send to n8n Webhook
    sendWebhookEvent({
      source: 'sinergia_bot',
      leadData: {},
      eventData: {
        step: currentStep,
        userInput: userText,
        intent: 'Qualificação BANT - Texto Livre'
      }
    })

    // Consultative Sales Logic Emulation (LLM Mock)
    if (currentStep === 0) {
      setCurrentStep(1)
      addBotMessage({
        text: `Entendo. Problemas relacionados a "${userText.substring(0, 30)}..." costumam drenar até 40% da margem de lucro de operações B2B.`,
        type: 'text'
      }, 1500)
      
      addBotMessage({
        text: 'Nós resolvemos isso com agentes autônomos que assumem essas tarefas 24/7 sem erro humano. Qual o volume aproximado de atendimentos/processos que sua equipe lida mensalmente hoje?',
        type: 'text'
      }, 3000)
    } 
    else if (currentStep === 1) {
      setCurrentStep(2)
      addBotMessage({
        text: `Perfeito. Com esse volume, implementar nossa infraestrutura de I.A. traria um ROI positivo logo nos primeiros 45 dias.`,
        type: 'text'
      }, 2000)
      
      addBotMessage({
        text: 'Nossa abordagem é 100% consultiva: analisamos seu sistema atual, mapeamos o fluxo e construímos a automação dedicada. Qual formato você prefere para darmos o próximo passo?',
        type: 'options',
        options: ['Quero um Mapeamento Gratuito com Engenheiro', 'Quero testar um playbook por conta própria']
      }, 4000)
    }
  }

  const handleOptionClick = (option: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), text: option, sender: 'user', type: 'text' }])
    setHasInteracted(true)

    if (option.includes('Mapeamento')) {
      addBotMessage({
        text: 'Excelente escolha. Antes de reservarmos sua consultoria com o Engenheiro C-Level, precisamos de um alinhamento ético de valores fundamental:',
        type: 'text'
      }, 1000);
      addBotMessage({
        text: 'Se você busca uma IA cega para demitir pessoas e robotizar sua marca, a SinergIA OS não é para você. Nosso Pacto de Humanidade garante que a ferramenta sirva ao artesão. Você está pronto para emancipar seu time e lucrar com consciência?',
        type: 'options',
        options: [
          'Sim, estou pronto para emancipar meu time e lucrar com consciência.',
          'Não, busco apenas redução fria de headcount.'
        ]
      }, 2200);
    } else if (option.includes('Sim, estou pronto')) {
      addBotMessage({
        text: 'Espetacular! Alinhamento de valores e Manifesto confirmado. Tecnologia com Alma, Crescimento com Consciência.',
        type: 'text'
      }, 1000);
      addBotMessage({
        text: 'Selecione a data abaixo na agenda do especialista:',
        type: 'calendar'
      }, 2200);
    } else if (option.includes('Não, busco apenas')) {
      addBotMessage({
        text: 'A SinergIA OS não opera sob a lógica da desumanização. Nossos algoritmos existem para amplificar o intelecto, não para silenciar a alma do seu negócio. Se mudar de ideia, estamos aqui.',
        type: 'text'
      }, 1000);
    } else {
      addBotMessage({
        text: 'Sem problemas. Acesse a guia "Soluções" no menu para visualizar nossos Playbooks Self-Service.',
        type: 'text'
      }, 1500);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[360px] sm:w-[400px] h-[600px] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
          
          {/* Glass background overlay */}
          <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
          </div>

          {/* Header */}
          <div className="bg-slate-950/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-between relative z-10 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                  <Bot className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm tracking-tight">Especialista SinergIA</h3>
                <p className="text-emerald-400/80 text-xs font-medium flex items-center">
                   IA Consultiva Ativa
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar relative z-10 flex flex-col">
            <div className="text-center text-xs text-slate-500 font-medium mb-4 uppercase tracking-widest border-b border-white/5 pb-4">
              Sessão Privada e Criptografada
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300 w-full`}>
                {msg.sender === 'bot' && msg.type !== 'options' && msg.type !== 'calendar' && (
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 ml-1">SinergIA Bot</span>
                )}
                <div className={`max-w-[85%] ${msg.sender === 'user' ? 'bg-emerald-500 text-slate-950 rounded-2xl rounded-tr-sm' : 'bg-slate-800/80 backdrop-blur-sm border border-white/10 text-slate-200 rounded-2xl rounded-tl-sm'} p-3.5 shadow-sm text-sm leading-relaxed relative`}>
                  {msg.text}
                  
                  {/* Options Render */}
                  {msg.type === 'options' && msg.options && (
                    <div className="mt-4 flex flex-col gap-2 w-full">
                       {msg.options.map((opt, i) => (
                         <button 
                           key={i}
                           onClick={() => handleOptionClick(opt)}
                           className="w-full text-left bg-slate-900 hover:bg-emerald-500/20 shadow-md border border-white/10 hover:border-emerald-500/50 text-emerald-400 hover:text-white rounded-xl px-4 py-3 text-xs font-bold transition-all group"
                         >
                           <span className="group-hover:translate-x-1 transition-transform inline-block">{opt}</span>
                         </button>
                       ))}
                    </div>
                  )}

                  {/* Calendar/Booking Render */}
                  {msg.type === 'calendar' && (
                     <div className="mt-4 bg-slate-950/80 border border-emerald-500/30 rounded-xl p-4 cursor-pointer hover:bg-white/5 transition-colors group">
                        <div className="flex items-center gap-3 mb-2">
                           <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-indigo-400" />
                           </div>
                           <div>
                              <div className="text-white font-bold text-sm">Reserva Estrutural (30m)</div>
                              <div className="text-slate-400 text-xs">Engenheiro SinergIA</div>
                           </div>
                        </div>
                        <div className="flex items-center text-emerald-400 text-xs font-bold uppercase mt-3 pt-3 border-t border-white/10">
                           <CheckCircle2 className="w-4 h-4 mr-1.5" />
                           Acessar Calendário Exclusivo
                        </div>
                     </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800/80 backdrop-blur-sm border border-white/10 p-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 bg-emerald-500/80 rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-emerald-500/80 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                   <div className="w-1.5 h-1.5 bg-emerald-500/80 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-slate-950/80 backdrop-blur-md border-t border-white/10 relative z-10 flex gap-2 w-full">
             <input 
               type="text"
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               placeholder="Descreva seu desafio operacional..."
               className="flex-1 h-12 bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all shadow-inner"
             />
             <button 
                type="submit" 
                disabled={!inputText.trim()}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  inputText.trim() 
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950 shadow-[0_0_15px_rgba(52,211,153,0.3)]' 
                    : 'bg-white/5 border border-white/10 text-slate-600'
                }`}
             >
                <Send className="w-5 h-5 ml-0.5" />
             </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => {
            setIsOpen(true)
            setHasInteracted(true) // Stops initial timer
          }}
          className="group relative flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 rounded-[1.2rem] shadow-[0_0_40px_rgba(20,184,166,0.5)] transition-all duration-300 hover:scale-105 border border-white/20"
        >
          {/* Unread badge logic: if they haven't interacted, show dot after 3 secs */}
          {(!hasInteracted && messages.length > 0) && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 border-2 border-slate-900"></span>
            </span>
          )}
          
          <MessageSquare className="w-7 h-7 text-emerald-950 group-hover:scale-110 transition-transform duration-300 fill-emerald-950" />
        </button>
      )}
    </div>
  )
}
