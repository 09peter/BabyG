export default function SwipeCard({
  name,
  onLike,
  onDiscard,
  onUndo,
  canUndo,
  processedCount,
  totalCount,
  animDirection,
  partner,
  onViewMatches,
  onSwitchPartner,
}) {
  const displayName = partner === 'peter' ? 'Peter' : 'Paula'
  const progress = totalCount > 0 ? (processedCount / totalCount) * 100 : 0

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={onSwitchPartner}
          className="text-sm text-kirby-pink font-bold hover:text-kirby-dark transition-colors"
        >
          ← Switch
        </button>
        <h2 className="text-lg font-extrabold text-kirby-dark">
          {displayName}'s turn
        </h2>
        <button
          onClick={onViewMatches}
          className="text-sm bg-kirby-pink text-white font-bold px-3 py-1 rounded-full hover:bg-kirby-dark transition-colors"
        >
          Matches 💕
        </button>
      </div>

      {/* Progress bar */}
      <div className="px-4 mb-2">
        <div className="flex justify-between text-xs text-gray-500 font-semibold mb-1">
          <span>{processedCount} / {totalCount} names</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-kirby-light/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-kirby-pink to-kirby-dark rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center px-6">
        {name ? (
          <div
            className={`
              w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8
              flex items-center justify-center min-h-[280px]
              border-4 border-kirby-light/40
              ${animDirection === 'left' ? 'animate-card-left' : ''}
              ${animDirection === 'right' ? 'animate-card-right' : ''}
            `}
          >
            <div className="text-center">
              <div className="text-6xl font-black text-gray-800 tracking-tight">
                {name.name}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-400 text-lg font-semibold">Loading names...</div>
        )}
      </div>

      {/* Action buttons */}
      <div className="px-6 pb-6 pt-2">
        {/* Undo button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`
              text-sm font-bold px-4 py-1 rounded-full transition-all duration-200
              ${canUndo
                ? 'text-gray-500 hover:text-kirby-dark hover:bg-kirby-bg'
                : 'text-gray-300 cursor-not-allowed'}
            `}
          >
            ↩ Undo
          </button>
        </div>

        <div className="flex justify-center gap-8">
          {/* Poop / Discard */}
          <button
            onClick={onDiscard}
            disabled={!name}
            className="w-20 h-20 bg-white rounded-full shadow-lg border-4 border-amber-200 flex items-center justify-center text-4xl hover:shadow-xl transform hover:scale-110 active:scale-90 transition-all duration-200 disabled:opacity-50"
          >
            💩
          </button>

          {/* Heart / Like */}
          <button
            onClick={onLike}
            disabled={!name}
            className="w-20 h-20 bg-white rounded-full shadow-lg border-4 border-kirby-light flex items-center justify-center text-4xl hover:shadow-xl transform hover:scale-110 active:scale-90 transition-all duration-200 disabled:opacity-50"
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  )
}
