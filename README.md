# First Pass Yield Tracker
### Advanced Machining & Fab Inc

A manufacturing quality control tracker for First Pass Yield (FPY) data.

## Deploy to Railway

1. Push this folder to a new GitHub repo
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
3. Select your repo — Railway auto-detects Node.js and deploys instantly
4. Done. Your app is live at the Railway-provided URL.

No environment variables required.

## Run Locally

```bash
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000)

## Features

- Log work orders with part number, customer, work center, setup tech, and more
- Pass / Fail / Pending result tracking with live FPY % calculation
- Edit and delete entries
- Export to CSV, JSON, or Print/PDF
- Data persists in browser localStorage
