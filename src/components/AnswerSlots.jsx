import { motion, AnimatePresence } from "framer-motion";

export default function AnswerSlots({ answer, wordLength, onRemove, status }) {
     return (
          <div className="answer-slots">
               {Array.from({ length: wordLength }).map((_, i) => {
                    const letter = answer[i];
                    return (
                         <motion.div
                              key={i}
                              className={`answer-slot ${letter ? "filled" : "empty"} ${status === "correct" ? "correct" : ""} ${status === "wrong" ? "wrong" : ""}`}
                              animate={
                                   status === "wrong"
                                        ? { x: [0, -6, 6, -4, 4, 0] }
                                        : status === "correct"
                                             ? { scale: [1, 1.12, 1] }
                                             : {}
                              }
                              transition={{ duration: 0.4, delay: i * 0.04 }}
                              onClick={() => letter && onRemove(i)}
                         >
                              <AnimatePresence mode="wait">
                                   {letter && (
                                        <motion.span
                                             key={letter.tileId + "-" + i}
                                             initial={{ opacity: 0, y: -10 }}
                                             animate={{ opacity: 1, y: 0 }}
                                             exit={{ opacity: 0, y: 10 }}
                                             className="slot-letter"
                                        >
                                             {letter.letter.toUpperCase()}
                                        </motion.span>
                                   )}
                              </AnimatePresence>
                         </motion.div>
                    );
               })}
          </div>
     );
}