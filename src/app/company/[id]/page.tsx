import { CompanyDetails } from "@/components/dashboard/CompanyDetails";

export const dynamic = 'force-dynamic';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Detalhes da Empresa - SinergIA",
    description: "Gerencie leads e informações da empresa.",
};

export default function CompanyDetailsPage() {
    return <CompanyDetails />;
}
