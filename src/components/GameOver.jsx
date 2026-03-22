import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function GameOver({ score, wordCount, level, onRestart, onMenu }) {
     useEffect(() => {
          if (score > 0) {
               confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { y: 0.5 },
                    colors: ["#c8b89a", "#a08c6e", "#e8ddd0", "#7aad7a", "#d4a355"],
               });
          }
     }, []);

     const grade =
          score >= 200 ? { label: "Legendary", emoji: "🏆" }
               : score >= 100 ? { label: "Great", emoji: "🌟" }
                    : score >= 50 ? { label: "Good", emoji: "👍" }
                         : { label: "Keep going", emoji: "💪" };

     return (
          <motion.div
               className="gameover-screen"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0 }}
          >
               <div className="gameover-card">
                    <span className="gameover-emoji">{grade.emoji}</span>
                    <h2 className="gameover-title">Game Over</h2>
                    <p className="gameover-grade">{grade.label}</p>

                    <div className="gameover-stats">
                         <div className="go-stat">
                              <span className="go-stat-val">{score}</span>
                              <span className="go-stat-lbl">Points</span>
                         </div>
                         <div className="go-stat">
                              <span className="go-stat-val">{wordCount}</span>
                              <span className="go-stat-lbl">Words</span>
                         </div>
                         <div className="go-stat">
                              <span className="go-stat-val" style={{ textTransform: "capitalize" }}>
                                   {level}
                              </span>
                              <span className="go-stat-lbl">Level</span>
                         </div>
                    </div>

                    <div className="gameover-actions">
                         <button className="btn-primary" onClick={onRestart}>Play Again</button>
                         <button className="btn-ghost" onClick={onMenu}>← Menu</button>
                    </div>
               </div>
          </motion.div>
     );
}