import { motion } from "framer-motion";

export default function LetterTile({ tile, onClick, small = false }) {
     return (
          <motion.button
               className={`letter-tile ${tile.used ? "used" : ""} ${small ? "small" : ""}`}
               onClick={() => !tile.used && onClick(tile)}
               disabled={tile.used}
               whileHover={!tile.used ? { y: -3, scale: 1.08 } : {}}
               whileTap={!tile.used ? { scale: 0.93 } : {}}
          >
               {tile.letter.toUpperCase()}
          </motion.button>
     );
}