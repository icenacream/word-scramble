import { motion, AnimatePresence } from "framer-motion";
import LetterTile from "./LetterTile";
import AnswerSlots from "./AnswerSlots";
import TimerBar from "./TimerBar";
import { LEVEL_CONFIG } from "../data/words";

export default function GameBoard({
     level, score, lives, wordCount, tiles, answer,
     timeLeft, status, source, hint,
     onSelectTile, onRemoveLetter, onClear, onSubmit, onReshuffle, onHint,
}) {
     const cfg = LEVEL_CONFIG[level];
     const canSubmit = answer.length === tiles.length && status === "idle";

     if (status === "loading") {
          return (
               <motion.div className="loading-screen"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="loading-spinner" />
                    <p className="loading-text">Loading word...</p>
               </motion.div>
          );
     }

     return (
          <motion.div className="game-screen"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

               {/* Header */}
               <div className="game-header">
                    <div className="stat-pill">
                         <span className="stat-label">Score</span>
                         <span className="stat-value">{score}</span>
                    </div>
                    <div className="level-badge" style={{ "--accent": cfg.color }}>
                         {cfg.icon} {cfg.label}
                    </div>
                    <div className="stat-pill">
                         <span className="stat-label">Lives</span>
                         <span className="stat-value lives">
                              {Array.from({ length: 3 }).map((_, i) => (
                                   <span key={i} className={i < lives ? "heart" : "heart lost"}>♥</span>
                              ))}
                         </span>
                    </div>
               </div>

               {/* Timer */}
               <TimerBar timeLeft={timeLeft} level={level} />

               {/* Word count + source badge */}
               <div className="word-meta">
                    <p className="word-count">Word #{wordCount + 1}</p>
                    <span className={`source-badge ${source}`}>
                         {source === "ai" ? "🤖 AI word" : "📖 Dictionary"}
                    </span>
               </div>

               {/* Answer slots */}
               <div className="answer-area">
                    <AnswerSlots
                         answer={answer}
                         wordLength={tiles.length}
                         onRemove={onRemoveLetter}
                         status={status}
                    />
               </div>

               {/* Hint box */}
               <AnimatePresence>
                    {hint && (
                         <motion.div
                              className="hint-box"
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                         >
                              💡 {hint}
                         </motion.div>
                    )}
               </AnimatePresence>

               {/* Status messages */}
               <AnimatePresence mode="wait">
                    {status === "correct" && (
                         <motion.div key="correct" className="status-msg correct"
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}>
                              <span className="status-emoji">🎉</span>
                              <p className="status-text">Correct!</p>
                         </motion.div>
                    )}
                    {status === "wrong" && (
                         <motion.div key="wrong" className="status-msg wrong"
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}>
                              <span className="status-emoji">❌</span>
                              <p className="status-text">Not quite — try again!</p>
                         </motion.div>
                    )}
                    {status === "timeout" && (
                         <motion.div key="timeout" className="status-msg timeout"
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}>
                              <span className="status-emoji">⏰</span>
                              <p className="status-text">Time's up!</p>
                         </motion.div>
                    )}
               </AnimatePresence>

               {/* Letter tiles */}
               <div className="tiles-area">
                    {tiles.map((tile) => (
                         <LetterTile
                              key={tile.id}
                              tile={tile}
                              onClick={onSelectTile}
                              small={tiles.length > 6}
                         />
                    ))}
               </div>

               {/* Buttons */}
               <div className="action-row">
                    <button className="btn-ghost" onClick={onReshuffle}>🔀 Shuffle</button>
                    <button className="btn-ghost" onClick={onClear}>✕ Clear</button>
                    <button className="btn-hint" onClick={onHint} disabled={!!hint}>
                         {hint ? "💡 Shown" : "💡 Hint"}
                    </button>

                    <motion.button
                         className="btn-submit-full"
                         style={{ "--accent": cfg.color }}
                         onClick={onSubmit}
                         disabled={!canSubmit}
                         whileHover={canSubmit ? { scale: 1.02 } : {}}
                         whileTap={canSubmit ? { scale: 0.97 } : {}}>
                         Submit →
                    </motion.button>
               </div>

          </motion.div>
     );
}