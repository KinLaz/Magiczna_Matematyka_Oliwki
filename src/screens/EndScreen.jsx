import FloatingParticles from '../components/FloatingParticles.jsx'

function getResultEmoji(score, total) {
  const pct = score / total
  if (pct === 1)         return { emoji: '🏆', msg: 'Perfekcja! Jesteś geniuszem!',   color: '#f59e0b' }
  if (pct >= 0.8)        return { emoji: '🌟', msg: 'Wspaniale! Tak trzymaj!',          color: '#a78bfa' }
  if (pct >= 0.6)        return { emoji: '😊', msg: 'Dobra robota! Ćwicz dalej!',       color: '#f472b6' }
  return                        { emoji: '💪', msg: 'Następnym razem będzie lepiej!',   color: '#fb923c' }
}

function StarRating({ score, total }) {
  const stars = Math.round((score / total) * 3)
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: 3 }, (_, i) => (
        <span
          key={i}
          className="text-4xl transition-all"
          style={{ opacity: i < stars ? 1 : 0.2, filter: i < stars ? 'none' : 'grayscale(1)' }}
        >
          ⭐
        </span>
      ))}
    </div>
  )
}

export default function EndScreen({ result, onPlayAgain, onMenu }) {
  const { score, total, livesLeft } = result
  const { emoji, msg, color } = getResultEmoji(score, total)

  return (
    <div
      className="relative flex flex-col items-center justify-between min-h-screen w-full px-6 py-10 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #fce7f3 0%, #ede9fe 60%, #ddd6fe 100%)' }}
    >
      <FloatingParticles />

      <div className="relative z-10 flex flex-col items-center gap-6 w-full animate-slide-up">

        {/* Emoji wynik */}
        <div className="text-8xl animate-bounce-soft">{emoji}</div>

        {/* Tytuł */}
        <h2 className="text-3xl font-black text-center" style={{ color: '#7c3aed' }}>
          Koniec rundy!
        </h2>

        {/* Karta z wynikiem */}
        <div
          className="w-full rounded-3xl px-6 py-8 flex flex-col items-center gap-4"
          style={{
            background: 'rgba(255,255,255,0.65)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(196,181,253,0.5)',
            boxShadow: '0 8px 32px rgba(167,139,250,0.2)',
          }}
        >
          <p className="text-xl font-bold text-center" style={{ color }}>
            {msg}
          </p>

          <div className="text-6xl font-black" style={{ color: '#7c3aed' }}>
            {score} / {total}
          </div>

          <StarRating score={score} total={total} />

          <div className="flex gap-3 items-center text-sm font-semibold" style={{ color: '#a78bfa' }}>
            <span>Pozostałe życia:</span>
            <div className="flex gap-1">
              {Array.from({ length: 3 }, (_, i) => (
                <span key={i} className={i < livesLeft ? '' : 'opacity-20'}>❤️</span>
              ))}
            </div>
          </div>
        </div>

        {/* Motywacja */}
        <p className="text-center text-sm font-semibold px-4" style={{ color: '#9333ea' }}>
          Każde ćwiczenie czyni mistrza! ✨<br />
          Ciocia Kinga jest z Ciebie dumna 💖
        </p>

        {/* Przyciski */}
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={onPlayAgain}
            className="w-full py-5 rounded-3xl text-xl font-black text-white"
            style={{
              background: 'linear-gradient(135deg, #f472b6 0%, #a78bfa 100%)',
              boxShadow: '0 8px 24px rgba(167,139,250,0.45)',
            }}
          >
            Zagraj znowu! 🔄
          </button>

          <button
            onClick={onMenu}
            className="w-full py-4 rounded-3xl text-lg font-bold"
            style={{
              background: 'rgba(255,255,255,0.65)',
              color: '#7c3aed',
              border: '2px solid rgba(196,181,253,0.5)',
              boxShadow: '0 4px 14px rgba(167,139,250,0.2)',
            }}
          >
            Menu główne 🏠
          </button>
        </div>
      </div>
    </div>
  )
}
