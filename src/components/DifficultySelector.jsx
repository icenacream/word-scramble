import { motion } from "framer-motion";
import { LEVEL_CONFIG } from "../data/words";

const levels = ["easy", "medium", "hard", "impossible"];

export default function DifficultySelector({ onSelect, onBack }) {
     return (
          <motion.div
               className="menu-screen"
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -30 }}
          >
               <div className="menu-header">
                    <h2 className="menu-heading">Choose Difficulty</h2>
                    <p className="game-subtitle">Pick a level to start playing</p>
               </div>

               <div className="level-grid">
                    {levels.map((lvl, i) => {
                         const cfg = LEVEL_CONFIG[lvl];
                         return (
                              <motion.button
                                   key={lvl}
                                   className="level-card"
                                   style={{ "--accent": cfg.color }}
                                   onClick={() => onSelect(lvl)}
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ delay: i * 0.1 + 0.1 }}
                                   whileHover={{ y: -4 }}
                                   whileTap={{ scale: 0.97 }}
                              >
                                   <span className="level-icon">{cfg.icon}</span>
                                   <span className="level-name">{cfg.label}</span>
                                   <div className="level-details">
                                        <span>{cfg.time}s per word</span>
                                        <span>{cfg.points}+ pts</span>
                                   </div>
                              </motion.button>
                         );
                    })}
               </div>

               <p className="menu-hint">Earn bonus points for faster answers!</p>

               <motion.button
                    className="btn-back"
                    onClick={onBack}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
               >
                    ← Back
               </motion.button>
          </motion.div>
     );
}