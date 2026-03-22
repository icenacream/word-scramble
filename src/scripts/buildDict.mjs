import { readFileSync, writeFileSync } from 'fs';

const raw = JSON.parse(readFileSync('src/data/dictionary.json', 'utf8'));
const all = Object.keys(raw).filter(w => /^[a-z]+$/.test(w));

const result = {
     easy:       all.filter(w => w.length >= 3 && w.length <= 4),
     medium:     all.filter(w => w.length >= 5 && w.length <= 6),
     hard:       all.filter(w => w.length >= 7 && w.length <= 8),
     impossible: all.filter(w => w.length >= 9 && w.length <= 12),
}

writeFileSync('src/data/dictionary.json', JSON.stringify(result));
console.log('Done!', Object.entries(result).map(([k,v]) => `${k}: ${v.length}`).join(', '));