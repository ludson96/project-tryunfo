import React from 'react';
import { Layers, Swords, Github, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'creator' | 'battle';
  setActiveTab: (tab: 'creator' | 'battle') => void;
  deckCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, deckCount }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Marca */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-0.5 shadow-glow-cyan">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <h1 className="font-display font-extrabold text-xl tracking-wider text-white flex items-center gap-1.5">
              TRYUNFO <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">2.0</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">Deck Builder & Battle Arena</p>
          </div>
        </div>

        {/* Abas de Navegação */}
        <nav className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('creator')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'creator'
                ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Coleção & Deck ({deckCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('battle')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'battle'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold shadow-md shadow-glow-purple'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Swords className="w-3.5 h-3.5 text-amber-400" />
            <span>Modo Batalha</span>
          </button>
        </nav>

        {/* GitHub Link */}
        <div className="hidden sm:flex items-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-slate-700"
          >
            <Github className="w-4 h-4" />
            <span>Código Fonte</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
