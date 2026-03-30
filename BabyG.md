# Product Requirements Document (PRD): Baby G



## 1. Executive Summary

A lightweight, mobile-first web application enabling two expecting parents to independently swipe through a predefined database of baby names. The system synchronizes their preferences in the cloud and highlights mutual matches. 



## 2. Architecture & Tech Stack

* **Frontend Environment:** Vite + React (or Vue). Compiles to static HTML/CSS/JS.

* **Styling:** TailwindCSS for rapid, responsive UI development.

* **Hosting:** Cloudflare Pages (connected to a GitHub repository for automated CI/CD deployments).

* **Backend API:** Cloudflare Pages Functions (serverless JavaScript endpoints residing in the same repository).

* **Database:** Cloudflare KV (Key-Value store) for persisting user likes and calculating matches.



## 3. Core User Workflows

### A. Initialization & Authentication

1.  User accesses the Cloudflare Pages URL on their mobile device.

2.  A simple landing screen asks "Who is swiping?" with two buttons (e.g., "Partner A" and "Partner B").

3.  The selection is stored in the browser's `localStorage` so they don't have to select it again.



### B. The Swiping Interface (The "Stack")

1.  The app loads a static `names.json` file containing the master list of names.

2.  The UI presents a Tinder-style card with the name. 

3.  **Actions:**

    * Swipe Right / Tap Heart = "Like"

    * Swipe Left / Tap X = "Discard"

4.  **Local State:** Every action immediately updates `localStorage` so the app remembers which names have been processed, preventing duplicates on refresh.

5.  **Remote Sync:** Every "Like" triggers an asynchronous background API call to Cloudflare Pages Functions to update the user's list in Cloudflare KV.



### C. The Match Engine

1.  When a user likes a name, the Cloudflare Function checks the partner's KV record.

2.  If the partner's array also contains that name, the API returns a `match: true` flag.

3.  The frontend triggers a celebratory "Match!" UI overlay.



### D. The Matches Dashboard

1.  A dedicated tab or view where users can see a chronological list of all mutually liked names.

2.  Data is fetched directly from the Cloudflare API to ensure both partners see the exact same list.



## 4. Data Models

### Static Data (`names.json`)

A simple array of objects, allowing for future extensibility (e.g., filtering by gender).

```json

[

  { "id": "1", "name": "Emma", "gender": "f" },

  { "id": "2", "name": "Liam", "gender": "m" }

]

```



### Cloudflare KV Structure

* **Key:** `partner_a_likes` | **Value:** `["1", "4", "7"]` (Array of Name IDs)

* **Key:** `partner_b_likes` | **Value:** `["2", "4", "9"]` (Array of Name IDs)

* **Key:** `mutual_matches` | **Value:** `["4"]` (Calculated and stored for quick retrieval)



## 5. Deployment Pipeline

1.  Code is committed to the `main` branch of the GitHub repository.

2.  Cloudflare Pages automatically detects the push, runs the build command (`npm run build`), and deploys the static assets.

3.  Cloudflare Pages automatically routes API requests to the `functions/` directory and binds the KV namespace.