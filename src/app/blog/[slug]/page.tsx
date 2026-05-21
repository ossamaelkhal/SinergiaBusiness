import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock Data Source (same as listing for now)
const posts: Record<string, { title: string; content: string; date: string; category: string }> = {
    "como-automatizar-vendas-b2b": {
        title: "Como automatizar suas vendas B2B com IA e n8n",
        date: "12 de Out, 2024",
        category: "Automação",
        content: `
      <p class="mb-4">A automação de vendas B2B não é mais o futuro, é o presente. Empresas que não adotam ferramentas como n8n, Zapier e CRMs integrados estão deixando dinheiro na mesa.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Por que n8n?</h2>
      <p class="mb-4">O n8n permite criar fluxos complexos sem custo de licença por usuário, diferentemente de outras ferramentas. Com ele, você pode conectar seu formulário do site diretamente ao WhatsApp do vendedor.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">O Fluxo Ideal</h2>
      <ul class="list-disc pl-5 space-y-2 mb-4">
        <li>Lead preenche formulário</li>
        <li>n8n captura dados e enriquece com IA</li>
        <li>Lead é classificado (Hot/Warm/Cold)</li>
        <li>Mensagem personalizada é enviada no WhatsApp</li>
      </ul>

      <p class="mb-4">Quer implementar isso na sua empresa? Conheça nossos Playbooks.</p>
    `
    },
    "chatbots-humanizados": {
        title: "Por que Chatbots Humanizados convertem 3x mais",
        date: "05 de Out, 2024",
        category: "Inteligência Artificial",
        content: `
      <p class="mb-4">Ninguém gosta de falar com robôs que não entendem o contexto. A nova geração de chatbots, impulsionada por LLMs, muda esse jogo.</p>
    `
    },
    "guia-crm-whatsapp": {
        title: "Guia Definitivo: Integrando CRM e WhatsApp",
        date: "28 de Set, 2024",
        category: "Tutoriais",
        content: `
      <p class="mb-4">WhatsApp é o canal #1 de vendas no Brasil. Se ele não está no seu CRM, você está cego.</p>
    `
    }
};

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = posts[params.slug];

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-slate-950 text-slate-100 pb-20">
            {/* Header Image Area (Placeholder) */}
            <div className="pt-20 h-80 md:h-[400px] bg-slate-900/40 w-full relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950"></div>
                <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8 relative z-10">
                    <Link href="/blog">
                        <Button variant="ghost" className="mb-6 hover:bg-white/10 text-white">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o Blog
                        </Button>
                    </Link>
                    <div className="flex gap-2 mb-4">
                        <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2.5 py-0.5 rounded border border-emerald-500/20">{post.category}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
                    <p className="text-slate-400">{post.date} • Leitura de 5 min</p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-3xl mt-8 text-slate-300">
                <div
                    className="prose prose-lg prose-invert hover:prose-a:text-emerald-400"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="mt-16 pt-8 border-t border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-white">Gostou deste conteúdo?</h3>
                    <p className="mb-6 text-slate-400">Inscreva-se na nossa newsletter para receber dicas semanais de automação.</p>
                    <div className="flex gap-2">
                        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold">Inscrever-se</Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
