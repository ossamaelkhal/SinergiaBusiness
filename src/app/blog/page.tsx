import { BlogCard } from "@/components/blog/BlogCard";

export const metadata = {
    title: "Blog SinergIA - Automação e IA",
    description: "Artigos sobre automação, inteligência artificial e estratégias de vendas B2B.",
};

// Mock Data
const posts = [
    {
        slug: "como-automatizar-vendas-b2b",
        title: "Como automatizar suas vendas B2B com IA e n8n",
        excerpt: "Descubra como criar um funil de vendas 100% automático usando ferramentas low-code.",
        date: "12 de Out, 2024",
        author: "Equipe SinergIA",
        category: "Automação",
        imageUrl: "/blog/automation-cover.jpg" // Placeholder
    },
    {
        slug: "chatbots-humanizados",
        title: "Por que Chatbots Humanizados convertem 3x mais",
        excerpt: "A era dos bots robóticos acabou. Veja como a IA generativa mudou o jogo do atendimento.",
        date: "05 de Out, 2024",
        author: "Equipe SinergIA",
        category: "Inteligência Artificial",
        imageUrl: "/blog/chatbot-cover.jpg"
    },
    {
        slug: "guia-crm-whatsapp",
        title: "Guia Definitivo: Integrando CRM e WhatsApp",
        excerpt: "Passo a passo para conectar seu CRM ao WhatsApp Business API sem gastar uma fortuna.",
        date: "28 de Set, 2024",
        author: "Equipe SinergIA",
        category: "Tutoriais",
        imageUrl: "/blog/crm-cover.jpg"
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header */}
            <div className="bg-slate-950 py-20 text-center text-white border-b border-white/5">
                <h1 className="text-4xl font-bold mb-4">Blog SinergIA</h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Insights práticos sobre Automação, IA e Vendas para escalar sua operação.
                </p>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}
