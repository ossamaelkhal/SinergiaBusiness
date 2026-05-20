'use client'

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { addCompany, getCompaniesStream } from '@/services/firestoreService';
import { isValidCNPJ } from '@/utils/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Helper for CNPJ mask
const maskCNPJ = (value: string) => {
    if (!value) return "";
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\/)/, "$1/$2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
    return value.slice(0, 18);
};

interface CompanyFormData {
    companyName: string;
    companyCnpj?: string;
}

export function Dashboard() {
    const { user, logout } = useAuth(); // Ensure logout is available in AuthProvider
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<CompanyFormData>();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [companies, setCompanies] = useState<any[]>([]); // Use proper type if available

    const companyCnpj = watch("companyCnpj");

    const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValue('companyCnpj', maskCNPJ(value));
    };

    useEffect(() => {
        if (user?.uid) {
            const unsubscribe = getCompaniesStream(user.uid, (fetchedCompanies: any[]) => {
                setCompanies(fetchedCompanies);
            });
            return () => unsubscribe();
        }
    }, [user]);

    async function handleLogout() {
        try {
            if (logout) {
                await logout();
                router.push('/login');
            } else {
                console.error("Logout function not available");
            }
        } catch (error) {
            console.error("Falha ao fazer logout", error);
        }
    }

    const onAddCompany = async (data: CompanyFormData) => {
        if (!user?.uid) return;
        setLoading(true);
        setError('');
        try {
            await addCompany({ name: data.companyName, cnpj: data.companyCnpj }, user.uid);
            reset();
        } catch (err) {
            setError("Não foi possível adicionar a empresa. Tente novamente.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900">SinergIA Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        {user && <span className="text-gray-700">Olá, {user.email}</span>}
                        <Button onClick={handleLogout} variant="destructive">Sair</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <Card className="">
                                <CardHeader className="">
                                    <CardTitle className="">Adicionar Nova Empresa</CardTitle>
                                </CardHeader>
                                <CardContent className="">
                                    <form onSubmit={handleSubmit(onAddCompany)} className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="companyName" className="">Nome da Empresa</Label>
                                            <Input
                                                id="companyName"
                                                type="text"
                                                className=""
                                                placeholder="Ex: Acme Inc."
                                                {...register("companyName", { required: "O nome da empresa é obrigatório" })}
                                            />
                                            {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="companyCnpj" className="">CNPJ (Opcional)</Label>
                                            <Input
                                                id="companyCnpj"
                                                type="text"
                                                className=""
                                                placeholder="00.000.000/0000-00"
                                                {...register("companyCnpj", {
                                                    validate: value => !value || isValidCNPJ(value) || "CNPJ inválido",
                                                })}
                                                onChange={handleCnpjChange}
                                                value={companyCnpj || ''}
                                            />
                                            {errors.companyCnpj && <p className="text-red-500 text-sm">{errors.companyCnpj.message}</p>}
                                        </div>
                                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                                        <Button type="submit" className="w-full" variant="default" disabled={loading}>
                                            {loading ? 'Adicionando...' : 'Adicionar Empresa'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="lg:col-span-2">
                            <Card className="">
                                <CardHeader className="">
                                    <CardTitle className="">Minhas Empresas</CardTitle>
                                </CardHeader>
                                <CardContent className="">
                                    {companies.length > 0 ? (
                                        <ul className="space-y-3">
                                            {companies.map(company => (
                                                <Link href={`/company/${company.id}`} key={company.id}>
                                                    <li className="flex justify-between items-start p-4 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-gray-800">{company.name}</span>
                                                            {company.cnpj && <span className="text-sm text-gray-600">CNPJ: {company.cnpj}</span>}
                                                        </div>
                                                        <span className="text-sm text-gray-500 text-right shrink-0 ml-4">
                                                            Criado em: {company.createdAt?.toDate ? company.createdAt.toDate().toLocaleDateString() : 'N/A'}
                                                        </span>
                                                    </li>
                                                </Link>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-center text-gray-500">Nenhuma empresa adicionada ainda. Comece adicionando uma!</p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
