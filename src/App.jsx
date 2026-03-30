import { useState, useEffect, useCallback } from 'react'
import LandingScreen from './components/LandingScreen'
import SwipeCard from './components/SwipeCard'
import MatchOverlay from './components/MatchOverlay'
import EndScreen from './components/EndScreen'
import MatchesDashboard from './components/MatchesDashboard'
import { likeName, undoLike } from './utils/api'

const VIEWS = { LANDING: 'landing', SWIPE: 'swipe', MATCHES: 'matches', DONE: 'done' }

export default function App() {
  const [view, setView] = useState(VIEWS.LANDING)
  const [partner, setPartner] = useState(null)
  const [names, setNames] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [processedIds, setProcessedIds] = useState(new Set())
  const [likedIds, setLikedIds] = useState(new Set())
  const [matchName, setMatchName] = useState(null)
  const [showMatch, setShowMatch] = useState(false)
  const [lastAction, setLastAction] = useState(null) // { nameId, action, index }
  const [animDirection, setAnimDirection] = useState(null)

  // Load partner from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('babyg_partner')
    if (saved) {
      setPartner(saved)
      setView(VIEWS.SWIPE)
    }
  }, [])

  // Load names.json
  useEffect(() => {
    fetch('/names.json')
      .then(r => r.json())
      .then(data => setNames(data))
      .catch(err => console.error('Failed to load names:', err))
  }, [])

  // Load processed/liked IDs from localStorage
  useEffect(() => {
    if (!partner) return
    const savedProcessed = localStorage.getItem(`babyg_processed_${partner}`)
    const savedLiked = localStorage.getItem(`babyg_liked_${partner}`)
    if (savedProcessed) setProcessedIds(new Set(JSON.parse(savedProcessed)))
    if (savedLiked) setLikedIds(new Set(JSON.parse(savedLiked)))
  }, [partner])

  // Persist to localStorage
  useEffect(() => {
    if (!partner) return
    localStorage.setItem(`babyg_processed_${partner}`, JSON.stringify([...processedIds]))
  }, [processedIds, partner])

  useEffect(() => {
    if (!partner) return
    localStorage.setItem(`babyg_liked_${partner}`, JSON.stringify([...likedIds]))
  }, [likedIds, partner])

  // Compute unprocessed names
  const unprocessed = names.filter(n => !processedIds.has(n.id))
  const currentName = unprocessed[0] || null
  const totalCount = names.length
  const processedCount = processedIds.size

  const selectPartner = (p) => {
    setPartner(p)
    localStorage.setItem('babyg_partner', p)
    setView(VIEWS.SWIPE)
  }

  const handleLike = useCallback(async () => {
    if (!currentName) return
    setAnimDirection('right')
    const nameId = currentName.id

    setLastAction({ nameId, action: 'like', name: currentName.name })
    setProcessedIds(prev => new Set([...prev, nameId]))
    setLikedIds(prev => new Set([...prev, nameId]))

    // Sync to cloud
    const result = await likeName(partner, nameId)
    if (result.match) {
      setMatchName(currentName.name)
      setShowMatch(true)
    }

    setTimeout(() => setAnimDirection(null), 300)
  }, [currentName, partner])

  const handleDiscard = useCallback(() => {
    if (!currentName) return
    setAnimDirection('left')
    const nameId = currentName.id

    setLastAction({ nameId, action: 'discard', name: currentName.name })
    setProcessedIds(prev => new Set([...prev, nameId]))

    setTimeout(() => setAnimDirection(null), 300)
  }, [currentName])

  const handleUndo = useCallback(async () => {
    if (!lastAction) return
    const { nameId, action } = lastAction

    setProcessedIds(prev => {
      const next = new Set(prev)
      next.delete(nameId)
      return next
    })

    if (action === 'like') {
      setLikedIds(prev => {
        const next = new Set(prev)
        next.delete(nameId)
        return next
      })
      await undoLike(partner, nameId)
    }

    setLastAction(null)
  }, [lastAction, partner])

  const switchPartner = () => {
    localStorage.removeItem('babyg_partner')
    setPartner(null)
    setProcessedIds(new Set())
    setLikedIds(new Set())
    setLastAction(null)
    setView(VIEWS.LANDING)
  }

  // Check if done
  const isDone = names.length > 0 && unprocessed.length === 0

  return (
    <div className="h-full flex flex-col">
      {view === VIEWS.LANDING && (
        <LandingScreen onSelect={selectPartner} />
      )}

      {view === VIEWS.SWIPE && !isDone && (
        <SwipeCard
          name={currentName}
          onLike={handleLike}
          onDiscard={handleDiscard}
          onUndo={handleUndo}
          canUndo={!!lastAction}
          processedCount={processedCount}
          totalCount={totalCount}
          animDirection={animDirection}
          partner={partner}
          onViewMatches={() => setView(VIEWS.MATCHES)}
          onSwitchPartner={switchPartner}
        />
      )}

      {view === VIEWS.SWIPE && isDone && (
        <EndScreen
          likedIds={likedIds}
          names={names}
          partner={partner}
          onViewMatches={() => setView(VIEWS.MATCHES)}
          onSwitchPartner={switchPartner}
        />
      )}

      {view === VIEWS.MATCHES && (
        <MatchesDashboard
          names={names}
          onBack={() => setView(isDone ? VIEWS.SWIPE : VIEWS.SWIPE)}
          partner={partner}
          onSwitchPartner={switchPartner}
        />
      )}

      {showMatch && (
        <MatchOverlay
          name={matchName}
          onClose={() => setShowMatch(false)}
        />
      )}
    </div>
  )
}
