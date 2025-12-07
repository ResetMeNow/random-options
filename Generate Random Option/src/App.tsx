import { useState } from 'react';
import { CoinFlip } from './components/CoinFlip';
import { RouletteWheel } from './components/RouletteWheel';
import { LuckyClover } from './components/LuckyClover';
import { StarryBackground } from './components/StarryBackground';
import { Coins, CircleDot, Clover } from 'lucide-react';
import catMascot from 'figma:asset/6ba29ef617a86f3bbdfcf8275c8ce2e09df1e2f5.png';

type Section = 'coin' | 'roulette' | 'clover';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('coin');

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarryBackground />
      <div className="relative z-10 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 pt-8 relative">
            <div className="flex items-center justify-center gap-4 mb-2">
              <img 
                src={catMascot} 
                alt="Mascota" 
                className="w-16 h-16 object-contain drop-shadow-lg"
              />
            </div>
             <h1 className="text-white">Elecciones Aleatorias</h1>
            <p className="text-amber-200/80">Deja que el azar decida por ti</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-8 bg-indigo-950/40 p-2 rounded-2xl backdrop-blur-md border border-indigo-700/30">
            <button
              onClick={() => setActiveSection('coin')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                activeSection === 'coin'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-indigo-950 shadow-lg shadow-amber-500/50'
                  : 'text-amber-100 hover:bg-indigo-900/30'
              }`}
            >
              <Coins size={20} />
              <span>Moneda</span>
            </button>
            <button
              onClick={() => setActiveSection('roulette')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                activeSection === 'roulette'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-indigo-950 shadow-lg shadow-amber-500/50'
                  : 'text-amber-100 hover:bg-indigo-900/30'
              }`}
            >
              <CircleDot size={20} />
              <span>Ruleta</span>
            </button>
            <button
              onClick={() => setActiveSection('clover')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                activeSection === 'clover'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-indigo-950 shadow-lg shadow-amber-500/50'
                  : 'text-amber-100 hover:bg-indigo-900/30'
              }`}
            >
              <Clover size={20} />
              <span>Trébol</span>
            </button>
          </div>

          {/* Content Sections */}
          <div className="bg-indigo-950/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-indigo-700/30 p-8 min-h-[500px]">
            {activeSection === 'coin' && <CoinFlip />}
            {activeSection === 'roulette' && <RouletteWheel />}
            {activeSection === 'clover' && <LuckyClover />}
          </div>
        </div>
      </div>
    </div>
  );
}