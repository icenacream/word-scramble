import { AnimatePresence } from "framer-motion";
import { useGame } from "./hooks/useGame";
import StartScreen from "./components/StartScreen";
import DifficultySelector from "./components/DifficultySelector";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";

export default function App() {
  const game = useGame();

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {game.phase === "start" && (
          <StartScreen
            key="start"
            onStart={() => game.setPhase("menu")}
          />
        )}
        {game.phase === "menu" && (
          <DifficultySelector
            key="menu"
            onSelect={game.startGame}
            onBack={() => game.setPhase("start")}
          />
        )}
        {game.phase === "playing" && (
          <GameBoard
            key="playing"
            level={game.level}
            score={game.score}
            lives={game.lives}
            wordCount={game.wordCount}
            tiles={game.tiles}
            answer={game.answer}
            timeLeft={game.timeLeft}
            status={game.status}
            source={game.source}
            hint={game.hint}
            onSelectTile={game.selectTile}
            onRemoveLetter={game.removeLetter}
            onClear={game.clearAnswer}
            onSubmit={game.submitAnswer}
            onReshuffle={game.reshuffle}
            onHint={game.fetchHint}
          />
        )}
        {game.phase === "gameover" && (
          <GameOver
            key="gameover"
            score={game.score}
            wordCount={game.wordCount}
            level={game.level}
            onRestart={() => game.startGame(game.level)}
            onMenu={() => game.setPhase("start")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}