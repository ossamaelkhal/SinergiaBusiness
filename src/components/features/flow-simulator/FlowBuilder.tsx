import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    X, Play, Pause, Download, Plus, Trash2, Zap, MessageSquare, Mail,
    Database, Calendar, FileText, Users, BarChart3, Webhook, Bot, Clock,
    AlertCircle, LucideIcon
} from 'lucide-react'

interface NodeData {
    id: number
    title: string
    description: string
    type: string
    category: string
    x: number
    y: number
}

interface Connection {
    id: number
    from: number
    to: number
}

interface NodeTemplate {
    type: string
    title: string
    description: string
    category: string
}

interface FlowNodeProps {
    node: NodeData
    onDelete: (id: number) => void
    onConnect: (id: number) => void
    isConnecting: boolean
    onNodeClick: (node: NodeData) => void
    connections: Connection[]
}

const FlowNode: React.FC<FlowNodeProps> = ({ node, onDelete, onConnect, isConnecting, onNodeClick, connections }) => {
    const nodeIcons: Record<string, LucideIcon> = {
        trigger: Clock,
        action: Zap,
        condition: AlertCircle,
        webhook: Webhook,
        email: Mail,
        database: Database,
        calendar: Calendar,
        document: FileText,
        user: Users,
        analytics: BarChart3,
        bot: Bot,
        message: MessageSquare
    }

    const Icon = nodeIcons[node.type] || Zap
    const isConnected = connections.some(conn => conn.from === node.id || conn.to === node.id)

    return (
        <div
            className={`relative bg-slate-900/80 backdrop-blur-md border rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${isConnecting ? 'border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)] z-50' :
                    isConnected ? 'border-fuchsia-500/50 shadow-[0_0_30px_rgba(217,70,239,0.2)]' : 'border-white/10 hover:border-fuchsia-500/30 hover:shadow-[0_0_20px_rgba(217,70,239,0.1)]'
                }`}
            style={{
                left: node.x,
                top: node.y,
                position: 'absolute',
                width: '200px',
                minHeight: '130px'
            }}
            onClick={() => onNodeClick(node)}
        >
            <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner ${isConnected ? 'bg-fuchsia-500 border-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.5)]' : 'bg-slate-800 border-slate-700'
                    }`}>
                    <Icon className={`w-5 h-5 ${isConnected ? 'text-white' : 'text-fuchsia-400'}`} />
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onDelete(node.id)
                    }}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 border border-transparent hover:border-red-500/30 flex items-center justify-center transition-all text-slate-500 hover:text-red-400"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <h4 className="text-white font-bold text-sm mb-1 truncate">{node.title}</h4>
            <p className="text-slate-400 text-xs mb-3 line-clamp-2 leading-relaxed">{node.description}</p>

            <Badge className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${isConnected ? 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                {node.category}
            </Badge>

            {/* Connection Points */}
            <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
                <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer group`}
                    onClick={(e) => {
                        e.stopPropagation()
                        onConnect(node.id)
                    }}
                >
                    <div className={`w-3 h-3 rounded-full border-2 transition-all ${isConnected ? 'bg-fuchsia-500 border-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.5)]' : 'bg-slate-800 border-slate-600 group-hover:bg-fuchsia-500/50 group-hover:border-fuchsia-400 group-hover:scale-150'}`} />
                </div>
            </div>

            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
                <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer group`}
                    onClick={(e) => {
                        e.stopPropagation()
                        onConnect(node.id)
                    }}
                >
                    <div className={`w-3 h-3 rounded-full border-2 transition-all ${isConnected ? 'bg-fuchsia-500 border-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.5)]' : 'bg-slate-800 border-slate-600 group-hover:bg-fuchsia-500/50 group-hover:border-fuchsia-400 group-hover:scale-150'}`} />
                </div>
            </div>
        </div>
    )
}

interface ConnectionLineProps {
    connection: Connection
    nodes: NodeData[]
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({ connection, nodes }) => {
    const fromNode = nodes.find(n => n.id === connection.from)
    const toNode = nodes.find(n => n.id === connection.to)

    if (!fromNode || !toNode) return null

    const fromX = fromNode.x + 180
    const fromY = fromNode.y + 60
    const toX = toNode.x
    const toY = toNode.y + 60

    return (
        <svg
            className="absolute top-0 left-0 pointer-events-none"
            style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 8px rgba(217,70,239,0.5))' }}
        >
            <defs>
                <marker
                    id="arrowhead-fuchsia"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                >
                    <polygon
                        points="0 0, 10 3.5, 0 7"
                        fill="#d946ef"
                    />
                </marker>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#d946ef" />
                </linearGradient>
            </defs>
            <path
                d={`M ${fromX} ${fromY} C ${fromX + 80} ${fromY}, ${toX - 80} ${toY}, ${toX} ${toY}`}
                stroke="url(#line-gradient)"
                strokeWidth="3"
                fill="none"
                markerEnd="url(#arrowhead-fuchsia)"
                className="animate-pulse"
                strokeLinecap="round"
            />
        </svg>
    )
}

interface FlowBuilderProps {
    onClose?: () => void
    isInline?: boolean
    nicheSlug?: string
    onInteraction?: () => void
    onCompilar?: () => void
}

const getNicheInitialNodes = (nicheSlug?: string): NodeData[] => {
    switch (nicheSlug) {
        case 'faturamento-saude-bemestar':
        case 'saude':
            return [
                { id: 1, title: "Consulta Solicitada", description: "Paciente entra em contato via direct/WhatsApp", type: "trigger", category: "Trigger", x: 50, y: 150 },
                { id: 2, title: "IA Guardião da Agenda", description: "Propõe horários e qualifica de forma fluida", type: "bot", category: "IA", x: 300, y: 150 },
                { id: 3, title: "Sincronizar Prontuário", description: "Grava no ERP médico ou Agenda digital", type: "database", category: "Dados", x: 550, y: 150 }
            ]
        case 'commerce-omnichannel-vendas':
        case 'varejo':
            return [
                { id: 1, title: "Direct Instagram", description: "Comentário ou dúvida de produto no Direct", type: "trigger", category: "Trigger", x: 50, y: 150 },
                { id: 2, title: "IA Vendedor de Pista", description: "Responde dúvidas de frete, estoque e tamanho", type: "bot", category: "IA", x: 300, y: 150 },
                { id: 3, title: "Geração de Pix", description: "Gera link de pagamento e envia ao cliente", type: "database", category: "Dados", x: 550, y: 150 }
            ]
        case 'operacoes-urgencia-logistica':
        case 'logistica':
            return [
                { id: 1, title: "Pedido no WhatsApp", description: "Cliente envia foto de pedido/lista manuscrita", type: "trigger", category: "Trigger", x: 50, y: 150 },
                { id: 2, title: "IA OCR de Pedido", description: "Decodifica produtos, marcas e quantidades da foto", type: "bot", category: "IA", x: 300, y: 150 },
                { id: 3, title: "Despacho ERP", description: "Grava a cotação no ERP e avisa equipe de entrega", type: "database", category: "Dados", x: 550, y: 150 }
            ]
        case 'bpo-financeiro-credito-tem':
        case 'bpo':
        case 'financas':
            return [
                { id: 1, title: "Entrada de Fatura", description: "Fatura de telecom, energia ou água recebida", type: "trigger", category: "Trigger", x: 50, y: 150 },
                { id: 2, title: "IA Auditora de Contas", description: "Procura erros de tarifação e taxas ocultas", type: "bot", category: "IA", x: 300, y: 150 },
                { id: 3, title: "Contestação Automática", description: "Abre contestação automática no portal do provedor", type: "database", category: "Dados", x: 550, y: 150 }
            ]
        case 'servicos-tecnicos-comerciais':
        case 'servicos':
            return [
                { id: 1, title: "Pedido de Orçamento", description: "Cliente envia fotos e especificações técnicas", type: "trigger", category: "Trigger", x: 50, y: 150 },
                { id: 2, title: "IA Orçamentista Técnico", description: "Qualifica projeto e estima custos de materiais", type: "bot", category: "IA", x: 300, y: 150 },
                { id: 3, title: "Agendar Visita", description: "Reserva data na agenda do técnico", type: "calendar", category: "Agenda", x: 550, y: 150 }
            ]
        case 'reputacao-recuperacao-retencao':
        case 'reputacao':
        case 'cobranca':
            return [
                { id: 1, title: "Nova Reclamação", description: "Reclamação publicada no Reclame Aqui", type: "trigger", category: "Trigger", x: 50, y: 150 },
                { id: 2, title: "IA Triagem e Resolução", description: "Localiza CPF no ERP e gera estorno autorizado", type: "bot", category: "IA", x: 300, y: 150 },
                { id: 3, title: "Resposta Pública", description: "Publica resposta amigável e envia compensação", type: "message", category: "Comunicação", x: 550, y: 150 }
            ]
        default:
            return [
                { id: 1, title: "Novo Lead", description: "Quando um novo lead se cadastra", type: "trigger", category: "Trigger", x: 50, y: 100 },
                { id: 2, title: "Qualificar Lead", description: "IA analisa perfil e pontua", type: "bot", category: "IA", x: 300, y: 100 },
                { id: 3, title: "Enviar Email", description: "Email personalizado baseado na pontuação", type: "email", category: "Comunicação", x: 550, y: 100 }
            ]
    }
}

const FlowBuilder: React.FC<FlowBuilderProps> = ({ onClose, isInline = false, nicheSlug, onInteraction, onCompilar }) => {
    const [nodes, setNodes] = useState<NodeData[]>(() => getNicheInitialNodes(nicheSlug))

    const [connections, setConnections] = useState<Connection[]>([
        { id: 1, from: 1, to: 2 },
        { id: 2, from: 2, to: 3 }
    ])

    useEffect(() => {
        setNodes(getNicheInitialNodes(nicheSlug))
        setConnections([
            { id: 1, from: 1, to: 2 },
            { id: 2, from: 2, to: 3 }
        ])
    }, [nicheSlug])

    const [isPlaying, setIsPlaying] = useState(false)
    const [connectingFrom, setConnectingFrom] = useState<number | null>(null)
    const [draggedNode, setDraggedNode] = useState<number | null>(null)
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
    const canvasRef = useRef<HTMLDivElement>(null)

    const nodeTemplates: NodeTemplate[] = [
        { type: 'trigger', title: 'Webhook Trigger', description: 'Recebe dados externos', category: 'Trigger' },
        { type: 'action', title: 'Ação Personalizada', description: 'Executa ação específica', category: 'Ação' },
        { type: 'condition', title: 'Condição', description: 'Verifica condições', category: 'Lógica' },
        { type: 'email', title: 'Enviar Email', description: 'Dispara email automático', category: 'Comunicação' },
        { type: 'database', title: 'Salvar no BD', description: 'Armazena informações', category: 'Dados' },
        { type: 'bot', title: 'IA Assistant', description: 'Processa com IA', category: 'IA' },
        { type: 'calendar', title: 'Agendar', description: 'Cria evento no calendário', category: 'Agenda' },
        { type: 'message', title: 'Mensagem', description: 'Envia mensagem', category: 'Comunicação' }
    ]

    const addNode = (template: NodeTemplate) => {
        const newNode: NodeData = {
            id: Date.now(),
            title: template.title,
            description: template.description,
            type: template.type,
            category: template.category,
            x: Math.random() * 400 + 100,
            y: Math.random() * 300 + 150
        }
        setNodes([...nodes, newNode])
        if (onInteraction) onInteraction();
    }

    const deleteNode = (nodeId: number) => {
        setNodes(nodes.filter(n => n.id !== nodeId))
        setConnections(connections.filter(c => c.from !== nodeId && c.to !== nodeId))
        if (onInteraction) onInteraction();
    }

    const handleConnect = (nodeId: number) => {
        if (connectingFrom === null) {
            setConnectingFrom(nodeId)
        } else if (connectingFrom !== nodeId) {
            const newConnection: Connection = {
                id: Date.now(),
                from: connectingFrom,
                to: nodeId
            }
            setConnections([...connections, newConnection])
            setConnectingFrom(null)
            if (onInteraction) onInteraction();
        } else {
            setConnectingFrom(null)
        }
    }

    const handleMouseDown = (e: React.MouseEvent, node: NodeData) => {
        if (!canvasRef.current) return
        const rect = canvasRef.current.getBoundingClientRect()
        setDraggedNode(node.id)
        setDragOffset({
            x: e.clientX - rect.left - node.x,
            y: e.clientY - rect.top - node.y
        })
    }

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (draggedNode && canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect()
            const newX = e.clientX - rect.left - dragOffset.x
            const newY = e.clientY - rect.top - dragOffset.y

            setNodes(nodes => nodes.map(node =>
                node.id === draggedNode
                    ? { ...node, x: Math.max(0, newX), y: Math.max(0, newY) }
                    : node
            ))
        }
    }, [draggedNode, dragOffset])

    const handleMouseUp = useCallback(() => {
        if (draggedNode !== null) {
            if (onInteraction) onInteraction();
        }
        setDraggedNode(null)
    }, [draggedNode, onInteraction])

    useEffect(() => {
        if (draggedNode) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
            return () => {
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
            }
        }
    }, [draggedNode, handleMouseMove, handleMouseUp])

    const simulateFlow = () => {
        setIsPlaying(!isPlaying)
        // Simulation logic here
    }

    const exportFlow = () => {
        const flowData = {
            nodes,
            connections,
            metadata: {
                name: "Fluxo Tropa da Virada",
                created: new Date().toISOString(),
                version: "1.0"
            }
        }

        const blob = new Blob([JSON.stringify(flowData, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'tropa-virada-flow.json'
        a.click()
        URL.revokeObjectURL(url)
    }

    const innerContent = (
        <div className={`relative w-full bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(217,70,239,0.15)] flex flex-col ${isInline ? 'h-[75vh]' : 'max-w-7xl h-[90vh]'}`}>
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-900/40 backdrop-blur-xl z-20">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-fuchsia-500/20 border border-fuchsia-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                        <Webhook className="w-6 h-6 text-fuchsia-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold tracking-tight text-white">Construtor de Automações</h2>
                        <p className="text-fuchsia-200/60 text-sm">Arraste nós, conecte intenções e faça o deploy da sua IA</p>
                    </div>
                </div>
                {!isInline && onClose && (
                    <button onClick={onClose} className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 rounded-xl flex items-center justify-center transition-all text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar com componentes */}
                <div className="w-80 bg-slate-900/60 backdrop-blur-md border-r border-white/10 p-6 overflow-y-auto flex flex-col">
                    <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-4">Nodos Disponíveis</h3>

                    <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {nodeTemplates.map((template, index) => {
                            const Icon = template.type === 'trigger' ? Clock : template.type === 'bot' ? Bot : Zap;
                            return (
                                <div
                                    key={index}
                                    className="group bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer hover:bg-white/10 hover:border-fuchsia-500/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.1)] transition-all"
                                    onClick={() => addNode(template)}
                                >
                                    <div className="flex flex-col mb-2">
                                        <div className="flex items-center mb-2">
                                            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 group-hover:border-fuchsia-500/50 group-hover:bg-fuchsia-500/10 transition-colors mr-3">
                                                <Icon className="w-4 h-4 text-fuchsia-400 group-hover:text-fuchsia-300" />
                                            </div>
                                            <span className="text-white text-sm font-bold">{template.title}</span>
                                        </div>
                                        <p className="text-slate-400 text-xs leading-relaxed">{template.description}</p>
                                    </div>
                                    <Badge className="bg-slate-800 text-slate-300 border-slate-700 text-[10px] uppercase font-bold px-2 py-0 border group-hover:bg-fuchsia-500/20 group-hover:text-fuchsia-300 group-hover:border-fuchsia-500/30">
                                        {template.category}
                                    </Badge>
                                </div>
                            )
                        })}
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                        <h4 className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-3">Painel de Controle</h4>
                        <div className="space-y-3">
                            <button
                                onClick={() => {
                                    if (onCompilar) {
                                        onCompilar()
                                    } else {
                                        simulateFlow()
                                    }
                                }}
                                className={`w-full h-12 rounded-xl font-bold flex items-center justify-center transition-all ${isPlaying ? 'bg-amber-500 hover:bg-amber-400 text-amber-950 shadow-[0_0_20px_rgba(251,191,36,0.3)]' : 'bg-fuchsia-500 hover:bg-fuchsia-400 text-white shadow-[0_0_20px_rgba(217,70,239,0.3)]'}`}
                            >
                                {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2 -ml-1" />}
                                {isPlaying ? 'Pausar Simulação' : 'Compilar e Testar Infraestrutura'}
                            </button>

                            <button
                                onClick={exportFlow}
                                className="w-full h-12 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-bold flex items-center justify-center transition-all"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Exportar Schema
                            </button>
                        </div>
                    </div>

                    {connectingFrom && (
                        <div className="mt-6 p-4 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-xl animate-pulse">
                            <p className="text-fuchsia-300 text-sm font-medium flex items-center">
                                <Webhook className="w-4 h-4 mr-2" />
                                Conecte ao nodo destino...
                            </p>
                        </div>
                    )}
                </div>

                {/* Canvas principal */}
                <div className="flex-1 relative overflow-hidden bg-slate-950/50">
                    <div
                        ref={canvasRef}
                        className="w-full h-full relative"
                        style={{
                            backgroundImage: `
                                radial-gradient(circle at 1px 1px, rgba(217,70,239,0.15) 1px, transparent 0),
                                radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)
                            `,
                            backgroundSize: '40px 40px, 10px 10px, 10px 10px',
                            backgroundPosition: '0 0, 0 0'
                        }}
                    >
                        {/* Render connections */}
                        {connections.map(connection => (
                            <ConnectionLine
                                key={connection.id}
                                connection={connection}
                                nodes={nodes}
                            />
                        ))}

                        {/* Render nodes */}
                        {nodes.map(node => (
                            <div
                                key={node.id}
                                onMouseDown={(e: any) => handleMouseDown(e, node)}
                            >
                                <FlowNode
                                    node={node}
                                    onDelete={deleteNode}
                                    onConnect={handleConnect}
                                    isConnecting={connectingFrom === node.id}
                                    onNodeClick={() => { }}
                                    connections={connections}
                                />
                            </div>
                        ))}

                        {/* Instruções */}
                        {nodes.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center bg-slate-900/50 backdrop-blur-md border border-white/5 p-8 rounded-3xl">
                                    <div className="w-20 h-20 bg-fuchsia-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-fuchsia-500/20">
                                        <Webhook className="w-10 h-10 text-fuchsia-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Canvas Operacional Vazio</h3>
                                    <p className="text-slate-400 max-w-sm">Adicione os nodos da barra lateral esquerda e conecte as saídas para formar a sua automação inteligente.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Status bar */}
                    <div className="absolute bottom-6 inset-x-6 flex items-center justify-between text-sm">
                        <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 flex items-center space-x-6 shadow-xl">
                            <span className="text-slate-400">Nodos Instanciados: <strong className="text-white">{nodes.length}</strong></span>
                            <span className="w-px h-4 bg-white/10"></span>
                            <span className="text-slate-400">Pontes Ativas: <strong className="text-white">{connections.length}</strong></span>
                            <span className="w-px h-4 bg-white/10"></span>
                            <span className={`flex items-center font-bold ${isPlaying ? 'text-green-400' : 'text-slate-500'}`}>
                                <div className={`w-2 h-2 rounded-full mr-2 ${isPlaying ? 'bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 'bg-slate-700'}`} />
                                {isPlaying ? 'Telemetria Ligada' : 'Motores Desligados'}
                            </span>
                        </div>

                        <div className="bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20 rounded-xl px-4 py-2 shadow-xl flex items-center">
                            <Zap className="w-4 h-4 mr-2" />
                            Arraste para mover, clique nos conectores para ligar
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    if (isInline) {
        return innerContent
    }

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-hidden">
            {/* Liquid Glass Background Accents */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-40 pointer-events-none"></div>
            {innerContent}
        </div>
    )
}

export default FlowBuilder
