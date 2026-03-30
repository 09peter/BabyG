import { useState, useEffect } from 'react'
import { getMatches } from '../utils/api'

export default function MatchesDashboard({ names, onBack, partner, onSwitchPartner }) {
  const [matchedNames, setMatchedNames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMatches().then(data => {
      const matchIds = data.matches || []
      const matched = matchIds
        .map(id => names.find(n => n.id === id))
        .filter(Boolean)
      setMatchedNames(matched)
      setLoading(false)
    })
  }, [names])

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={onBack}
          className="text-sm text-kirby-pink font-bold hover:text-kirby-dark transition-colors"
        >
          ← Back
        </button>
        <h2 className="text-lg font-extrabold text-kirby-dark">
          Matches 💕
        </h2>
        <button
          onClick={onSwitchPartner}
          className="text-sm text-kirby-pink font-bold hover:text-kirby-dark transition-colors"
        >
          Switch
        </button>
      </div>

      <div className="flex-1 px-6 pb-8">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="text-kirby-pink text-xl font-bold animate-pulse">
              Loading matches...
            </div>
          </div>
        ) : matchedNames.length > 0 ? (
          <>
            <div className="text-center my-6 animate-bounce-in">
              <div className="text-5xl mb-2">(◕‿◕✿)</div>
              <p className="text-gray-500 font-semibold">
                Peter & Paula agree on {matchedNames.length} name{matchedNames.length !== 1 ? 's' : ''}!
              </p>
            </div>

            <div className="space-y-3">
              {matchedNames.map((n, i) => (
                <div
                  key={n.id}
                  className="animate-slide-up bg-gradient-to-r from-white to-kirby-bg rounded-2xl p-5 shadow-md border-2 border-kirby-light/40 flex items-center gap-4"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <span className="text-3xl">💖</span>
                  <span className="text-2xl font-extrabold text-gray-800">
                    {n.name}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-5xl mb-4 animate-float">😴</div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">No matches yet</h3>
            <p className="text-gray-400 font-semibold">
              Keep swiping — the magic happens when<br />both of you ❤️ the same name!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
