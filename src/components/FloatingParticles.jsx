// Dekoracyjne duszki / gwiazdki w tle
const PARTICLES = [
  { id: 1,  symbol: '✨', top: '5%',  left: '8%',  size: 'text-2xl', delay: '0s',    dur: '3s'   },
  { id: 2,  symbol: '💜', top: '12%', left: '88%', size: 'text-xl',  delay: '0.5s',  dur: '3.5s' },
  { id: 3,  symbol: '🌸', top: '20%', left: '5%',  size: 'text-lg',  delay: '1s',    dur: '4s'   },
  { id: 4,  symbol: '⭐', top: '75%', left: '92%', size: 'text-2xl', delay: '0.3s',  dur: '2.8s' },
  { id: 5,  symbol: '💖', top: '85%', left: '6%',  size: 'text-xl',  delay: '1.2s',  dur: '3.2s' },
  { id: 6,  symbol: '✦',  top: '50%', left: '95%', size: 'text-lg',  delay: '0.8s',  dur: '3.8s' },
  { id: 7,  symbol: '🌷', top: '60%', left: '3%',  size: 'text-lg',  delay: '2s',    dur: '4.2s' },
  { id: 8,  symbol: '✨', top: '35%', left: '91%', size: 'text-sm',  delay: '1.5s',  dur: '2.5s' },
]

export default function FloatingParticles() {
  return (
    <>
      {PARTICLES.map(p => (
        <span
          key={p.id}
          className={`fixed pointer-events-none select-none ${p.size} animate-bounce-soft`}
          style={{ top: p.top, left: p.left, animationDelay: p.delay, animationDuration: p.dur, zIndex: 0 }}
        >
          {p.symbol}
        </span>
      ))}
    </>
  )
}
