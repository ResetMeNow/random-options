import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw } from 'lucide-react';
import coinCaraImage from 'figma:asset/84344df68285eff8a84f05421d28676dd5db8424.png';
import coinCruzImage from 'figma:asset/02fa77860b8473b1cc66f15fdd4b0e125a17ba37.png';

type Result = 'cara' | 'cruz' | null;

export function CoinFlip() {
  const [result, setResult] = useState<Result>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const flipCoin = () => {
    setIsFlipping(true);
    setResult(null);

    setTimeout(() => {
      const finalResult: Result = Math.random() > 0.5 ? 'cara' : 'cruz';
      setResult(finalResult);
      setIsFlipping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-amber-400 mb-4">Lanzar Moneda</h2>
      <p className="text-amber-100/80 mb-8 text-center">
        Cara o Cruz - Lanza la moneda y deja que el destino decida
      </p>

      <div className="mb-12 h-80 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isFlipping ? (
            <motion.div
              key="flipping"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 1800 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-64 h-64 relative flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img 
                src={coinCaraImage} 
                alt="Moneda girando" 
                className="w-full h-full object-contain drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 25px 50px rgba(251, 191, 36, 0.6)) blur(0.3px)' }}
              />
            </motion.div>
          ) : result ? (
            <motion.div
              key={result}
              initial={{ scale: 0, rotateY: 0 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="relative flex flex-col items-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-64 h-64 relative flex items-center justify-center mb-6">
                <img 
                  src={result === 'cara' ? coinCaraImage : coinCruzImage} 
                  alt={result === 'cara' ? 'Cara' : 'Cruz'}
                  className="w-full h-full object-contain drop-shadow-2xl"
                  style={{ 
                    filter: result === 'cara' 
                      ? 'drop-shadow(0 25px 50px rgba(251, 191, 36, 0.8)) brightness(1.1)' 
                      : 'drop-shadow(0 25px 50px rgba(161, 98, 58, 0.8)) brightness(1.05)',
                  }}
                />
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-indigo-900/70 backdrop-blur-md px-8 py-3 rounded-full border-2 border-amber-400/40 shadow-lg shadow-amber-500/30"
              >
                <span className={`uppercase tracking-widest text-lg ${
                  result === 'cara' ? 'text-amber-400' : 'text-amber-300/80'
                }`}>
                  {result}
                </span>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="initial"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-64 h-64 relative flex items-center justify-center"
            >
              <motion.img 
                src={coinCaraImage} 
                alt="Moneda" 
                className="w-full h-full object-contain drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(251, 191, 36, 0.5)) brightness(1.05)' }}
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={flipCoin}
        disabled={isFlipping}
        className="bg-gradient-to-r from-amber-500 to-yellow-500 text-indigo-950 px-8 py-4 rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-amber-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RotateCw size={20} className={isFlipping ? 'animate-spin' : ''} />
        {isFlipping ? 'Lanzando...' : 'Lanzar Moneda'}
      </button>
    </div>
  );
}