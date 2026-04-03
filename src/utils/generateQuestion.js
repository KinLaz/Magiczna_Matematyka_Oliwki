/**
 * Generuje losowe zadanie w zależności od trybu i zakresu.
 * @param {'add'|'sub'|'mix'} mode
 * @param {number} maxRange  – np. 10, 20, 30, 40, 50
 * @returns {{ a: number, b: number, op: '+'|'-', answer: number }}
 */
export function generateQuestion(mode, maxRange) {
  let op = '+'

  if (mode === 'sub') op = '-'
  else if (mode === 'mix') op = Math.random() < 0.5 ? '+' : '-'

  let a, b

  if (op === '+') {
    // a + b ≤ maxRange, a ≥ 1, b ≥ 1
    a = Math.floor(Math.random() * (maxRange - 1)) + 1   // 1 … maxRange-1
    b = Math.floor(Math.random() * (maxRange - a)) + 1    // 1 … maxRange-a
  } else {
    // a - b ≥ 0, a ≤ maxRange
    a = Math.floor(Math.random() * (maxRange + 1))        // 0 … maxRange
    b = Math.floor(Math.random() * (a + 1))               // 0 … a
  }

  return { a, b, op, answer: op === '+' ? a + b : a - b }
}
