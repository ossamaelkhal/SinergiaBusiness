import React, { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  X, 
  Play, 
  Pause, 
  Download, 
  Plus, 
  Trash2, 
  Settings, 
  Zap, 
  MessageSquare, 
  Mail, 
  Database, 
  Calendar, 
  FileText,
  Users,
  BarChart3,
  Webhook,
  Bot,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const FlowNode = ({ node, onDelete, onConnect, isConnecting, onNodeClick, connections }) => {
  const nodeIcons = {
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
      className={`relative bg-white/10 border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
        isConnecting ? 'border-yellow-400 shadow-lg shadow-yellow-400/20' : 
        isConnected ? 'border-green-400 shadow-lg shadow-green-400/20' : 'border-white/20'
      }`}
      style={{ 
        left: node.x, 
        top: node.y, 
        position: 'absolute',
        width: '180px',
        minHeight: '120px'
      }}
      onClick={() => onNodeClick(node)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isConnected ? 'bg-green-500' : 'bg-purple-500'
        }`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation()
            onDelete(node.id)
          }}
          className="text-red-400 hover:text-red-300"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <h4 className="text-white font-semibold text-sm mb-1">{node.title}</h4>
      <p className="text-white/70 text-xs mb-3">{node.description}</p>
      
      <Badge className={`text-xs ${
        isConnected ? 'bg-green-500/20 text-green-300' : 'bg-purple-500/20 text-purple-300'
      }`}>
        {node.category}
      </Badge>

      {/* Connection Points */}
      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
        <div 
          className={`w-4 h-4 rounded-full border-2 cursor-pointer transition-all ${
            isConnected ? 'bg-green-500 border-green-400' : 'bg-white/20 border-white/40 hover:bg-white/40'
          }`}
          onClick={(e) => {
            e.stopPropagation()
            onConnect(node.id)
          }}
        />
      </div>
      
      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
        <div 
          className={`w-4 h-4 rounded-full border-2 cursor-pointer transition-all ${
            isConnected ? 'bg-green-500 border-green-400' : 'bg-white/20 border-white/40 hover:bg-white/40'
          }`}
          onClick={(e) => {
            e.stopPropagation()
            onConnect(node.id)
          }}
        />
      </div>
    </div>
  )
}

const ConnectionLine = ({ connection, nodes }) => {
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
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="#10b981"
          />
        </marker>
      </defs>
      <path
        d={`M ${fromX} ${fromY} Q ${fromX + 50} ${fromY} ${toX} ${toY}`}
        stroke="#10b981"
        strokeWidth="3"
        fill="none"
        markerEnd="url(#arrowhead)"
        className="animate-pulse"
      />
    </svg>
  )
}

export default function EnhancedFlowSimulator({ onClose }) {
  const [nodes, setNodes] = useState([
    {
      id: 1,
      title: "Novo Lead",
      description: "Quando um novo lead se cadastra",
      type: "trigger",
      category: "Trigger",
      x: 50,
      y: 100
    },
    {
      id: 2,
      title: "Qualificar Lead",
      description: "IA analisa perfil e pontua",
      type: "bot",
      category: "IA",
      x: 300,
      y: 100
    },
    {
      id: 3,
      title: "Enviar Email",
      description: "Email personalizado baseado na pontuação",
      type: "email",
      category: "Comunicação",
      x: 550,
      y: 100
    }
  ])

  const [connections, setConnections] = useState([
    { id: 1, from: 1, to: 2 },
    { id: 2, from: 2, to: 3 }
  ])

  const [isPlaying, setIsPlaying] = useState(false)
  const [connectingFrom, setConnectingFrom] = useState(null)
  const [selectedNodeType, setSelectedNodeType] = useState('action')
  const [draggedNode, setDraggedNode] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const canvasRef = useRef(null)

  const nodeTemplates = [
    { type: 'trigger', title: 'Webhook Trigger', description: 'Recebe dados externos', category: 'Trigger' },
    { type: 'action', title: 'Ação Personalizada', description: 'Executa ação específica', category: 'Ação' },
    { type: 'condition', title: 'Condição', description: 'Verifica condições', category: 'Lógica' },
    { type: 'email', title: 'Enviar Email', description: 'Dispara email automático', category: 'Comunicação' },
    { type: 'database', title: 'Salvar no BD', description: 'Armazena informações', category: 'Dados' },
    { type: 'bot', title: 'IA Assistant', description: 'Processa com IA', category: 'IA' },
    { type: 'calendar', title: 'Agendar', description: 'Cria evento no calendário', category: 'Agenda' },
    { type: 'message', title: 'Mensagem', description: 'Envia mensagem', category: 'Comunicação' }
  ]

  const addNode = (template) => {
    const newNode = {
      id: Date.now(),
      title: template.title,
      description: template.description,
      type: template.type,
      category: template.category,
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 150
    }
    setNodes([...nodes, newNode])
  }

  const deleteNode = (nodeId) => {
    setNodes(nodes.filter(n => n.id !== nodeId))
    setConnections(connections.filter(c => c.from !== nodeId && c.to !== nodeId))
  }

  const handleConnect = (nodeId) => {
    if (connectingFrom === null) {
      setConnectingFrom(nodeId)
    } else if (connectingFrom !== nodeId) {
      const newConnection = {
        id: Date.now(),
        from: connectingFrom,
        to: nodeId
      }
      setConnections([...connections, newConnection])
      setConnectingFrom(null)
    } else {
      setConnectingFrom(null)
    }
  }

  const handleMouseDown = (e, node) => {
    const rect = canvasRef.current.getBoundingClientRect()
    setDraggedNode(node.id)
    setDragOffset({
      x: e.clientX - rect.left - node.x,
      y: e.clientY - rect.top - node.y
    })
  }

  const handleMouseMove = useCallback((e) => {
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
    setDraggedNode(null)
  }, [])

  React.useEffect(() => {
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
    // Aqui você pode adicionar lógica de simulação
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

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl h-[90vh] bg-slate-900/95 border-white/20 overflow-hidden">
        <CardHeader className="border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-2xl">🔄 Simulador de Fluxos Avançado</CardTitle>
              <CardDescription className="text-white/70">
                Monte fluxos de automação com drag & drop, conexões visuais e simulação em tempo real
              </CardDescription>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10">
              <X className="w-6 h-6" />
            </Button>
          </div>
        </CardHeader>

        <div className="flex h-full">
          {/* Sidebar com componentes */}
          <div className="w-80 bg-black/20 border-r border-white/10 p-4 overflow-y-auto">
            <h3 className="text-white font-semibold mb-4">Componentes Disponíveis</h3>
            
            <div className="space-y-2">
              {nodeTemplates.map((template, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/10 transition-all"
                  onClick={() => addNode(template)}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white text-sm font-medium">{template.title}</span>
                  </div>
                  <p className="text-white/60 text-xs">{template.description}</p>
                  <Badge className="mt-2 bg-purple-500/20 text-purple-300 text-xs">
                    {template.category}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <h4 className="text-white font-semibold mb-3">Controles</h4>
              <div className="space-y-2">
                <Button 
                  onClick={simulateFlow}
                  className={`w-full ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                >
                  {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isPlaying ? 'Pausar' : 'Simular'}
                </Button>
                
                <Button 
                  onClick={exportFlow}
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar para n8n
                </Button>
              </div>
            </div>

            {connectingFrom && (
              <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-300 text-sm">
                  🔗 Modo de conexão ativo. Clique em outro nó para conectar.
                </p>
              </div>
            )}
          </div>

          {/* Canvas principal */}
          <div className="flex-1 relative overflow-hidden">
            <div 
              ref={canvasRef}
              className="w-full h-full relative bg-gradient-to-br from-slate-800/50 to-purple-900/50"
              style={{ 
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
                backgroundSize: '20px 20px'
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
                  onMouseDown={(e) => handleMouseDown(e, node)}
                >
                  <FlowNode
                    node={node}
                    onDelete={deleteNode}
                    onConnect={handleConnect}
                    isConnecting={connectingFrom === node.id}
                    onNodeClick={() => {}}
                    connections={connections}
                  />
                </div>
              ))}

              {/* Instruções */}
              {nodes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <Plus className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">Canvas Vazio</h3>
                    <p>Clique nos componentes da sidebar para adicionar nós ao fluxo</p>
                  </div>
                </div>
              )}
            </div>

            {/* Status bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm border-t border-white/10 p-3">
              <div className="flex items-center justify-between text-sm text-white/70">
                <div className="flex items-center space-x-4">
                  <span>Nós: {nodes.length}</span>
                  <span>Conexões: {connections.length}</span>
                  <span className={`flex items-center ${isPlaying ? 'text-green-400' : 'text-white/50'}`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-white/30'}`} />
                    {isPlaying ? 'Simulando...' : 'Parado'}
                  </span>
                </div>
                
                <div className="text-xs">
                  💡 Dica: Arraste os nós para reposicionar, clique nos pontos de conexão para ligar
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

