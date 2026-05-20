import { Dashboard } from "@/components/dashboard/Dashboard";

export const dynamic = 'force-dynamic';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - SinergIA",
    description: "Gerencie suas empresas e sistemas de IA.",
};

export default function DashboardPage() {
    return <Dashboard />;
}
