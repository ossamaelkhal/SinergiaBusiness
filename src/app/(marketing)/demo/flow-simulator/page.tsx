import { Suspense } from 'react';
import InteractiveLabsClient from './InteractiveLabsClient';

export const dynamic = 'force-dynamic';

export default function InteractiveLabsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-sans">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 animate-pulse text-sm">Carregando SinergIA Interactive Labs...</p>
        </div>
      </div>
    }>
      <InteractiveLabsClient />
    </Suspense>
  );
}
