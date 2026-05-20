import { SignUpForm } from "@/components/auth/SignUpForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Crie sua conta - SinergIA",
    description: "Comece a construir seu motor de aquisição B2B hoje mesmo.",
};

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-md w-full space-y-8 relative z-10 bg-slate-900/60 p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        Crie sua conta
                    </h1>
                    <p className="mt-2 text-slate-400">
                        Comece a construir seu motor de aquisição B2B
                    </p>
                </div>

                <Suspense fallback={<div className="text-slate-500 text-center py-4">Carregando formulário...</div>}>
                    <SignUpForm />
                </Suspense>
            </div>
        </div>
    );
}
