import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: string;
    imageUrl?: string;
}

export function BlogCard({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group">
            <Card className="h-full overflow-hidden transition-all hover:shadow-lg border-slate-200">
                <div className="aspect-video w-full bg-slate-100 relative overflow-hidden">
                    {/* Placeholder for image - using a colored div for now if no image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-purple-100 flex items-center justify-center text-slate-400">
                        {post.imageUrl && !post.imageUrl.includes('placeholder') ? (
                            // In a real app, use next/image here
                            <span className="text-sm">Imagem do Post</span>
                        ) : (
                            <span className="text-4xl">📝</span>
                        )}
                    </div>
                </div>
                <CardHeader className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                            {post.category}
                        </Badge>
                        <div className="flex items-center text-xs text-slate-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            {post.date}
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-500 line-clamp-3 text-sm">
                        {post.excerpt}
                    </p>
                </CardContent>
                <CardFooter className="pt-0">
                    <span className="text-sm font-medium text-orange-600 group-hover:underline">Ler artigo completo →</span>
                </CardFooter>
            </Card>
        </Link>
    );
}
