# Cloudflare Setup Guide for Baby G

## Prerequisites
- A Cloudflare account (free tier works fine)
- Node.js 18+ installed
- Wrangler CLI: `npm install -g wrangler`

---

## Step 1: Authenticate Wrangler

```bash
wrangler login
```

This opens a browser window — authorize the CLI.

---

## Step 2: Create a KV Namespace

```bash
wrangler kv namespace create "BABYG_KV"
```

This will output something like:

```
{ binding = "BABYG_KV", id = "abc123def456..." }
```

**Copy the `id` value** and paste it into `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "BABYG_KV"
id = "abc123def456..."   # <-- paste your real ID here
```

---

## Step 3: Create a Cloudflare Pages Project

### Option A: Via Dashboard (Recommended)

1. Go to https://dash.cloudflare.com → **Workers & Pages** → **Create**
2. Select **Pages** → **Connect to Git**
3. Select the repo: `09peter/BabyG`
4. Configure build settings:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Under **Environment variables**, no special vars needed
6. Click **Save and Deploy**

### Option B: Via Wrangler CLI

```bash
wrangler pages project create baby-g
```

---

## Step 4: Bind KV to Pages

1. In the Cloudflare Dashboard, go to your **baby-g** Pages project
2. Go to **Settings** → **Functions** → **KV namespace bindings**
3. Add a binding:
   - **Variable name:** `BABYG_KV`
   - **KV namespace:** Select the namespace you created in Step 2
4. **Important:** Do this for BOTH **Production** and **Preview** environments

---

## Step 5: Deploy

Every push to `main` on GitHub will auto-deploy. Or manually:

```bash
npm run build
wrangler pages deploy dist
```

---

## Local Development

To test the full stack locally (frontend + API + KV):

```bash
# Terminal 1: Vite dev server (frontend)
npm run dev

# Terminal 2: Wrangler pages dev (API + KV simulation)
wrangler pages dev dist --kv BABYG_KV --port 8788
```

Or for a simpler workflow, build first then run everything through wrangler:

```bash
npm run build
wrangler pages dev dist --kv BABYG_KV
```

> **Note:** `wrangler pages dev` simulates KV locally, so no cloud calls during development.

---

## Resetting Data

To clear all likes/matches and start fresh:

```bash
# Delete all keys in the KV namespace
wrangler kv key delete --namespace-id YOUR_KV_ID "peter_likes"
wrangler kv key delete --namespace-id YOUR_KV_ID "paula_likes"
wrangler kv key delete --namespace-id YOUR_KV_ID "mutual_matches"
```

Also clear `localStorage` in each browser.

---

## Troubleshooting

- **API returns 500:** Check that KV binding name `BABYG_KV` matches exactly in `wrangler.toml` and the Pages dashboard
- **CORS errors:** The API functions include CORS headers — should work out of the box
- **Stale data:** KV is eventually consistent (reads may lag 60s behind writes in rare cases)
