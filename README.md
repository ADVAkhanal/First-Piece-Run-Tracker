# First Pass Yield Tracker
### Advanced Machining & Fab Inc

A shared, real-time manufacturing quality control tracker. All users on the same URL see the same data — entries update automatically every 5 seconds across all open browsers.

## Deploy to Railway

1. Push this folder to a new GitHub repo
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
3. Select your repo — Railway auto-detects Node.js and deploys instantly
4. Done. Everyone who visits the Railway URL shares the same live data.

### Keeping data across redeploys (recommended)
By default, Railway's filesystem resets on each new deploy. To make data permanent:
1. In Railway → your project → **Add Volume**
2. Mount path: `/data`
3. Add env var: `DATA_DIR=/data`

That's it — your entries will survive redeploys forever.

## Run Locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## How it works

- **Shared backend**: All entries are stored server-side in `data/entries.json`
- **Live polling**: The browser checks for new entries every 5 seconds — no page refresh needed
- **REST API**: `GET/POST /api/entries`, `PUT/DELETE /api/entries/:id`
