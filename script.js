// ─── Constants ────────────────────────────────────────────────────────────────
const API_BASE = "https://v2v-7nn4.onrender.com";// same origin
const STORAGE_KEY_DAY = "voice2venture_day";
const STORAGE_KEY_LAST = "voice2venture_last_output";
const STORAGE_KEY_HISTORY = "voice2venture_history";
const STORAGE_KEY_LANG = "voice2venture_language";

const STEP_ICONS = ["🎯", "🛠️", "📣", "💰", "🤝", "📊", "🧠", "🔑"];

const LANG_CODES = {
  English: "en-IN", Hindi: "hi-IN", Kannada: "kn-IN",
  Tamil: "ta-IN", Telugu: "te-IN", Malayalam: "ml-IN",
  Marathi: "mr-IN", Bengali: "bn-IN", Gujarati: "gu-IN",
  Punjabi: "pa-IN",
};

// ─── Chat State ───────────────────────────────────────────────────────────────
let chatHistory = []; // { role: "user"|"assistant", content: "..." }
let currentPlanData = null; // the last generated plan

// ─── Day Tracking ─────────────────────────────────────────────────────────────
function getCurrentDay() {
  return parseInt(localStorage.getItem(STORAGE_KEY_DAY) || "1", 10);
}

function incrementDay() {
  const next = getCurrentDay() + 1;
  localStorage.setItem(STORAGE_KEY_DAY, String(next));
  return next;
}

function resetDay() {
  if (!confirm("Reset everything and start fresh? All your history will be cleared.")) return;
  localStorage.removeItem(STORAGE_KEY_DAY);
  localStorage.removeItem(STORAGE_KEY_LAST);
  localStorage.removeItem(STORAGE_KEY_HISTORY);
  updateDayBadge(1);
  updateProgress(1);
  renderStreakDots(0);
  renderTimeline();
  hideChat();
  currentPlanData = null;
  chatHistory = [];
  document.getElementById("outputArea").innerHTML = `
    <div class="empty-state">
      <div class="empty-visual">🎙️</div>
      <h3>Speak your venture into existence</h3>
      <p>Tell us what you did today — type or tap the mic.
         Get a simple, step-by-step plan to grow your business,
         a little better each day.</p>
    </div>`;
  setStatus("✅ All cleared. Starting fresh from Day 1.", 3000);
}

function updateDayBadge(day) {
  const badge = document.getElementById("headerDayBadge");
  if (badge) {
    const fire = day >= 7 ? "🔥" : day >= 3 ? "⚡" : "🌱";
    badge.innerHTML = `<span class="streak-fire">${fire}</span><span>Day ${day}</span>`;
  }
}

function updateProgress(day) {
  const maxGoal = 30;
  const pct = Math.min(100, Math.round((day / maxGoal) * 100));
  const fill = document.getElementById("progressFill");
  const text = document.getElementById("progressText");
  if (fill) fill.style.width = pct + "%";
  if (text) text.textContent = `${day} / ${maxGoal} days`;
}

function renderStreakDots(completedDays) {
  const container = document.getElementById("streakDots");
  if (!container) return;
  const show = Math.min(completedDays, 7);
  let html = "";
  for (let i = 0; i < 7; i++) {
    html += `<div class="streak-dot ${i < show ? "active" : ""}"></div>`;
  }
  container.innerHTML = html;
}

// ─── Persistence ──────────────────────────────────────────────────────────────
function getLastOutput() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY_LAST)) || null; } catch { return null; }
}
function saveLastOutput(data) { localStorage.setItem(STORAGE_KEY_LAST, JSON.stringify(data)); }
function getHistory() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY_HISTORY)) || []; } catch { return []; }
}
function appendHistory(entry) {
  const h = getHistory(); h.push(entry);
  localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(h));
}
function saveLanguage(lang) { localStorage.setItem(STORAGE_KEY_LANG, lang); }
function getSavedLanguage() { return localStorage.getItem(STORAGE_KEY_LANG) || "English"; }

// ─── Voice Input ──────────────────────────────────────────────────────────────
let voiceRecognition = null;
let isRecording = false;

function toggleVoiceInput() {
  isRecording ? stopVoiceInput() : startVoiceInput();
}

function startVoiceInput() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { setStatus("⚠️ Voice not supported. Try Chrome.", 4000); return; }

  const language = document.getElementById("languageSelect")?.value || "English";
  voiceRecognition = new SR();
  voiceRecognition.lang = LANG_CODES[language] || "en-IN";
  voiceRecognition.interimResults = true;
  voiceRecognition.continuous = true;

  const textarea = document.getElementById("activityInput");
  const voiceBtn = document.getElementById("voiceBtn");
  const existingText = textarea.value;

  voiceBtn.classList.add("recording");
  voiceBtn.textContent = "⏹";
  isRecording = true;
  setStatus(`🎙️ Listening in ${language}...`);

  let finalTranscript = "";

  voiceRecognition.onresult = (e) => {
    let interim = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) finalTranscript += e.results[i][0].transcript + " ";
      else interim = e.results[i][0].transcript;
    }
    textarea.value = existingText + (existingText ? " " : "") + finalTranscript + interim;
  };

  voiceRecognition.onerror = (e) => {
    if (e.error === "not-allowed") setStatus("❌ Mic access denied.", 5000);
    else if (e.error === "no-speech") setStatus("⚠️ No speech detected.", 3000);
    else setStatus(`⚠️ Voice error: ${e.error}`, 4000);
    stopVoiceInput();
  };

  voiceRecognition.onend = () => {
    if (isRecording) { stopVoiceInput(); if (finalTranscript.trim()) setStatus("✅ Voice captured!", 3000); }
  };

  voiceRecognition.start();
}

function stopVoiceInput() {
  isRecording = false;
  const btn = document.getElementById("voiceBtn");
  if (voiceRecognition) { voiceRecognition.stop(); voiceRecognition = null; }
  if (btn) { btn.classList.remove("recording"); btn.textContent = "🎤"; }
}

// ─── Status ───────────────────────────────────────────────────────────────────
function setStatus(msg, clearAfter = 0) {
  const el = document.getElementById("statusText");
  if (el) el.innerHTML = msg;
  if (clearAfter > 0) setTimeout(() => { if (el) el.innerHTML = ""; }, clearAfter);
}

// ─── Generate Plan ────────────────────────────────────────────────────────────
async function generate() {
  if (isRecording) stopVoiceInput();

  const activityEl = document.getElementById("activityInput");
  const activity = activityEl?.value?.trim();
  if (!activity) { setStatus("⚠️ Please describe what you did today first.", 3000); activityEl?.focus(); return; }

  const language = document.getElementById("languageSelect")?.value || "English";
  const day = getCurrentDay();
  const previousOutput = getLastOutput();
  saveLanguage(language);

  const btn = document.getElementById("generateBtn");
  btn.disabled = true;
  btn.innerHTML = `<span>⏳</span> Creating your plan...`;
  setStatus("");
  hideChat();

  document.getElementById("outputArea").innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
      <span class="loading-text">Building your Day ${day} plan<span class="loading-dots"></span></span>
    </div>`;

  try {
    const res = await fetch(`${API_BASE}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activity, language, day, previousOutput }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || err.error || `Server error ${res.status}`);
    }

    const data = await res.json();

    saveLastOutput(data);
    appendHistory({
      day, timestamp: new Date().toISOString(),
      headline: data.headline, evolutionNote: data.evolutionNote,
      tomorrowFocus: data.tomorrowFocus, steps: data.steps, language,
    });

    const nextDay = incrementDay();
    updateDayBadge(nextDay);
    updateProgress(nextDay);
    renderStreakDots(nextDay - 1);
    renderOutputCard(data, day);
    renderTimeline();

    // Enable follow-up chat
    currentPlanData = data;
    chatHistory = [];
    showChat();

    activityEl.value = "";
    setStatus("✅ Day " + day + " plan ready!", 4000);

  } catch (err) {
    document.getElementById("outputArea").innerHTML = `
      <div class="empty-state">
        <div class="empty-visual">😕</div>
        <h3>Something went wrong</h3>
        <p>${escHtml(err.message)}<br><br>Make sure the server is running.
        <br><code style="font-size:0.7rem;color:var(--muted)">npm start</code></p>
      </div>`;
    setStatus("❌ Failed. Check if server is running.", 5000);
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<span>✨</span> Get Today's Plan`;
  }
}

// ─── Render Output Card ───────────────────────────────────────────────────────
function renderOutputCard(data, day) {
  const stepsHtml = (data.steps || []).map((s, idx) => {
    const icon = STEP_ICONS[idx % STEP_ICONS.length];
    return `<div class="step">
      <span class="step-icon">${icon}</span>
      <div class="step-num">Step ${s.number}</div>
      <div class="step-title">${escHtml(s.title)}</div>
      <div class="step-action">${escHtml(s.action)}</div>
    </div>`;
  }).join("");

  const displayDay = day || data.dayLabel || "Day ?";
  const dayLabel = typeof displayDay === "number" ? `Day ${displayDay}` : displayDay;
  const isEvolved = data.evolutionNote && !data.evolutionNote.includes("Day 1");
  const evolutionTag = isEvolved
    ? `<span class="evolution-tag">📈 Improved</span>`
    : `<span class="evolution-tag">🌱 Starting point</span>`;

  const totalSteps = (data.steps || []).length;
  const earn = "₹" + (totalSteps * 500 * (day || 1)).toLocaleString("en-IN");

  document.getElementById("outputArea").innerHTML = `
    <div class="output-card">
      <div class="card-header">
        <div class="card-header-left">
          <div class="card-day">📅 ${escHtml(data.dayLabel || dayLabel)}</div>
          <div class="card-headline">${escHtml(data.headline || "")}</div>
        </div>
        ${evolutionTag}
      </div>
      <div class="steps-grid">${stepsHtml}</div>
      <div class="stats-bar">
        <div class="stat-item"><div class="stat-icon">📋</div><div class="stat-value">${totalSteps}</div><div class="stat-label">Action Steps</div></div>
        <div class="stat-item"><div class="stat-icon">💰</div><div class="stat-value">${earn}</div><div class="stat-label">Possible Earnings</div></div>
        <div class="stat-item"><div class="stat-icon">📈</div><div class="stat-value">${data.dayLabel || dayLabel}</div><div class="stat-label">Growth Level</div></div>
      </div>
      <div class="card-footer">
        <div class="footer-item"><div class="footer-label">💡 What changed today</div><div class="footer-text">${escHtml(data.evolutionNote || "—")}</div></div>
        <div class="footer-item"><div class="footer-label">🎯 Tomorrow's focus</div><div class="footer-text">${escHtml(data.tomorrowFocus || "—")}</div></div>
      </div>
    </div>`;
}

// ─── Chat / Follow-up ─────────────────────────────────────────────────────────
function showChat() {
  const section = document.getElementById("chatSection");
  if (section) { section.classList.add("visible"); }
  document.getElementById("chatMessages").innerHTML = "";
  chatHistory = [];
}

function hideChat() {
  const section = document.getElementById("chatSection");
  if (section) section.classList.remove("visible");
}

async function sendChat() {
  const input = document.getElementById("chatInput");
  const question = input?.value?.trim();
  if (!question || !currentPlanData) return;

  const language = document.getElementById("languageSelect")?.value || "English";

  // Add user message to UI
  addChatMessage("user", question);
  input.value = "";
  chatHistory.push({ role: "user", content: question });

  // Show typing indicator
  const msgArea = document.getElementById("chatMessages");
  const typingEl = document.createElement("div");
  typingEl.className = "chat-typing";
  typingEl.id = "chatTyping";
  typingEl.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div> Thinking...`;
  msgArea.appendChild(typingEl);
  msgArea.scrollTop = msgArea.scrollHeight;

  const sendBtn = document.getElementById("chatSendBtn");
  sendBtn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        language,
        plan: currentPlanData,
        history: chatHistory.slice(0, -1), // don't duplicate the current question
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Server error ${res.status}`);
    }

    const data = await res.json();
    const answer = data.answer || "I couldn't come up with a good answer. Try asking differently!";

    // Remove typing indicator
    const typing = document.getElementById("chatTyping");
    if (typing) typing.remove();

    addChatMessage("assistant", answer);
    chatHistory.push({ role: "assistant", content: answer });

  } catch (err) {
    const typing = document.getElementById("chatTyping");
    if (typing) typing.remove();
    addChatMessage("assistant", "Sorry, I couldn't answer that right now. " + escHtml(err.message));
  } finally {
    sendBtn.disabled = false;
    input.focus();
  }
}

function addChatMessage(role, content) {
  const msgArea = document.getElementById("chatMessages");
  const labelText = role === "user" ? "You" : "🎙️ Voice2Venture";
  const div = document.createElement("div");
  div.className = `chat-msg ${role}`;
  div.innerHTML = `<div class="msg-label">${labelText}</div>${escHtml(content)}`;
  msgArea.appendChild(div);
  msgArea.scrollTop = msgArea.scrollHeight;
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
function renderTimeline() {
  const history = getHistory();
  const section = document.getElementById("timelineSection");
  const list = document.getElementById("timelineList");

  if (!history.length) { if (section) section.style.display = "none"; return; }
  section.style.display = "block";

  const reversed = [...history].reverse();
  list.innerHTML = reversed.map((entry, idx) => {
    const d = new Date(entry.timestamp);
    const dateStr = d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    const timeStr = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    const preview = entry.steps?.slice(0, 2).map(s => s.title).join(" → ") || "";
    const lang = entry.language && entry.language !== "English" ? ` · ${entry.language}` : "";

    return `<div class="timeline-item">
      <div class="timeline-dot-col">
        <div class="tl-dot ${idx === 0 ? 'latest' : ''}" style="background:${idx === 0 ? 'var(--accent)' : 'var(--border)'}"></div>
        <div class="tl-line"></div>
      </div>
      <div class="tl-card" onclick="expandHistory(${history.length - 1 - idx})">
        <div class="tl-card-top">
          <span class="tl-day">📅 Day ${entry.day}${lang}</span>
          <span class="tl-date">${dateStr} · ${timeStr}</span>
        </div>
        <div class="tl-headline">${escHtml(entry.headline || "")}</div>
        ${preview ? `<div class="tl-preview">📋 ${escHtml(preview)}</div>` : ""}
      </div>
    </div>`;
  }).join("");
}

function expandHistory(index) {
  const entry = getHistory()[index];
  if (!entry) return;
  renderOutputCard({ ...entry, dayLabel: `Day ${entry.day}` }, entry.day);
  currentPlanData = entry;
  chatHistory = [];
  showChat();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ─── Utility ──────────────────────────────────────────────────────────────────
function escHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const day = getCurrentDay();
  updateDayBadge(day);
  updateProgress(day);
  renderStreakDots(day - 1);
  renderTimeline();

  const savedLang = getSavedLanguage();
  const langSelect = document.getElementById("languageSelect");
  if (langSelect) {
    langSelect.value = savedLang;
    langSelect.addEventListener("change", () => saveLanguage(langSelect.value));
  }

  document.getElementById("activityInput")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); generate(); }
  });

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    const btn = document.getElementById("voiceBtn");
    if (btn) { btn.style.opacity = "0.3"; btn.title = "Voice not supported in this browser"; }
  }
});
