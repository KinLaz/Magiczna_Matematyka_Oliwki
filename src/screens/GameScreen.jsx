import { useState, useEffect, useCallback } from 'react'
import { generateQuestion } from '../utils/generateQuestion.js'
import FloatingParticles from '../components/FloatingParticles.jsx'

const TOTAL_QUESTIONS = 10
const MAX_LIVES       = 3

// Generuje cztery opcje odpowiedzi: poprawna + 3 mylące
function makeOptions(answer, maxRange) {
  const opts = new Set([answer])
  while (opts.size < 4) {
    let wrong = answer + Math.round((Math.random() - 0.5) * 10)
    wrong = Math.max(0, Math.min(maxRange, wrong))
    if (wrong !== answer) opts.add(wrong)
  }
  return shuffle([...opts])
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function GameScreen({ mode, range, onEnd }) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [lives,         setLives]         = useState(MAX_LIVES)
  const [score,         setScore]         = useState(0)
  const [question,      setQuestion]      = useState(null)
  const [options,       setOptions]       = useState([])
  const [feedback,      setFeedback]      = useState(null)  // null | 'correct' | 'wrong'
  const [answered,      setAnswered]      = useState(false)

  const loadQuestion = useCallback(() => {
    const q = generateQuestion(mode, range)
    setQuestion(q)
    setOptions(makeOptions(q.answer, range))
    setFeedback(null)
    setAnswered(false)
  }, [mode, range])

  // Pierwsze pytanie
  useEffect(() => { loadQuestion() }, [loadQuestion])

  const handleAnswer = (chosen) => {
    if (answered) return
    setAnswered(true)

    const correct = chosen === question.answer

    if (correct) {
      setFeedback('correct')
      setScore(s => s + 1)
    } else {
      setFeedback('wrong')
      setLives(l => l - 1)
    }

    // Krótka pauza → następne pytanie lub koniec
    setTimeout(() => {
      const nextIndex = questionIndex + 1
      const newLives  = correct ? lives : lives - 1

      if (nextIndex >= TOTAL_QUESTIONS || newLives <= 0) {
        onEnd({
          score: correct ? score + 1 : score,
          total: TOTAL_QUESTIONS,
          livesLeft: newLives,
        })
      } else {
        setQuestionIndex(nextIndex)
        loadQuestion()
      }
    }, 1000)
  }

  if (!question) return null

  const hearts     = Array.from({ length: MAX_LIVES }, (_, i) => i < lives)
  const modeName   = mode === 'add' ? 'Dodawanie ➕' : mode === 'sub' ? 'Odejmowanie ➖' : 'Miks 🎲'
  const progress   = (questionIndex / TOTAL_QUESTIONS) * 100

  return (
    <div
      className="relative flex flex-col min-h-screen w-full px-5 py-6 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #fce7f3 0%, #ede9fe 60%, #ddd6fe 100%)' }}
    >
      <FloatingParticles />

      <div className="relative z-10 flex flex-col gap-5 h-full">

        {/* Pasek statusu */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {hearts.map((alive, i) => (
              <span key={i} className={`text-2xl transition-all ${alive ? 'animate-heartbeat' : 'opacity-25'}`}>
                ❤️
              </span>
            ))}
          </div>
          <span className="text-sm font-bold px-3 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.6)', color: '#7c3aed' }}>
            {modeName}
          </span>
          <span className="text-sm font-bold px-3 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.6)', color: '#7c3aed' }}>
            ⭐ {score}/{TOTAL_QUESTIONS}
          </span>
        </div>

        {/* Pasek postępu */}
        <div className="w-full h-3 rounded-full" style={{ background: 'rgba(196,181,253,0.35)' }}>
          <div
            className="h-3 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #f472b6, #a78bfa)',
            }}
          />
        </div>

        {/* Numer pytania */}
        <p className="text-center text-sm font-semibold" style={{ color: '#a78bfa' }}>
          Pytanie {questionIndex + 1} z {TOTAL_QUESTIONS}
        </p>

        {/* Karta z pytaniem */}
        <div
          className="rounded-3xl px-6 py-10 flex flex-col items-center justify-center gap-2 flex-1"
          style={{
            background: 'rgba(255,255,255,0.65)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(196,181,253,0.5)',
            boxShadow: '0 8px 32px rgba(167,139,250,0.2)',
          }}
        >
          {/* Feedback overlay */}
          {feedback && (
            <div className="text-5xl mb-2 animate-bounce-soft">
              {feedback === 'correct' ? '🎉' : '😢'}
            </div>
          )}

          <p
            className="text-6xl font-black tracking-tight"
            style={{ color: '#7c3aed', textShadow: '0 2px 8px rgba(167,139,250,0.3)' }}
          >
            {question.a} {question.op} {question.b} = ?
          </p>

          {feedback === 'correct' && (
            <p className="text-lg font-bold mt-1" style={{ color: '#16a34a' }}>Brawo! ✨</p>
          )}
          {feedback === 'wrong' && (
            <p className="text-lg font-bold mt-1" style={{ color: '#dc2626' }}>
              Odpowiedź: {question.answer}
            </p>
          )}
        </div>

        {/* Opcje odpowiedzi */}
        <div className="grid grid-cols-2 gap-3 pb-2">
          {options.map((opt, i) => {
            let bg = 'rgba(255,255,255,0.75)'
            let color = '#7c3aed'
            let border = '2px solid rgba(196,181,253,0.5)'
            let shadow = '0 4px 14px rgba(167,139,250,0.2)'

            if (answered) {
              if (opt === question.answer) {
                bg = 'linear-gradient(135deg, #86efac, #4ade80)'
                color = 'white'
                border = '2px solid #16a34a'
                shadow = '0 4px 14px rgba(74,222,128,0.4)'
              } else if (opt !== question.answer) {
                bg = 'rgba(255,255,255,0.35)'
                color = '#9ca3af'
                border = '2px solid rgba(209,213,219,0.5)'
                shadow = 'none'
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                disabled={answered}
                className="py-5 rounded-3xl text-3xl font-black transition-all duration-150 active:scale-95"
                style={{ background: bg, color, border, boxShadow: shadow }}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
