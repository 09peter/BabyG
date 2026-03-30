const API_BASE = '/api'

export async function likeName(partner, nameId) {
  try {
    const res = await fetch(`${API_BASE}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ partner, nameId }),
    })
    if (!res.ok) throw new Error('API error')
    return await res.json()
  } catch (err) {
    console.error('Failed to sync like:', err)
    return { success: false, match: false }
  }
}

export async function getMatches() {
  try {
    const res = await fetch(`${API_BASE}/matches`)
    if (!res.ok) throw new Error('API error')
    return await res.json()
  } catch (err) {
    console.error('Failed to fetch matches:', err)
    return { matches: [] }
  }
}

export async function undoLike(partner, nameId) {
  try {
    const res = await fetch(`${API_BASE}/unlike`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ partner, nameId }),
    })
    if (!res.ok) throw new Error('API error')
    return await res.json()
  } catch (err) {
    console.error('Failed to undo like:', err)
    return { success: false }
  }
}
