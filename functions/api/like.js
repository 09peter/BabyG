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
    const otherPartner = partner === 'peter' ? 'paula' : 'peter'
    const otherKey = `${otherPartner}_likes`

    // Get current likes for this partner
    const currentRaw = await env.BABYG_KV.get(partnerKey)
    const currentLikes = currentRaw ? JSON.parse(currentRaw) : []

    // Add the name if not already there
    if (!currentLikes.includes(nameId)) {
      currentLikes.push(nameId)
      await env.BABYG_KV.put(partnerKey, JSON.stringify(currentLikes))
    }

    // Check if the other partner also likes this name
    const otherRaw = await env.BABYG_KV.get(otherKey)
    const otherLikes = otherRaw ? JSON.parse(otherRaw) : []
    const isMatch = otherLikes.includes(nameId)

    // If match, update mutual matches
    if (isMatch) {
      const matchesRaw = await env.BABYG_KV.get('mutual_matches')
      const matches = matchesRaw ? JSON.parse(matchesRaw) : []
      if (!matches.includes(nameId)) {
        matches.push(nameId)
        await env.BABYG_KV.put('mutual_matches', JSON.stringify(matches))
      }
    }

    return new Response(
      JSON.stringify({ success: true, match: isMatch }),
      { headers: CORS_HEADERS }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', detail: err.message }),
      { status: 500, headers: CORS_HEADERS }
    )
  }
}
