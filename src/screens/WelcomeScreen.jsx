import FairyIllustration from '../components/FairyIllustration.jsx'
import FloatingParticles from '../components/FloatingParticles.jsx'

export default function WelcomeScreen({ onStart }) {
  return (
    <div
      className="relative flex flex-col items-center justify-between min-h-screen w-full px-6 py-10 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #fce7f3 0%, #ede9fe 60%, #ddd6fe 100%)' }}
    >
      <FloatingParticles />

      {/* Górna sekcja — tytuł */}
      <div className="relative z-10 flex flex-col items-center pt-4 animate-slide-up">
        <h1 className="text-3xl font-black text-center leading-tight"
          style={{ color: '#7c3aed', textShadow: '0 2px 8px rgba(167,139,250,0.4)' }}>
          Magiczna Matematyka
        </h1>
        <h1 className="text-3xl font-black text-center leading-tight"
          style={{ color: '#db2777', textShadow: '0 2px 8px rgba(244,114,182,0.4)' }}>
          Oliwki ✨
        </h1>
      </div>

      {/* Środkowa sekcja — wróżka */}
      <div className="relative z-10 flex flex-col items-center gap-2"
        style={{ animationDelay: '0.2s' }}>
        <FairyIllustration />
      </div>

      {/* Dolna sekcja — dedykacja, przesłanie, przycisk */}
      <div className="relative z-10 flex flex-col items-center gap-5 w-full animate-slide-up"
        style={{ animationDelay: '0.4s' }}>

        <div className="text-center">
          <p className="text-lg font-bold" style={{ color: '#9333ea' }}>
            Dla Oliwii 💖
          </p>
          <p className="text-base font-semibold" style={{ color: '#a855f7' }}>
            od cioci Kingi
          </p>
        </div>

        <div
          className="rounded-3xl px-6 py-4 text-center max-w-xs"
          style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(196,181,253,0.5)' }}
        >
          <p className="text-sm font-semibold leading-relaxed" style={{ color: '#6d28d9' }}>
            „Każde działanie to mały krok<br />do wielkiej mądrości ✨"
          </p>
        </div>

        <button
          onClick={onStart}
          className="w-full max-w-xs py-5 rounded-3xl text-xl font-black tracking-wide text-white animate-heartbeat"
          style={{
            background: 'linear-gradient(135deg, #f472b6 0%, #a78bfa 100%)',
            boxShadow: '0 8px 24px rgba(167,139,250,0.45)',
          }}
        >
          Zaczynamy! 🚀
        </button>
      </div>
    </div>
  )
}
