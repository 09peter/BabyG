export async function onRequestPost(context) {
  const { request, env } = context
  const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS })
  }

  try {
    const { partner, nameId } = await request.json()

    if (!partner || !nameId) {
      return new Response(
        JSON.stringify({ error: 'Missing partner or nameId' }),
        { status: 400, headers: CORS_HEADERS }
      )
    }

    const partnerKey = `${partner}_likes`

    // Remove from partner's likes
    const currentRaw = await env.BABYG_KV.get(partnerKey)
    const currentLikes = currentRaw ? JSON.parse(currentRaw) : []
    const updated = currentLikes.filter(id => id !== nameId)
    await env.BABYG_KV.put(partnerKey, JSON.stringify(updated))

    // Also remove from mutual matches if it was there
    const matchesRaw = await env.BABYG_KV.get('mutual_matches')
    const matches = matchesRaw ? JSON.parse(matchesRaw) : []
    const updatedMatches = matches.filter(id => id !== nameId)
    await env.BABYG_KV.put('mutual_matches', JSON.stringify(updatedMatches))

    return new Response(
      JSON.stringify({ success: true }),
      { headers: CORS_HEADERS }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', detail: err.message }),
      { status: 500, headers: CORS_HEADERS }
    )
  }
}
