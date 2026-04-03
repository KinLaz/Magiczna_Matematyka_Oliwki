import { useState } from 'react'
import FloatingParticles from '../components/FloatingParticles.jsx'


const MODES = [
  { id: 'add',  label: 'Dodawanie',  icon: '➕', color: 'from-pink-300 to-pink-400' },
  { id: 'sub',  label: 'Odejmowanie',icon: '➖', color: 'from-purple-300 to-purple-400' },
  { id: 'mix',  label: 'Miks!',      icon: '🎲', color: 'from-fuchsia-300 to-pink-400' },
]

const RANGES = [10, 20, 30, 40, 50]

export default function MenuScreen({ onStart }) {
  const [mode, setMode]   = useState(null)
  const [range, setRange] = useState(null)

  const canStart = mode !== null && range !== null

  return (
    <div
      className="relative flex flex-col min-h-screen w-full px-5 py-8 overflow-y-auto"
      style={{ background: 'linear-gradient(160deg, #fce7f3 0%, #ede9fe 60%, #ddd6fe 100%)' }}
    >
      <FloatingParticles />

      <div className="relative z-10 flex flex-col gap-7 animate-slide-up">

        {/* Nagłówek */}
        <div className="text-center pt-2">
          <h2 className="text-2xl font-black" style={{ color: '#7c3aed' }}>Wybierz tryb 🎮</h2>
          <p className="text-sm font-semibold mt-1" style={{ color: '#a78bfa' }}>Co dziś ćwiczymy?</p>
        </div>

        {/* Tryby */}
        <div className="flex flex-col gap-3">
          {MODES.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex items-center gap-4 px-6 py-4 rounded-3xl text-white font-bold text-lg bg-gradient-to-r ${m.color} transition-all duration-150`}
              style={{
                boxShadow: mode === m.id
                  ? '0 0 0 4px #f472b6, 0 8px 20px rgba(167,139,250,0.4)'
                  : '0 4px 14px rgba(167,139,250,0.25)',
                transform: mode === m.id ? 'scale(1.03)' : 'scale(1)',
                opacity: mode !== null && mode !== m.id ? 0.65 : 1,
              }}
            >
              <span className="text-3xl">{m.icon}</span>
              <span>{m.label}</span>
              {mode === m.id && <span className="ml-auto text-2xl animate-sparkle">✓</span>}
            </button>
          ))}
        </div>

        {/* Zakres */}
        <div>
          <h3 className="text-xl font-black text-center mb-3" style={{ color: '#7c3aed' }}>
            Zakres liczb 🔢
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {RANGES.map(r => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className="py-4 rounded-2xl font-black text-lg transition-all duration-150"
                style={{
                  background: range === r
                    ? 'linear-gradient(135deg, #f472b6, #a78bfa)'
                    : 'rgba(255,255,255,0.7)',
                  color: range === r ? 'white' : '#7c3aed',
                  boxShadow: range === r
                    ? '0 0 0 3px #f472b6, 0 6px 16px rgba(167,139,250,0.35)'
                    : '0 3px 10px rgba(167,139,250,0.2)',
                  transform: range === r ? 'scale(1.08)' : 'scale(1)',
                  border: '1.5px solid rgba(196,181,253,0.5)',
                }}
              >
                {r}
              </button>
            ))}
          </div>
          <p className="text-center text-xs font-semibold mt-2" style={{ color: '#a78bfa' }}>
            (wynik mieści się w wybranym zakresie)
          </p>
        </div>

        {/* Przycisk Start */}
        <button
          onClick={() => canStart && onStart(mode, range)}
          disabled={!canStart}
          className="w-full py-5 rounded-3xl text-xl font-black text-white transition-all duration-200"
          style={{
            background: canStart
              ? 'linear-gradient(135deg, #f472b6 0%, #a78bfa 100%)'
              : 'rgba(196,181,253,0.4)',
            boxShadow: canStart ? '0 8px 24px rgba(167,139,250,0.45)' : 'none',
            color: canStart ? 'white' : '#a78bfa',
          }}
        >
          {canStart ? 'Start! 🌟' : 'Wybierz tryb i zakres'}
        </button>
      </div>
    </div>
  )
}

