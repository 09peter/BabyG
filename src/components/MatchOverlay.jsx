import { useEffect } from 'react'

export default function MatchOverlay({ name, onClose }) {
  // Auto-dismiss after 4 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-bounce-in text-center p-8 max-w-sm mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Kirby-inspired celebration */}
        <div className="relative">
          {/* Background stars */}
          <div className="absolute -top-8 -left-4 text-3xl animate-sparkle">⭐</div>
          <div className="absolute -top-6 -right-2 text-2xl animate-sparkle" style={{ animationDelay: '0.3s' }}>✨</div>
          <div className="absolute -bottom-4 -left-6 text-2xl animate-sparkle" style={{ animationDelay: '0.6s' }}>🌟</div>
          <div className="absolute -bottom-6 -right-4 text-3xl animate-sparkle" style={{ animationDelay: '0.9s' }}>⭐</div>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 -translate-y-12 text-2xl animate-float">🌈</div>

          {/* Main Kirby card */}
          <div className="bg-gradient-to-br from-kirby-light via-kirby-pink to-kirby-dark rounded-3xl p-8 shadow-2xl border-4 border-white/50">
            {/* Kirby face */}
            <div className="text-7xl mb-2 animate-float">
              (◕‿◕✿)
            </div>

            <div className="text-3xl font-black text-white mb-2 drop-shadow-lg">
              It's a Match!
            </div>

            <div className="text-white/90 font-bold text-lg mb-1">
              Peter & Paula both love
            </div>

            <div className="text-4xl font-black text-white drop-shadow-lg my-3 bg-white/20 rounded-2xl py-3 px-6 inline-block">
              {name}
            </div>

            <div className="flex justify-center gap-2 mt-3 text-2xl">
              <span className="animate-float">💖</span>
              <span className="animate-float" style={{ animationDelay: '0.2s' }}>👶</span>
              <span className="animate-float" style={{ animationDelay: '0.4s' }}>💖</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-white font-bold text-lg hover:underline"
        >
          Keep swiping! ✨
        </button>
      </div>
    </div>
  )
}
