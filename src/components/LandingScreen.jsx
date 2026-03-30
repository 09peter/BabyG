export default function LandingScreen({ onSelect }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      {/* Kirby-style star decorations */}
      <div className="absolute top-8 left-8 text-3xl animate-float">⭐</div>
      <div className="absolute top-12 right-10 text-2xl animate-float" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute bottom-20 left-12 text-2xl animate-float" style={{ animationDelay: '0.5s' }}>⭐</div>
      <div className="absolute bottom-32 right-8 text-3xl animate-float" style={{ animationDelay: '1.5s' }}>✨</div>

      {/* Logo */}
      <div className="animate-bounce-in">
        <div className="text-7xl mb-4">👶</div>
        <h1 className="text-5xl font-black text-kirby-dark mb-2 tracking-tight">
          Baby G
        </h1>
        <p className="text-kirby-pink font-semibold text-lg mb-12">
          Find the perfect name together!
        </p>
      </div>

      {/* Selection */}
      <p className="text-gray-600 font-bold text-xl mb-6">
        Who is swiping?
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => onSelect('peter')}
          className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-extrabold text-xl py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
        >
          🧔 Peter
        </button>
        <button
          onClick={() => onSelect('paula')}
          className="bg-gradient-to-r from-kirby-pink to-kirby-dark text-white font-extrabold text-xl py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
        >
          👩 Paula
        </button>
      </div>
    </div>
  )
}
