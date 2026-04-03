import { useState } from 'react'
import WelcomeScreen from './screens/WelcomeScreen.jsx'
import MenuScreen    from './screens/MenuScreen.jsx'
import GameScreen    from './screens/GameScreen.jsx'
import EndScreen     from './screens/EndScreen.jsx'

/**
 * Stany aplikacji:
 *   welcome  – ekran powitalny
 *   menu     – wybór trybu i zakresu
 *   game     – rozgrywka
 *   end      – podsumowanie rundy
 */
export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [config, setConfig] = useState({ mode: null, range: null })
  const [result, setResult] = useState(null)

  const goToMenu    = ()              => setScreen('menu')
  const startGame   = (mode, range)   => { setConfig({ mode, range }); setScreen('game') }
  const finishGame  = (res)           => { setResult(res); setScreen('end') }
  const playAgain   = ()              => setScreen('game')  // ten sam tryb i zakres
  const goToMenuFromEnd = ()          => setScreen('menu')

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-50">
      {/* Kontener mobilny – max 430px, pełna wysokość */}
      <div
        className="relative w-full overflow-hidden"
        style={{ maxWidth: 430, minHeight: '100dvh', height: '100dvh' }}
      >
        {screen === 'welcome' && (
          <WelcomeScreen onStart={goToMenu} />
        )}

        {screen === 'menu' && (
          <MenuScreen onStart={startGame} />
        )}

        {screen === 'game' && (
          <GameScreen
            key={`${config.mode}-${config.range}-${Date.now()}`}
            mode={config.mode}
            range={config.range}
            onEnd={finishGame}
          />
        )}

        {screen === 'end' && (
          <EndScreen
            result={result}
            onPlayAgain={playAgain}
            onMenu={goToMenuFromEnd}
          />
        )}
      </div>
    </div>
  )
}
