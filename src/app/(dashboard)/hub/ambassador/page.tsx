import { PartnerHub } from "@/components/dashboard/PartnerHub";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const metadata = {
  title: "SinergIA | Portal do Parceiro",
  description: "Gerencie suas indicações e comissões do programa SinergIA Partners.",
};

export default function PartnerDashboardPage() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-8">
                <div className="max-w-6xl mx-auto">
                    <PartnerHub />
                </div>
            </div>
        </ProtectedRoute>
    );
}
