import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, Sparkles } from "lucide-react";

export function LuckyClover() {
  const [participants, setParticipants] = useState<string[]>(
    [],
  );
  const [inputValue, setInputValue] = useState("");
  const [luckyWinner, setLuckyWinner] = useState<string | null>(
    null,
  );
  const [isSelecting, setIsSelecting] = useState(false);
  const [currentHighlight, setCurrentHighlight] = useState<
    string | null
  >(null);

  const addParticipant = () => {
    if (inputValue.trim()) {
      setParticipants([...participants, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const selectLucky = () => {
    if (participants.length === 0 || isSelecting) return;

    setIsSelecting(true);
    setLuckyWinner(null);

    let counter = 0;
    const interval = setInterval(() => {
      const randomPerson =
        participants[
          Math.floor(Math.random() * participants.length)
        ];
      setCurrentHighlight(randomPerson);
      counter++;

      if (counter >= 20) {
        clearInterval(interval);
        const finalWinner =
          participants[
            Math.floor(Math.random() * participants.length)
          ];
        setLuckyWinner(finalWinner);
        setCurrentHighlight(null);
        setIsSelecting(false);
      }
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addParticipant();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-amber-400 mb-4">
        Trébol de la Suerte
      </h2>
      <p className="text-amber-100/80 mb-8 text-center">
        Añade participantes y descubre quién será el afortunado
      </p>

      {/* Input Section */}
      <div className="w-full max-w-md mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nombre del participante..."
            className="flex-1 px-4 py-3 bg-indigo-900/30 border-2 border-indigo-700/50 text-white placeholder-indigo-300/50 rounded-xl focus:outline-none focus:border-amber-400 transition-colors"
          />
          <button
            onClick={addParticipant}
            disabled={!inputValue.trim()}
            className="bg-amber-500 text-indigo-950 p-3 rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>

      {/* Participants Grid */}
      <div className="w-full max-w-md mb-6 max-h-64 overflow-y-auto scrollbar-hide">
        {participants.length === 0 ? (
          <div className="text-center py-12 text-amber-300/50 bg-indigo-900/20 rounded-xl">
            <div className="text-4xl mb-2">🍀</div>
            <p>Añade participantes para comenzar</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <AnimatePresence>
              {participants.map((participant, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale:
                      currentHighlight === participant
                        ? 1.05
                        : 1,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`relative px-4 py-3 rounded-xl transition-all ${
                    currentHighlight === participant
                      ? "bg-amber-500/40 shadow-xl shadow-amber-500/60 ring-2 ring-amber-400/50"
                      : luckyWinner === participant
                        ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-950 shadow-lg shadow-amber-500/50"
                        : "bg-indigo-900/30 text-amber-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate flex-1">
                      {participant}
                    </span>
                    {luckyWinner !== participant &&
                      !isSelecting && (
                        <button
                          onClick={() =>
                            removeParticipant(index)
                          }
                          className="text-red-400 hover:text-red-300 ml-2 flex-shrink-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    {luckyWinner === participant && (
                      <span className="ml-2 text-xl">🍀</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Lucky Winner Display */}
      <AnimatePresence mode="wait">
        {luckyWinner && !isSelecting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="w-full max-w-md mb-6 bg-amber-500/20 border-2 border-amber-400/50 backdrop-blur-sm px-8 py-6 rounded-2xl text-center relative overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/20 to-transparent"
              style={{ backgroundSize: "200% 100%" }}
            />
            <div className="relative z-10">
              <div className="text-5xl mb-3">🍀</div>
              <p className="text-amber-200 mb-2">
                ¡El afortunado es!
              </p>
              <p className="text-amber-400 text-3xl">
                {luckyWinner}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Select Button */}
      <button
        onClick={selectLucky}
        disabled={participants.length === 0 || isSelecting}
        className="bg-gradient-to-r from-amber-500 to-yellow-500 text-indigo-950 px-8 py-4 rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-amber-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles
          size={20}
          className={isSelecting ? "animate-pulse" : ""}
        />
        {isSelecting ? "Seleccionando..." : "Elegir Afortunado"}
      </button>
    </div>
  );
}