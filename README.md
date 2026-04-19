# Voice2Venture — Speak Your Business Into Existence

An AI-powered daily business coaching app. Speak or type what you did today and receive a structured, evolving 6-step growth plan — in your language, with ₹ INR focus.

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. (Optional) Set your Anthropic API key

Create a `.env` file in the project root (one is already provided):

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

> **Note:** The app works **without an API key** using the built-in offline coaching engine. Add a key for Claude AI-powered responses.

### 3. Start the app

```bash
npm start
```

Open **http://localhost:3001** in your browser — that's it!

For auto-reload during development:
```bash
npm run dev
```

---

## Project Structure

```
/
├── index.html       ← Frontend UI (Voice2Venture)
├── script.js        ← Frontend logic (generate, voice input, localStorage)
├── server.js        ← Express server (serves frontend + AI coaching engine)
├── .env             ← Your API key (not committed to git)
├── package.json     ← Dependencies
└── README.md
```

---

## How to Use

1. Open **http://localhost:3001** in your browser
2. Select your language (English, Hindi, Kannada, Tamil, Telugu, + more)
3. **Speak** (tap the 🎤 mic button) or **type** your day's activity
4. Click **✨ Get Today's Plan** (or press Enter)
5. Receive your **6-step growth plan** in the output card
6. Each subsequent day's plan **builds on the previous** — no repetition
7. View your **Growth Journey** timeline below the output
8. Click any timeline entry to re-read that day's plan

---

## Features

| Feature | Details |
|---|---|
| **🎙️ Voice Input** | Web Speech API — speak in any supported Indian language |
| **🤖 AI Backend** | Claude Sonnet via Anthropic API (+ offline fallback engine) |
| **📋 6-Step Format** | Structured business growth output every day |
| **📈 Day Tracking** | localStorage — increments each successful generation |
| **🧠 Evolution Memory** | Previous output sent to avoid repetition |
| **📊 Timeline** | Full history of past outputs, click to expand |
| **🌐 Multilingual** | English, Hindi, Kannada, Tamil, Telugu, Malayalam, Marathi, Bengali, Gujarati, Punjabi |
| **💰 INR Currency** | All money references use ₹ (Indian Rupees) |
| **🔄 Reset** | Clear history and start from Day 1 |

---

## Notes

- API key is **never** exposed to the frontend; all calls go through the Express backend.
- Day counter increments only on **successful** API responses.
- History is stored in `localStorage` — clearing browser data will reset it.
- Voice input quality depends on browser support (Chrome recommended).
