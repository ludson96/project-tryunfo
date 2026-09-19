import React from 'react';

interface NavbarProps {
  activeTab: 'creator' | 'battle';
  setActiveTab: (tab: 'creator' | 'battle') => void;
  deckCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, deckCount }) => {
  return (
    <header className="border-b border-[rgba(144,144,144,0.25)] bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Marca / Logo */}
        <div>
          <h2 className="font-heading font-extrabold text-base tracking-widestHeader text-black mb-0">
            TRYUNFO
          </h2>
          <p className="text-[11px] text-[#888888] tracking-widestHeader uppercase font-heading">
            Deck Builder & Battle
          </p>
        </div>

        {/* Links / Abas estilo botões Paradigm Shift */}
        <nav className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('creator')}
            className={`btn-paradigm text-xs py-1 px-4 h-9 ${activeTab === 'creator' ? 'primary' : ''
              }`}
          >
            Coleção ({deckCount})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('battle')}
            className={`btn-paradigm text-xs py-1 px-4 h-9 ${activeTab === 'battle' ? 'primary' : ''
              }`}
          >
            Modo Batalha
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
