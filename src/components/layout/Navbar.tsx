import React, { useState } from 'react';
import {
  Sprout,
  MapPin,
  Globe,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LanguageCode } from '../../types';

export const Navbar: React.FC = () => {
  const { user, language, setLanguage, setActiveTab } = useApp();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('agent')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">AgriAgent</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5" /> Groq AI
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">Intelligent Market Negotiation & APMC Pricing</p>
            </div>
          </div>

          {/* Location & Context Badge */}
          <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>{user.location}</span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> APMC Verified
            </span>
          </div>

          {/* Controls: Groq Engine & Language */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Backend AI Status Badge */}
            <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Cpu className="w-3.5 h-3.5 text-emerald-600" />
              <span>Groq LPU Engine</span>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Select Language</div>
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.code); setLangMenuOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 transition-colors ${
                        language === l.code ? 'font-bold text-emerald-800 bg-emerald-50/60' : 'text-slate-700'
                      }`}
                    >
                      <span>{l.native}</span>
                      <span className="text-[11px] text-slate-400 font-normal">({l.label})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
