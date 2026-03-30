export async function onRequestGet(context) {
  const { env } = context
  const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  try {
    const matchesRaw = await env.BABYG_KV.get('mutual_matches')
    const matches = matchesRaw ? JSON.parse(matchesRaw) : []

    return new Response(
      JSON.stringify({ matches }),
      { headers: CORS_HEADERS }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', detail: err.message }),
      { status: 500, headers: CORS_HEADERS }
    )
  }
}
