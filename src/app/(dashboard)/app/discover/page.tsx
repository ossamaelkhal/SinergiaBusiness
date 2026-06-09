import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DiscoverClient from "./DiscoverClient";
import * as fbHelper from '@/lib/firebase-admin-helper';

export const metadata = {
  title: "Sala de Descoberta | SinergIA",
  description: "Seu motor de aquisição está quase pronto.",
};

export default async function DiscoverPage() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('sinergia_session')?.value;

  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const finalLead = await fbHelper.getLeadFromSession(sessionCookie);
    if (!finalLead) {
      redirect('/login');
    }
    return <DiscoverClient lead={finalLead} />;
  } catch (error) {
    console.error('Falha ao autenticar no Discover Page:', error);
    redirect('/login');
  }

}
