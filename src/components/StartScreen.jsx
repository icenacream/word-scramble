import { motion } from "framer-motion";

export default function StartScreen({ onStart }) {
     return (
          <motion.div
               className="start-screen"
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -30 }}
          >
               <motion.div
                    className="start-logo"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
               >
                    W
               </motion.div>

               <motion.h1
                    className="start-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
               >
                    Wordscramble
               </motion.h1>

               <motion.p
                    className="start-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
               >
                    Unscramble the letters to form the hidden word
               </motion.p>

               <motion.button
                    className="btn-start"
                    onClick={onStart}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
               >
                    Start Playing →
               </motion.button>
          </motion.div>
     );
}