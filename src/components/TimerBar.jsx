import { motion } from "framer-motion";
import { LEVEL_CONFIG } from "../data/words";

export default function TimerBar({ timeLeft, level }) {
     const maxTime = LEVEL_CONFIG[level].time;
     const pct = (timeLeft / maxTime) * 100;
     const color = pct > 60 ? "#5a9e6f" : pct > 30 ? "#c49a3c" : "#b85c5c";

     return (
          <div className="timer-wrap">
               <div className="timer-bar-bg">
                    <motion.div
                         className="timer-bar-fill"
                         style={{ background: color }}
                         animate={{ width: `${pct}%` }}
                         transition={{ duration: 0.5, ease: "linear" }}
                    />
               </div>
               <span className="timer-label" style={{ color }}>{timeLeft}s</span>
          </div>
     );
}