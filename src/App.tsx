import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { CheckCircle2 } from 'lucide-react';

export const MainApp: React.FC = () => {
  const { toastMessage } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between pb-20 md:pb-8">
      <div>
        {/* Top Sticky Navbar */}
        <Navbar />

        {/* Main Application */}
        <main>
          <FarmerDashboard />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 bg-slate-900/95 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return <MainApp />;
}
