import dictionary from './dictionary.json';

export const WORDS_BY_LEVEL = dictionary;

export const LEVEL_CONFIG = {
     easy: { label: "Easy", color: "#5a9e6f", points: 10, time: 60, icon: "🌱" },
     medium: { label: "Medium", color: "#c49a3c", points: 20, time: 45, icon: "⚡" },
     hard: { label: "Hard", color: "#b85c5c", points: 40, time: 30, icon: "🔥" },
     impossible: { label: "Impossible", color: "#7b5ea7", points: 80, time: 20, icon: "💀" },
};

export async function loadDictionary() {
     return dictionary;
}