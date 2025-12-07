import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Plus, Trash2 } from 'lucide-react';

export function RouletteWheel() {
  const [options, setOptions] = useState<string[]>(['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4']);
  const [inputValue, setInputValue] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);

  const colors = [
    '#ef4444', '#f59e0b', '#10b981', '#3b82f6',
    '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'
  ];

  const addOption = () => {
    if (inputValue.trim() && options.length < 12) {
      setOptions([...options, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const spinWheel = () => {
    if (isSpinning || options.length < 2) return;

    setIsSpinning(true);
    setWinner(null);

    const spins = 5 + Math.random() * 3;
    const randomDegree = Math.random() * 360;
    const totalRotation = rotation + spins * 360 + randomDegree;

    setRotation(totalRotation);

    setTimeout(() => {
      const segmentAngle = 360 / options.length;
      const normalizedRotation = totalRotation % 360;
      const winnerIndex = Math.floor(((360 - normalizedRotation + 90) % 360) / segmentAngle);
      setWinner(options[winnerIndex]);
      setIsSpinning(false);
    }, 4000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addOption();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-amber-400 mb-4">Ruleta de la Suerte</h2>
      <p className="text-amber-100/80 mb-6 text-center">
        Gira la ruleta y descubre cuál opción es la elegida
      </p>

      <div className="mb-8 relative">
        <div className="w-80 h-80 relative">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-amber-400 drop-shadow-lg"></div>
          </div>

          {/* Wheel */}
          <motion.div
            className="w-full h-full rounded-full relative overflow-hidden shadow-2xl shadow-amber-500/50 border-8 border-amber-400"
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: "easeOut" }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {options.map((option, index) => {
                const angle = (360 / options.length) * index;
                const nextAngle = (360 / options.length) * (index + 1);
                const startAngle = (angle - 90) * (Math.PI / 180);
                const endAngle = (nextAngle - 90) * (Math.PI / 180);

                const x1 = 100 + 100 * Math.cos(startAngle);
                const y1 = 100 + 100 * Math.sin(startAngle);
                const x2 = 100 + 100 * Math.cos(endAngle);
                const y2 = 100 + 100 * Math.sin(endAngle);

                const largeArc = 360 / options.length > 180 ? 1 : 0;

                const path = `M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`;

                const textAngle = angle + (360 / options.length) / 2;
                const textRadius = 60;
                const textX = 100 + textRadius * Math.cos((textAngle - 90) * (Math.PI / 180));
                const textY = 100 + textRadius * Math.sin((textAngle - 90) * (Math.PI / 180));

                return (
                  <g key={index}>
                    <path d={path} fill={colors[index % colors.length]} />
                    <text
                      x={textX}
                      y={textY}
                      fill="white"
                      fontSize="10"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                      className="pointer-events-none select-none"
                    >
                      {option.length > 12 ? option.substring(0, 12) + '...' : option}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-indigo-950 rounded-full border-4 border-amber-400 shadow-lg"></div>
          </motion.div>
        </div>
      </div>

      {winner && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 bg-amber-500/20 border-2 border-amber-400/50 backdrop-blur-sm px-6 py-4 rounded-xl text-center"
        >
          <p className="text-amber-200 mb-1">¡Ganador!</p>
          <p className="text-amber-400 text-2xl">{winner}</p>
        </motion.div>
      )}

      <button
        onClick={spinWheel}
        disabled={isSpinning || options.length < 2}
        className="bg-gradient-to-r from-amber-500 to-yellow-500 text-indigo-950 px-8 py-4 rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-amber-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
      >
        <Play size={20} />
        {isSpinning ? 'Girando...' : 'Girar Ruleta'}
      </button>

      {/* Options Manager */}
      <div className="w-full max-w-md border-t border-indigo-700/30 pt-6">
        <h3 className="text-amber-300 mb-3">Opciones de la Ruleta</h3>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nueva opción..."
            className="flex-1 px-3 py-2 bg-indigo-900/30 border-2 border-indigo-700/50 text-white placeholder-indigo-300/50 rounded-lg focus:outline-none focus:border-amber-400"
            maxLength={20}
          />
          <button
            onClick={addOption}
            disabled={!inputValue.trim() || options.length >= 12}
            className="bg-amber-500 text-indigo-950 p-2 rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-indigo-900/30 border border-indigo-700/30 px-3 py-2 rounded-lg text-sm text-amber-100"
            >
              <span className="truncate flex-1">{option}</span>
              {options.length > 2 && (
                <button
                  onClick={() => removeOption(index)}
                  className="text-red-400 hover:text-red-300 ml-2"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}