import { useState, useEffect } from 'react'
import { getMatches } from '../utils/api'

export default function EndScreen({ likedIds, names, partner, onViewMatches, onSwitchPartner }) {
  const [matchedNames, setMatchedNames] = useState([])
  const [loading, setLoading] = useState(true)

  const likedNames = names.filter(n => likedIds.has(n.id))
  const displayName = partner === 'peter' ? 'Peter' : 'Paula'

  useEffect(() => {
    getMatches().then(data => {
      const matchIds = new Set(data.matches || [])
      setMatchedNames(names.filter(n => matchIds.has(n.id)))
      setLoading(false)
    })
  }, [names])

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={onSwitchPartner}
          className="text-sm text-kirby-pink font-bold hover:text-kirby-dark transition-colors"
        >
          ← Switch
        </button>
        <h2 className="text-lg font-extrabold text-kirby-dark">
          All Done!
        </h2>
        <button
          onClick={onViewMatches}
          className="text-sm bg-kirby-pink text-white font-bold px-3 py-1 rounded-full hover:bg-kirby-dark transition-colors"
        >
          Matches 💕
        </button>
      </div>

      <div className="flex-1 px-6 pb-8">
        {/* Celebration */}
        <div className="text-center my-6 animate-bounce-in">
          <div className="text-6xl mb-3">🎉</div>
          <h1 className="text-3xl font-black text-kirby-dark mb-2">
            You did it, {displayName}!
          </h1>
          <p className="text-gray-500 font-semibold">
            You've swiped through all the names
          </p>
        </div>

        {/* Matches section */}
        {!loading && matchedNames.length > 0 && (
          <div className="mb-6 animate-slide-up">
            <h3 className="text-xl font-extrabold text-kirby-dark mb-3 flex items-center gap-2">
              💕 Mutual Matches
            </h3>
            <div className="bg-gradient-to-br from-kirby-light/30 to-kirby-pink/20 rounded-2xl p-4 border-2 border-kirby-light/50">
              <div className="flex flex-wrap gap-2">
                {matchedNames.map(n => (
                  <span
                    key={n.id}
                    className="bg-gradient-to-r from-kirby-pink to-kirby-dark text-white font-bold px-4 py-2 rounded-full text-sm shadow-md"
                  >
                    {n.name} 💖
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Liked names section */}
        {likedNames.length > 0 && (
          <div className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <h3 className="text-xl font-extrabold text-gray-700 mb-3 flex items-center gap-2">
              ❤️ {displayName}'s Liked Names ({likedNames.length})
            </h3>
            <div className="bg-white/60 rounded-2xl p-4 border-2 border-kirby-light/30">
              <div className="flex flex-wrap gap-2">
                {likedNames.map(n => (
                  <span
                    key={n.id}
                    className="bg-white text-gray-700 font-semibold px-3 py-1.5 rounded-full text-sm border border-kirby-light shadow-sm"
                  >
                    {n.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {likedNames.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            <div className="text-4xl mb-2">💩</div>
            <p className="font-semibold">No names liked... tough crowd!</p>
          </div>
        )}
      </div>
    </div>
  )
}
