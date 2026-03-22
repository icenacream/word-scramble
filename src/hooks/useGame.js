import { useState, useEffect, useCallback, useRef } from "react";
import { loadDictionary, LEVEL_CONFIG } from "../data/words";

function shuffle(arr) {
     const a = [...arr];
     for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
     }
     if (a.join("") === arr.join("")) return shuffle(arr);
     return a;
}

function makeTiles(word) {
     return shuffle(word.split("")).map((letter, i) => ({ id: i, letter, used: false }));
}

export function useGame() {
     const [phase, setPhase] = useState("start");
     const [level, setLevel] = useState("easy");
     const [score, setScore] = useState(0);
     const [lives, setLives] = useState(3);
     const [wordCount, setWordCount] = useState(0);
     const [currentWord, setCurrentWord] = useState("");
     const [tiles, setTiles] = useState([]);
     const [answer, setAnswer] = useState([]);
     const [timeLeft, setTimeLeft] = useState(60);
     const [status, setStatus] = useState("idle");
     const [hint, setHint] = useState("");
     const [source, setSource] = useState("dictionary");
     const dictionary = useRef(null);
     const usedWords = useRef(new Set());
     const timerRef = useRef(null);

     function pickLocal(lvl) {
          const pool = (dictionary.current?.[lvl] || []).filter(
               item => !usedWords.current.has(item.word)
          );
          if (!pool.length) return null;
          return pool[Math.floor(Math.random() * pool.length)];
     }

     const loadNewWord = useCallback(async (lvl) => {
          setStatus("loading");
          setHint("");

          const local = pickLocal(lvl);

          if (local) {
               usedWords.current.add(local.word);
               setCurrentWord(local.word);
               setTiles(makeTiles(local.word));
               setSource("dictionary");
               setStatus("idle");
               setTimeLeft(LEVEL_CONFIG[lvl].time);
          } else {
               setPhase("gameover");
               return;
          }

          setAnswer([]);
     }, []);

     const startGame = useCallback(async (lvl) => {
          setLevel(lvl);
          setScore(0);
          setLives(3);
          setWordCount(0);
          usedWords.current.clear();
          setPhase("playing");
          setStatus("loading");

          if (!dictionary.current) {
               dictionary.current = await loadDictionary();
          }
          await loadNewWord(lvl);
     }, [loadNewWord]);

     useEffect(() => {
          if (phase !== "playing" || status !== "idle") {
               clearInterval(timerRef.current);
               return;
          }
          timerRef.current = setInterval(() => {
               setTimeLeft((t) => {
                    if (t <= 1) {
                         clearInterval(timerRef.current);
                         handleTimeout();
                         return 0;
                    }
                    return t - 1;
               });
          }, 1000);
          return () => clearInterval(timerRef.current);
     }, [phase, status, currentWord]);

     function handleTimeout() {
          setStatus("timeout");
          setLives((l) => {
               const next = l - 1;
               if (next <= 0) setTimeout(() => setPhase("gameover"), 1800);
               else setTimeout(() => loadNewWord(level), 1800);
               return next;
          });
     }

     function selectTile(tile) {
          if (tile.used || status !== "idle") return;
          setTiles((p) => p.map((t) => t.id === tile.id ? { ...t, used: true } : t));
          setAnswer((p) => [...p, { tileId: tile.id, letter: tile.letter }]);
     }

     function removeLetter(idx) {
          if (status !== "idle") return;
          const removed = answer[idx];
          setAnswer((p) => p.filter((_, i) => i !== idx));
          setTiles((p) => p.map((t) => t.id === removed.tileId ? { ...t, used: false } : t));
     }

     function clearAnswer() {
          if (status !== "idle") return;
          setAnswer([]);
          setTiles((p) => p.map((t) => ({ ...t, used: false })));
     }

     async function submitAnswer() {
          if (answer.length !== currentWord.length || status !== "idle") return;
          const guess = answer.map((a) => a.letter).join("").toLowerCase();

          if (guess === currentWord.toLowerCase()) {
               const bonus = Math.ceil(timeLeft * 0.5);
               setScore((s) => s + LEVEL_CONFIG[level].points + bonus);
               setWordCount((w) => w + 1);
               setStatus("correct");
               setTimeout(() => loadNewWord(level), 1800);
          } else {
               setStatus("wrong");
               setLives((l) => {
                    const next = l - 1;
                    if (next <= 0) setTimeout(() => setPhase("gameover"), 1800);
                    else setTimeout(() => { clearAnswer(); setStatus("idle"); }, 900);
                    return next;
               });
          }
     }

     function reshuffle() {
          if (status !== "idle") return;
          clearAnswer();
          setTiles(makeTiles(currentWord));
     }

     function fetchHint() {
          if (!currentWord || hint) return;
          const pool = dictionary.current?.[level] || [];
          const found = pool.find(item => item.word === currentWord);
          setHint(found?.hint || "No hint available for this word.");
     }

     return {
          phase, level, score, lives, wordCount,
          currentWord, tiles, answer, timeLeft,
          status, hint, source,
          startGame, selectTile, removeLetter,
          clearAnswer, submitAnswer, reshuffle,
          fetchHint, setPhase,
     };
}