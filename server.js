const express = require("express");
const cors = require("cors");
const path = require("path");

// Load .env file if present
try { require("dotenv").config(); } catch (e) { /* dotenv optional */ }

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files from the project root
app.use(express.static(path.join(__dirname)));

// ─── Built-in Coaching Engine (works without any API key) ────────────────────

const STEP_BANK = {
  general: [
    { title: "Morning Power Block", titleHi: "सुबह का पावर ब्लॉक", titleKn: "ಬೆಳಗಿನ ಪವರ್ ಬ್ಲಾಕ್", icon: "🎯", actions: [
      "Block the first 90 minutes for your most important work — no phone, no email, just the task that earns money.",
      "Write your top 3 things to do on paper before opening any device — this clears your mind.",
      "Use 25-minute focused sessions: work hard, then rest 5 minutes. Repeat 3 times before lunch."
    ], actionsHi: [
      "पहले 90 मिनट अपने सबसे ज़रूरी काम के लिए रखें — फ़ोन नहीं, ईमेल नहीं, बस वो काम जो पैसा कमाए।",
      "कोई भी डिवाइस खोलने से पहले कागज़ पर अपने 3 सबसे ज़रूरी काम लिखें — इससे दिमाग साफ़ रहता है।",
      "25 मिनट की फ़ोकस्ड सेशन करें: ज़ोरदार काम करें, फिर 5 मिनट आराम। दोपहर तक 3 बार दोहराएँ।"
    ], actionsKn: [
      "ಮೊದಲ 90 ನಿಮಿಷಗಳನ್ನು ನಿಮ್ಮ ಅತಿ ಮುಖ್ಯ ಕೆಲಸಕ್ಕೆ ಮೀಸಲಿಡಿ — ಫೋನ್ ಇಲ್ಲ, ಇಮೇಲ್ ಇಲ್ಲ.",
      "ಯಾವುದೇ ಸಾಧನವನ್ನು ತೆರೆಯುವ ಮೊದಲು ನಿಮ್ಮ 3 ಪ್ರಮುಖ ಕೆಲಸಗಳನ್ನು ಕಾಗದದಲ್ಲಿ ಬರೆಯಿರಿ.",
      "25 ನಿಮಿಷ ಗಮನ ಕೇಂದ್ರಿತ ಕೆಲಸ ಮಾಡಿ, 5 ನಿಮಿಷ ವಿಶ್ರಾಂತಿ ತೆಗೆದುಕೊಳ್ಳಿ. ಮಧ್ಯಾಹ್ನದ ಮೊದಲು 3 ಬಾರಿ ಪುನರಾವರ್ತಿಸಿ."
    ]},
    { title: "Find Today's Money Maker", titleHi: "आज का पैसा कमाने वाला काम", titleKn: "ಇಂದಿನ ಹಣ ಗಳಿಸುವ ಕೆಲಸ", icon: "💰", actions: [
      "Look at yesterday's work — which one thing was closest to bringing in money? Do more of that today.",
      "Count how many people you've talked to this week about your product/service. Set a target of 5 more today.",
      "Set a small money goal for today — even ₹500 of new income proves your idea works."
    ], actionsHi: [
      "कल के काम को देखें — कौन सा काम पैसे के सबसे करीब था? आज उसी पर ज्यादा ध्यान दें।",
      "गिनें कि इस हफ्ते आपने कितने लोगों से अपने प्रोडक्ट/सर्विस के बारे में बात की। आज 5 और का टारगेट रखें।",
      "आज का छोटा पैसे का लक्ष्य रखें — ₹500 की नई कमाई भी साबित करती है कि आपका आइडिया चल सकता है।"
    ], actionsKn: [
      "ನಿನ್ನೆಯ ಕೆಲಸ ನೋಡಿ — ಯಾವುದು ಹಣ ತರುವುದಕ್ಕೆ ಹತ್ತಿರವಾಗಿತ್ತು? ಇಂದು ಅದನ್ನೇ ಹೆಚ್ಚು ಮಾಡಿ.",
      "ಈ ವಾರ ನಿಮ್ಮ ಉತ್ಪನ್ನ/ಸೇವೆ ಬಗ್ಗೆ ಎಷ್ಟು ಜನರೊಂದಿಗೆ ಮಾತಾಡಿದ್ದೀರಿ ಎಂದು ಲೆಕ್ಕ ಹಾಕಿ. ಇಂದು 5 ಹೆಚ್ಚಿನ ಗುರಿ ಇಡಿ.",
      "ಇಂದಿನ ಸಣ್ಣ ಹಣ ಗುರಿ ಇಡಿ — ₹500 ಹೊಸ ಆದಾಯವೂ ನಿಮ್ಮ ಐಡಿಯಾ ಕೆಲಸ ಮಾಡುತ್ತೆ ಎಂದು ಸಾಬೀತುಪಡಿಸುತ್ತದೆ."
    ]},
    { title: "Talk to Your Customers", titleHi: "अपने ग्राहकों से बात करें", titleKn: "ನಿಮ್ಮ ಗ್ರಾಹಕರೊಂದಿಗೆ ಮಾತನಾಡಿ", icon: "🤝", actions: [
      "Call one customer and ask: 'What can we do better?' Then actually do what they say.",
      "Write down in 3 lines: Who is your customer? What problem do they have? How do you solve it?",
      "Send a message to someone who was interested before but didn't buy — remind them you're there."
    ], actionsHi: [
      "एक ग्राहक को कॉल करें और पूछें: 'हम क्या बेहतर कर सकते हैं?' फिर उनकी बात सच में करें।",
      "3 लाइनों में लिखें: आपका ग्राहक कौन है? उनकी क्या समस्या है? आप उसे कैसे हल करते हैं?",
      "उस व्यक्ति को मैसेज करें जो पहले interested था लेकिन खरीदा नहीं — उन्हें याद दिलाएं कि आप मौजूद हैं।"
    ], actionsKn: [
      "ಒಬ್ಬ ಗ್ರಾಹಕರಿಗೆ ಕರೆ ಮಾಡಿ ಕೇಳಿ: 'ನಾವು ಏನನ್ನು ಉತ್ತಮಗೊಳಿಸಬಹುದು?' ಆಮೇಲೆ ಅವರು ಹೇಳಿದ್ದನ್ನು ನಿಜವಾಗಿ ಮಾಡಿ.",
      "3 ಸಾಲಿನಲ್ಲಿ ಬರೆಯಿರಿ: ನಿಮ್ಮ ಗ್ರಾಹಕ ಯಾರು? ಅವರ ಸಮಸ್ಯೆ ಏನು? ನೀವು ಅದನ್ನು ಹೇಗೆ ಪರಿಹರಿಸುತ್ತೀರಿ?",
      "ಮೊದಲು ಆಸಕ್ತಿ ತೋರಿಸಿದ ಆದರೆ ಖರೀದಿಸದ ವ್ಯಕ್ತಿಗೆ ಸಂದೇಶ ಕಳಿಸಿ."
    ]},
    { title: "Save Time on Boring Tasks", titleHi: "बोरिंग कामों पर समय बचाएं", titleKn: "ಬೋರಿಂಗ್ ಕೆಲಸಗಳಲ್ಲಿ ಸಮಯ ಉಳಿಸಿ", icon: "⚙️", actions: [
      "Find the one task you do over and over and spend 30 minutes looking for a tool or app to do it faster.",
      "Write step-by-step instructions for one daily task — so clear that anyone could follow them.",
      "Check your app subscriptions: cancel any you don't use. Save money for things that actually help."
    ], actionsHi: [
      "वो एक काम ढूंढें जो आप बार-बार करते हैं और 30 मिनट लगाकर कोई टूल या ऐप ढूंढें जो उसे तेज़ करे।",
      "एक रोज़ के काम के लिए step-by-step निर्देश लिखें — इतने साफ़ कि कोई भी फ़ॉलो कर सके।",
      "अपनी ऐप subscriptions चेक करें: जो use नहीं होतीं उन्हें बंद करें। पैसा बचाएं उन चीज़ों के लिए जो सच में मदद करती हैं।"
    ], actionsKn: [
      "ನೀವು ಪದೇ ಪದೇ ಮಾಡುವ ಒಂದು ಕೆಲಸ ಹುಡುಕಿ, ಅದನ್ನು ವೇಗವಾಗಿ ಮಾಡಲು ಟೂಲ್ ಅಥವಾ ಆ್ಯಪ್ ಹುಡುಕಲು 30 ನಿಮಿಷ ಕಳೆಯಿರಿ.",
      "ಒಂದು ದೈನಂದಿನ ಕೆಲಸಕ್ಕೆ ಹಂತ-ಹಂತವಾಗಿ ಸೂಚನೆ ಬರೆಯಿರಿ — ಯಾರಾದರೂ ಅನುಸರಿಸುವಷ್ಟು ಸ್ಪಷ್ಟವಾಗಿ.",
      "ನಿಮ್ಮ ಆ್ಯಪ್ ಚಂದಾಗಳನ್ನು ಪರಿಶೀಲಿಸಿ: ಬಳಸದವನ್ನು ರದ್ದು ಮಾಡಿ. ನಿಜವಾಗಿ ಸಹಾಯ ಮಾಡುವ ವಸ್ತುಗಳಿಗೆ ಹಣ ಉಳಿಸಿ."
    ]},
    { title: "Meet New People", titleHi: "नए लोगों से मिलें", titleKn: "ಹೊಸ ಜನರನ್ನು ಭೇಟಿ ಮಾಡಿ", icon: "🌐", actions: [
      "Message one person in your field you look up to — ask a specific question, not just 'hi'.",
      "Join one chat group or community where your customers hang out. Listen first, then help.",
      "Help someone in your network today without expecting anything back — good karma helps business."
    ], actionsHi: [
      "अपने field के एक ऐसे व्यक्ति को मैसेज करें जिन्हें आप admire करते हैं — एक specific सवाल पूछें, सिर्फ 'hi' नहीं।",
      "एक ऐसे ग्रुप या community में जुड़ें जहां आपके customers रहते हैं। पहले सुनें, फिर मदद करें।",
      "आज अपने network में किसी की मदद करें बिना कुछ उम्मीद किए — अच्छा काम business में लौटकर आता है।"
    ], actionsKn: [
      "ನಿಮ್ಮ ಕ್ಷೇತ್ರದಲ್ಲಿ ನೀವು ಮೆಚ್ಚುವ ಒಬ್ಬ ವ್ಯಕ್ತಿಗೆ ಸಂದೇಶ ಕಳಿಸಿ — ನಿರ್ದಿಷ್ಟ ಪ್ರಶ್ನೆ ಕೇಳಿ, ಕೇವಲ 'ಹಾಯ್' ಅಲ್ಲ.",
      "ನಿಮ್ಮ ಗ್ರಾಹಕರು ಇರುವ ಒಂದು ಗ್ರೂಪ್ ಅಥವಾ ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ. ಮೊದಲು ಕೇಳಿ, ನಂತರ ಸಹಾಯ ಮಾಡಿ.",
      "ಇಂದು ನಿಮ್ಮ ನೆಟ್ವರ್ಕ್‌ನಲ್ಲಿ ಯಾರಿಗಾದರೂ ಏನೂ ನಿರೀಕ್ಷಿಸದೆ ಸಹಾಯ ಮಾಡಿ — ಒಳ್ಳೆಯ ಕೆಲಸ ವ್ಯಾಪಾರದಲ್ಲಿ ಹಿಂತಿರುಗಿ ಬರುತ್ತದೆ."
    ]},
    { title: "Show People What You Do", titleHi: "लोगों को दिखाएं आप क्या करते हैं", titleKn: "ನೀವು ಏನು ಮಾಡುತ್ತೀರಿ ಎಂದು ಜನರಿಗೆ ತೋರಿಸಿ", icon: "📣", actions: [
      "Write one post or message showing what you did today — a real result or lesson learned.",
      "Share your story: what problem you found, how you solved it, what happened. This IS marketing.",
      "Comment helpfully on 5 posts from people who could be your customers — show up before you sell."
    ], actionsHi: [
      "एक पोस्ट या मैसेज लिखें जिसमें बताएं आज आपने क्या किया — एक real result या सीख।",
      "अपनी कहानी शेयर करें: क्या problem मिली, कैसे solve किया, क्या हुआ। यही marketing है।",
      "ऐसे 5 लोगों की posts पर helpful comment करें जो आपके customers हो सकते हैं — पहले दिखें, फिर बेचें।"
    ], actionsKn: [
      "ನೀವು ಇಂದು ಏನು ಮಾಡಿದ್ದೀರಿ ಎಂದು ಒಂದು ಪೋಸ್ಟ್ ಅಥವಾ ಸಂದೇಶ ಬರೆಯಿರಿ — ನಿಜವಾದ ಫಲಿತಾಂಶ ಅಥವಾ ಕಲಿತ ಪಾಠ.",
      "ನಿಮ್ಮ ಕಥೆ ಹಂಚಿಕೊಳ್ಳಿ: ಯಾವ ಸಮಸ್ಯೆ ಕಂಡುಬಂತು, ಹೇಗೆ ಪರಿಹರಿಸಿದ್ದೀರಿ, ಏನಾಯಿತು. ಇದೇ ಮಾರ್ಕೆಟಿಂಗ್.",
      "ನಿಮ್ಮ ಗ್ರಾಹಕರಾಗಬಹುದಾದ 5 ಜನರ ಪೋಸ್ಟ್‌ಗಳಿಗೆ ಸಹಾಯಕ ಕಾಮೆಂಟ್ ಮಾಡಿ — ಮೊದಲು ಕಾಣಿಸಿಕೊಳ್ಳಿ, ನಿಂತರ ಮಾರಿ."
    ]},
    { title: "Know Your Money", titleHi: "अपने पैसे को जानें", titleKn: "ನಿಮ್ಮ ಹಣವನ್ನು ತಿಳಿಯಿರಿ", icon: "📊", actions: [
      "Track every rupee coming in and going out today — even ₹10 matters when you're building habits.",
      "Calculate: how much money do you need per month to cover all costs? This is your break-even number.",
      "Open separate bank/UPI for business vs personal — even small amounts, keep them apart."
    ], actionsHi: [
      "आज आने और जाने वाली हर रुपये को track करें — ₹10 भी important है जब आप habit बना रहे हैं।",
      "Calculate करें: सब costs cover करने के लिए हर month कितने पैसे चाहिए? यह आपका break-even number है।",
      "Business और personal के लिए अलग bank/UPI रखें — छोटी amounts भी, अलग रखें।"
    ], actionsKn: [
      "ಇಂದು ಬರುವ ಮತ್ತು ಹೋಗುವ ಪ್ರತಿ ರೂಪಾಯಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ — ₹10 ಕೂಡಾ ಅಭ್ಯಾಸ ರೂಪಿಸುವಾಗ ಮುಖ್ಯ.",
      "ಲೆಕ್ಕ ಹಾಕಿ: ಎಲ್ಲಾ ಖರ್ಚುಗಳನ್ನು ಸರಿದೂಗಿಸಲು ತಿಂಗಳಿಗೆ ಎಷ್ಟು ಹಣ ಬೇಕು? ಇದು ನಿಮ್ಮ ಬ್ರೇಕ್-ಈವನ್ ಸಂಖ್ಯೆ.",
      "ವ್ಯಾಪಾರ ಮತ್ತು ವೈಯಕ್ತಿಕಕ್ಕೆ ಪ್ರತ್ಯೇಕ ಬ್ಯಾಂಕ್/UPI ತೆರೆಯಿರಿ — ಸಣ್ಣ ಮೊತ್ತವೂ ಸಹ, ಪ್ರತ್ಯೇಕವಾಗಿ ಇರಿಸಿ."
    ]},
    { title: "Learn Something New", titleHi: "कुछ नया सीखें", titleKn: "ಹೊಸದನ್ನು ಕಲಿಯಿರಿ", icon: "🧠", actions: [
      "Spend 20 minutes learning one skill that directly helps what you sell — YouTube is free.",
      "Watch how a similar business runs — take notes on what they do differently from you.",
      "Practice explaining your business in 30 seconds — if you can't say it simply, your customers won't get it."
    ], actionsHi: [
      "20 मिनट एक ऐसी skill सीखने में लगाएं जो directly आपके बेचने में मदद करे — YouTube free है।",
      "देखें कि एक similar business कैसे चलता है — notes लें कि वो आपसे अलग क्या करते हैं।",
      "अपने business को 30 seconds में explain करने की practice करें — अगर आप simply नहीं बोल सकते, तो customers नहीं समझेंगे।"
    ], actionsKn: [
      "20 ನಿಮಿಷ ನೀವು ಮಾರಾಟ ಮಾಡುವುದಕ್ಕೆ ನೇರವಾಗಿ ಸಹಾಯ ಮಾಡುವ ಒಂದು ಕೌಶಲ ಕಲಿಯಲು ಕಳೆಯಿರಿ — YouTube ಉಚಿತ.",
      "ಇದೇ ರೀತಿಯ ವ್ಯಾಪಾರ ಹೇಗೆ ನಡೆಯುತ್ತದೆ ಎಂದು ನೋಡಿ — ಅವರು ನಿಮ್ಮಿಂದ ಏನು ಬೇರೆ ಮಾಡುತ್ತಾರೆ ಎಂದು ಟಿಪ್ಪಣಿ ಮಾಡಿ.",
      "ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು 30 ಸೆಕೆಂಡುಗಳಲ್ಲಿ ವಿವರಿಸುವ ಅಭ್ಯಾಸ ಮಾಡಿ — ಸರಳವಾಗಿ ಹೇಳಲು ಸಾಧ್ಯವಿಲ್ಲದಿದ್ದರೆ, ಗ್ರಾಹಕರು ಅರ್ಥ ಮಾಡಿಕೊಳ್ಳುವುದಿಲ್ಲ."
    ]},
    { title: "Team Up with Others", titleHi: "दूसरों के साथ मिलकर काम करें", titleKn: "ಇತರರೊಂದಿಗೆ ಕೆಲಸ ಮಾಡಿ", icon: "🤲", actions: [
      "Find a business that's not your competitor but has the same customers — think of a way to help each other.",
      "Ask a supplier or vendor for better rates — the worst they say is no, but often they say yes.",
      "Think about who touches your product before the customer gets it — can you make that chain better?"
    ], actionsHi: [
      "एक ऐसा business खोजें जो आपका competitor नहीं है लेकिन same customers हैं — एक-दूसरे की मदद करने का तरीका सोचें।",
      "किसी supplier या vendor से बेहतर rates मांगें — worst case वो 'ना' बोलेंगे, लेकिन अक्सर 'हां' बोलते हैं।",
      "सोचें कि customer तक पहुंचने से पहले आपके product को कौन-कौन छूता है — क्या आप उस chain को बेहतर बना सकते हैं?"
    ], actionsKn: [
      "ನಿಮ್ಮ ಪ್ರತಿಸ್ಪರ್ಧಿ ಅಲ್ಲದ ಆದರೆ ಅದೇ ಗ್ರಾಹಕರನ್ನು ಹೊಂದಿರುವ ವ್ಯಾಪಾರ ಹುಡುಕಿ — ಪರಸ್ಪರ ಸಹಾಯ ಮಾಡುವ ಮಾರ್ಗ ಯೋಚಿಸಿ.",
      "ಸರಬರಾಜುದಾರ ಅಥವಾ ವೆಂಡರ್‌ಗೆ ಉತ್ತಮ ದರಗಳು ಕೇಳಿ — ಅವರು ಹೇಳುವ ಕೆಟ್ಟ ಉತ್ತರ 'ಇಲ್ಲ', ಆದರೆ ಸಾಮಾನ್ಯವಾಗಿ 'ಹೌದು' ಅನ್ನುತ್ತಾರೆ.",
      "ಗ್ರಾಹಕರಿಗೆ ತಲುಪುವ ಮೊದಲು ನಿಮ್ಮ ಉತ್ಪನ್ನವನ್ನು ಯಾರು ಮುಟ್ಟುತ್ತಾರೆ ಎಂದು ಯೋಚಿಸಿ — ಆ ಸರಪಳಿ ಉತ್ತಮಗೊಳಿಸಬಹುದೇ?"
    ]},
    { title: "Check What's Working", titleHi: "क्या काम कर रहा है, चेक करें", titleKn: "ಏನು ಕೆಲಸ ಮಾಡುತ್ತಿದೆ ಪರಿಶೀಲಿಸಿ", icon: "🔍", actions: [
      "Ask 3 people (customers, friends, family) what they think your biggest weak point is — note the common answer.",
      "Look at last week: what went well? What didn't? Write one line about what you'd change.",
      "Set one clear goal for next week — write it on paper and keep it where you can see it daily."
    ], actionsHi: [
      "3 लोगों से पूछें (customers, दोस्त, family) कि आपकी सबसे बड़ी कमज़ोरी क्या है — common जवाब नोट करें।",
      "पिछले हफ्ते देखें: क्या अच्छा गया? क्या नहीं? एक लाइन लिखें कि क्या बदलेंगे।",
      "अगले हफ्ते का एक clear goal set करें — कागज़ पर लिखें और वहां रखें जहां रोज़ दिखे।"
    ], actionsKn: [
      "3 ಜನರಿಗೆ (ಗ್ರಾಹಕರು, ಸ್ನೇಹಿತರು, ಕುಟುಂಬ) ನಿಮ್ಮ ಅತಿದೊಡ್ಡ ದೌರ್ಬಲ್ಯ ಏನೆಂದು ಕೇಳಿ — ಸಾಮಾನ್ಯ ಉತ್ತರ ಗಮನಿಸಿ.",
      "ಕಳೆದ ವಾರ ನೋಡಿ: ಏನು ಚೆನ್ನಾಗಿ ಹೋಯಿತು? ಏನು ಇಲ್ಲ? ಏನು ಬದಲಾಯಿಸುತ್ತೀರಿ ಎಂದು ಒಂದು ಸಾಲು ಬರೆಯಿರಿ.",
      "ಮುಂದಿನ ವಾರಕ್ಕೆ ಒಂದು ಸ್ಪಷ್ಟ ಗುರಿ ಹೊಂದಿಸಿ — ಕಾಗದದಲ್ಲಿ ಬರೆಯಿರಿ ಮತ್ತು ಪ್ರತಿದಿನ ಕಾಣುವ ಸ್ಥಳದಲ್ಲಿ ಇರಿಸಿ."
    ]},
    { title: "Try Something New", titleHi: "कुछ नया try करें", titleKn: "ಹೊಸದನ್ನು ಪ್ರಯತ್ನಿಸಿ", icon: "🧪", actions: [
      "Change one small thing today (your price, your message, your channel) and see what happens for 2 days.",
      "Try reaching customers in a new way you haven't tried — WhatsApp groups, local events, online ads — spend 1 hour on it.",
      "Try explaining your service two different ways and see which one gets better reactions from people."
    ], actionsHi: [
      "आज एक छोटी चीज़ बदलें (price, message, channel) और 2 दिन देखें क्या होता है।",
      "Customers तक नए तरीके से पहुंचें जो आपने try नहीं किया — WhatsApp groups, local events, online ads — 1 घंटा लगाएं।",
      "अपनी service दो अलग-अलग तरीकों से बताएं और देखें कि कौन सा तरीका लोगों पर बेहतर काम करता है।"
    ], actionsKn: [
      "ಇಂದು ಒಂದು ಸಣ್ಣ ಬದಲಾವಣೆ ಮಾಡಿ (ಬೆಲೆ, ಸಂದೇಶ, ಚಾನೆಲ್) ಮತ್ತು 2 ದಿನ ಏನಾಗುತ್ತದೆ ನೋಡಿ.",
      "ನೀವು ಪ್ರಯತ್ನಿಸದ ಹೊಸ ರೀತಿಯಲ್ಲಿ ಗ್ರಾಹಕರನ್ನು ತಲುಪಿ — WhatsApp ಗ್ರೂಪ್, ಸ್ಥಳೀಯ ಕಾರ್ಯಕ್ರಮ, ಆನ್‌ಲೈನ್ ಜಾಹೀರಾತು — 1 ಗಂಟೆ ಕಳೆಯಿರಿ.",
      "ನಿಮ್ಮ ಸೇವೆಯನ್ನು ಎರಡು ವಿಭಿನ್ನ ರೀತಿಯಲ್ಲಿ ವಿವರಿಸಿ, ಯಾವುದು ಜನರಿಂದ ಉತ್ತಮ ಪ್ರತಿಕ್ರಿಯೆ ಪಡೆಯುತ್ತದೆ ನೋಡಿ."
    ]},
    { title: "Remove What Slows You Down", titleHi: "जो slow करे उसे हटाएं", titleKn: "ನಿಮ್ಮನ್ನು ನಿಧಾನಗೊಳಿಸುವುದನ್ನು ತೆಗೆದುಹಾಕಿ", icon: "🗑️", actions: [
      "Find the one thing that wastes your time most — fix it today or stop doing it entirely.",
      "Group similar tasks: all calls in one block, all messages in another, all creative work together.",
      "Make a 'stop doing' list: what feels productive but doesn't actually make a difference?"
    ], actionsHi: [
      "वो एक चीज़ ढूंढें जो आपका सबसे ज्यादा time waste करती है — आज ठीक करें या पूरी तरह बंद करें।",
      "Similar tasks को group करें: सब calls एक block में, सब messages दूसरे में, सब creative काम एक साथ।",
      "'बंद करो' list बनाएं: कौन से काम productive लगते हैं लेकिन actually फ़र्क नहीं पड़ता?"
    ], actionsKn: [
      "ನಿಮ್ಮ ಸಮಯವನ್ನು ಅತ್ಯಧಿಕ ವ್ಯರ್ಥ ಮಾಡುವ ಒಂದು ವಿಷಯ ಕಂಡುಹಿಡಿಯಿ — ಇಂದು ಸರಿಪಡಿಸಿ ಅಥವಾ ಸಂಪೂರ್ಣವಾಗಿ ನಿಲ್ಲಿಸಿ.",
      "ಒಂದೇ ರೀತಿಯ ಕೆಲಸಗಳನ್ನು ಗುಂಪು ಮಾಡಿ: ಎಲ್ಲಾ ಕರೆಗಳು ಒಂದು ಬ್ಲಾಕ್‌ನಲ್ಲಿ, ಎಲ್ಲಾ ಸಂದೇಶಗಳು ಇನ್ನೊಂದರಲ್ಲಿ.",
      "'ಮಾಡುವುದನ್ನು ನಿಲ್ಲಿಸಿ' ಪಟ್ಟಿ ಮಾಡಿ: ಯಾವ ಚಟುವಟಿಕೆಗಳು ಉತ್ಪಾದಕವಾಗಿ ಅನಿಸುತ್ತವೆ ಆದರೆ ನಿಜವಾಗಿ ವ್ಯತ್ಯಾಸ ಮಾಡುವುದಿಲ್ಲ?"
    ]},
    { title: "Stand Out from Others", titleHi: "औरों से अलग दिखें", titleKn: "ಇತರರಿಂದ ವಿಭಿನ್ನವಾಗಿ ನಿಲ್ಲಿ", icon: "⭐", actions: [
      "Write in one line: 'I help [who] get [what result] by [how]' — this is your positioning.",
      "Check your online profile/page: can someone understand what you do within 5 seconds?",
      "Study one competitor: what do they do well? What do they miss? Own the gap."
    ], actionsHi: [
      "एक line में लिखें: 'मैं [किसकी] मदद करता/करती हूं [क्या result पाने में] [कैसे]' — यह आपकी positioning है।",
      "अपनी online profile/page चेक करें: क्या कोई 5 seconds में समझ सकता है कि आप क्या करते हैं?",
      "एक competitor को study करें: वो क्या अच्छा करते हैं? क्या miss करते हैं? उस gap को अपना बनाएं।"
    ], actionsKn: [
      "ಒಂದು ಸಾಲಿನಲ್ಲಿ ಬರೆಯಿರಿ: 'ನಾನು [ಯಾರಿಗೆ] [ಯಾವ ಫಲಿತಾಂಶ ಪಡೆಯಲು] [ಹೇಗೆ] ಸಹಾಯ ಮಾಡುತ್ತೇನೆ' — ಇದು ನಿಮ್ಮ ಪೊಸಿಷನಿಂಗ್.",
      "ನಿಮ್ಮ ಆನ್‌ಲೈನ್ ಪ್ರೊಫೈಲ್/ಪುಟ ಪರಿಶೀಲಿಸಿ: ಯಾರಾದರೂ 5 ಸೆಕೆಂಡಿನಲ್ಲಿ ನೀವು ಏನು ಮಾಡುತ್ತೀರಿ ಎಂದು ಅರ್ಥ ಮಾಡಿಕೊಳ್ಳಬಹುದೇ?",
      "ಒಬ್ಬ ಪ್ರತಿಸ್ಪರ್ಧಿ ಅಧ್ಯಯನ ಮಾಡಿ: ಅವರು ಏನನ್ನು ಚೆನ್ನಾಗಿ ಮಾಡುತ್ತಾರೆ? ಏನು ತಪ್ಪಿಸುತ್ತಾರೆ? ಆ ಅಂತರವನ್ನು ಸ್ವಂತ ಮಾಡಿಕೊಳ್ಳಿ."
    ]},
    { title: "Get Help — Don't Do Everything Alone", titleHi: "मदद लें — सब अकेले मत करो", titleKn: "ಸಹಾಯ ಪಡೆಯಿರಿ — ಎಲ್ಲವನ್ನೂ ಒಬ್ಬರೇ ಮಾಡಬೇಡಿ", icon: "👥", actions: [
      "List everything you did today and mark each as: only I can do / someone else could do / should be automated.",
      "Give one small task to someone else this week — start building the habit of delegating.",
      "Write clear instructions for the next task you want to give away: what to do, when to finish, how it should look."
    ], actionsHi: [
      "आज जो कुछ किया उसकी list बनाएं और हर एक को mark करें: सिर्फ मैं कर सकता हूं / कोई और कर सकता है / automate होना चाहिए।",
      "इस हफ्ते एक छोटा काम किसी और को दें — delegating की habit बनाना शुरू करें।",
      "अगले काम के लिए clear instructions लिखें जो आप किसी को देना चाहते हैं: क्या करना है, कब तक, कैसा दिखना चाहिए।"
    ], actionsKn: [
      "ಇಂದು ಮಾಡಿದ ಎಲ್ಲವನ್ನೂ ಪಟ್ಟಿ ಮಾಡಿ ಪ್ರತಿಯೊಂದನ್ನೂ ಗುರುತಿಸಿ: ನಾನು ಮಾತ್ರ ಮಾಡಬಹುದು / ಬೇರೆಯವರು ಮಾಡಬಹುದು / ಸ್ವಯಂಚಾಲಿತವಾಗಬೇಕು.",
      "ಈ ವಾರ ಒಂದು ಸಣ್ಣ ಕೆಲಸವನ್ನು ಬೇರೆಯವರಿಗೆ ಕೊಡಿ — ಒಪ್ಪಿಸುವ ಅಭ್ಯಾಸ ಬೆಳೆಸಲು ಪ್ರಾರಂಭಿಸಿ.",
      "ನೀವು ಒಪ್ಪಿಸಲು ಬಯಸುವ ಮುಂದಿನ ಕೆಲಸಕ್ಕೆ ಸ್ಪಷ್ಟ ಸೂಚನೆ ಬರೆಯಿರಿ: ಏನು ಮಾಡಬೇಕು, ಯಾವಾಗ ಮುಗಿಸಬೇಕು, ಹೇಗಿರಬೇಕು."
    ]},
    { title: "Stay Strong & Celebrate", titleHi: "मज़बूत रहें और जश्न मनाएं", titleKn: "ಬಲಶಾಲಿಯಾಗಿರಿ ಮತ್ತು ಆಚರಿಸಿ", icon: "🏆", actions: [
      "Write your top 3 business fears — then write what you'd do if each happened. Most are survivable.",
      "Take a 15-minute break doing something fun — your brain solves problems when you rest.",
      "Celebrate one win from this week — even small ones. Business people often forget to feel good about progress."
    ], actionsHi: [
      "अपने top 3 business डर लिखें — फिर लिखें कि अगर ऐसा हो जाए तो क्या करेंगे। ज्यादातर manageable हैं।",
      "15 मिनट का break लें कुछ मज़ेदार करते हुए — आपका दिमाग तब problems solve करता है जब आप rest करते हैं।",
      "इस हफ्ते की एक जीत celebrate करें — छोटी भी चलेगी। Business लोग अक्सर अपनी progress को feel करना भूल जाते हैं।"
    ], actionsKn: [
      "ನಿಮ್ಮ ಮೊದಲ 3 ವ್ಯಾಪಾರ ಭಯಗಳನ್ನು ಬರೆಯಿರಿ — ನಂತರ ಪ್ರತಿಯೊಂದು ಸಂಭವಿಸಿದರೆ ಏನು ಮಾಡುತ್ತೀರಿ ಎಂದು ಬರೆಯಿರಿ. ಹೆಚ್ಚಿನವು ನಿರ್ವಹಿಸಬಹುದಾದವುಗಳಾಗಿವೆ.",
      "ಏನಾದರೂ ಮಜಾ ಮಾಡುತ್ತ 15 ನಿಮಿಷ ವಿರಾಮ ತೆಗೆದುಕೊಳ್ಳಿ — ನೀವು ವಿಶ್ರಾಂತಿ ಪಡೆದಾಗ ನಿಮ್ಮ ಮೆದುಳು ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸುತ್ತದೆ.",
      "ಈ ವಾರದ ಒಂದು ಗೆಲುವನ್ನು ಆಚರಿಸಿ — ಸಣ್ಣದೂ ಸಹ. ವ್ಯಾಪಾರ ಜನರು ಸಾಮಾನ್ಯವಾಗಿ ಪ್ರಗತಿ ಬಗ್ಗೆ ಒಳ್ಳೆಯ ಅನುಭವ ಮಾಡಲು ಮರೆಯುತ್ತಾರೆ."
    ]},
    { title: "Watch the Market", titleHi: "बाज़ार पर नज़र रखें", titleKn: "ಮಾರುಕಟ್ಟೆ ಗಮನಿಸಿ", icon: "👀", actions: [
      "Spend 20 minutes reading about trends in your industry — how could you catch this wave?",
      "Explain your product to someone outside your field — outsiders spot things you miss.",
      "Check what your top 3 competitors posted this week — find gaps you can fill."
    ], actionsHi: [
      "20 मिनट अपनी industry के trends पढ़ने में लगाएं — इस wave को कैसे catch कर सकते हैं?",
      "अपने product को अपने field से बाहर के किसी व्यक्ति को explain करें — बाहर के लोग वो चीज़ें देखते हैं जो आप miss करते हैं।",
      "देखें कि इस हफ्ते आपके top 3 competitors ने क्या post किया — वो gaps ढूंढें जो आप भर सकते हैं।"
    ], actionsKn: [
      "20 ನಿಮಿಷ ನಿಮ್ಮ ಉದ್ಯಮದ ಟ್ರೆಂಡ್‌ಗಳ ಬಗ್ಗೆ ಓದಲು ಕಳೆಯಿರಿ — ಈ ತರಂಗವನ್ನು ಹೇಗೆ ಹಿಡಿಯಬಹುದು?",
      "ನಿಮ್ಮ ಕ್ಷೇತ್ರದ ಹೊರಗಿನ ಯಾರಿಗಾದರೂ ನಿಮ್ಮ ಉತ್ಪನ್ನವನ್ನು ವಿವರಿಸಿ — ಹೊರಗಿನವರು ನೀವು ತಪ್ಪಿಸುವ ವಿಷಯಗಳನ್ನು ಗಮನಿಸುತ್ತಾರೆ.",
      "ನಿಮ್ಮ ಮೊದಲ 3 ಪ್ರತಿಸ್ಪರ್ಧಿಗಳು ಈ ವಾರ ಏನು ಪೋಸ್ಟ್ ಮಾಡಿದರು ಪರಿಶೀಲಿಸಿ — ನೀವು ತುಂಬಬಹುದಾದ ಅಂತರಗಳನ್ನು ಹುಡುಕಿ."
    ]},
  ],
  meeting: [
    { title: "Make Meetings Worth It", titleHi: "मीटिंग्स को सार्थक बनाएं", titleKn: "ಸಭೆಗಳನ್ನು ಅರ್ಹವಾಗಿಸಿ", icon: "📋", actions: [
      "Check today's meetings: which ones could have been a message? Block that time for real work next time.",
      "For every meeting, write the ONE thing that was decided. No decision = that meeting was useless.",
      "Send a quick message after each meeting: what was decided, who does what, by when."
    ], actionsHi: [
      "आज की meetings चेक करें: कौन सी message हो सकती थी? अगली बार वो time real काम के लिए block करें।",
      "हर meeting के बाद वो ONE चीज़ लिखें जो decide हुई। कोई decision नहीं = वो meeting useless थी।",
      "हर meeting के बाद quick message भेजें: क्या decide हुआ, कौन क्या करेगा, कब तक।"
    ], actionsKn: [
      "ಇಂದಿನ ಸಭೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ: ಯಾವುವು ಸಂದೇಶವಾಗಿರಬಹುದಿತ್ತು? ಮುಂದಿನ ಬಾರಿ ಆ ಸಮಯವನ್ನು ನಿಜವಾದ ಕೆಲಸಕ್ಕೆ ಮೀಸಲಿಡಿ.",
      "ಪ್ರತಿ ಸಭೆಗೆ ನಿರ್ಧರಿಸಿದ ಒಂದು ವಿಷಯ ಬರೆಯಿರಿ. ನಿರ್ಧಾರ ಇಲ್ಲ = ಆ ಸಭೆ ವ್ಯರ್ಥ.",
      "ಪ್ರತಿ ಸಭೆ ನಂತರ ತ್ವರಿತ ಸಂದೇಶ ಕಳಿಸಿ: ಏನು ನಿರ್ಧರಿಸಲಾಯಿತು, ಯಾರು ಏನು ಮಾಡುತ್ತಾರೆ, ಯಾವಾಗ."
    ]},
  ],
  sales: [
    { title: "Sell More Today", titleHi: "आज ज्यादा बेचें", titleKn: "ಇಂದು ಹೆಚ್ಚು ಮಾರಿ", icon: "🛒", actions: [
      "Map your sales flow: how many people know about you → how many talk to you → how many buy? Find where you lose people.",
      "Write down the top 5 reasons people say 'no' and think of a good answer for each one.",
      "Set a daily target (5 calls, 10 messages) and track how many turn into sales this week."
    ], actionsHi: [
      "अपना sales flow map करें: कितने लोग आपको जानते हैं → कितने बात करते हैं → कितने खरीदते हैं? कहां लोग छूट रहे हैं।",
      "Top 5 reasons लिखें जब लोग 'ना' बोलते हैं और हर एक का अच्छा जवाब सोचें।",
      "Daily target set करें (5 calls, 10 messages) और track करें कि इस हफ्ते कितने sales में बदले।"
    ], actionsKn: [
      "ನಿಮ್ಮ ಮಾರಾಟ ಹರಿವು ನಕ್ಷೆ ಮಾಡಿ: ಎಷ್ಟು ಜನ ನಿಮ್ಮ ಬಗ್ಗೆ ತಿಳಿದಿದ್ದಾರೆ → ಎಷ್ಟು ಮಾತಾಡುತ್ತಾರೆ → ಎಷ್ಟು ಖರೀದಿಸುತ್ತಾರೆ? ಎಲ್ಲಿ ಜನ ಕಳೆದುಹೋಗುತ್ತಾರೆ ಹುಡುಕಿ.",
      "ಜನರು 'ಇಲ್ಲ' ಎನ್ನುವ ಟಾಪ್ 5 ಕಾರಣಗಳನ್ನು ಬರೆಯಿರಿ ಮತ್ತು ಪ್ರತಿಯೊಂದಕ್ಕೂ ಉತ್ತಮ ಉತ್ತರ ಯೋಚಿಸಿ.",
      "ದೈನಂದಿನ ಗುರಿ ಹೊಂದಿಸಿ (5 ಕರೆಗಳು, 10 ಸಂದೇಶಗಳು) ಮತ್ತು ಈ ವಾರ ಎಷ್ಟು ಮಾರಾಟವಾಗುತ್ತವೆ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ."
    ]},
  ],
  product: [
    { title: "Make Your Product Better", titleHi: "अपने प्रोडक्ट को बेहतर बनाएं", titleKn: "ನಿಮ್ಮ ಉತ್ಪನ್ನವನ್ನು ಉತ್ತಮಗೊಳಿಸಿ", icon: "🔧", actions: [
      "Ask 5 users: 'Would you be sad if this product disappeared?' If 40%+ say yes, you're on the right track.",
      "Find the top 3 things customers are asking for — which one would make them stay longer or pay more?",
      "Make one small improvement today — even a tiny fix. Quick changes show customers you care."
    ], actionsHi: [
      "5 users से पूछें: 'अगर ये product गायब हो जाए तो दुख होगा?' अगर 40%+ 'हां' बोलें, तो आप सही रास्ते पर हैं।",
      "Top 3 चीज़ें ढूंढें जो customers मांग रहे हैं — कौन सी बनाने से वो ज्यादा रुकेंगे या ज्यादा pay करेंगे?",
      "आज एक छोटा improvement करें — छोटा fix भी चलेगा। Quick changes customers को दिखाते हैं कि आपको फ़र्क पड़ता है।"
    ], actionsKn: [
      "5 ಬಳಕೆದಾರರಿಗೆ ಕೇಳಿ: 'ಈ ಉತ್ಪನ್ನ ಮಾಯವಾದರೆ ನಿಮಗೆ ದುಃಖವಾಗುತ್ತದೆಯೇ?' 40%+ 'ಹೌದು' ಎಂದರೆ, ನೀವು ಸರಿಯಾದ ದಾರಿಯಲ್ಲಿದ್ದೀರಿ.",
      "ಗ್ರಾಹಕರು ಕೇಳುತ್ತಿರುವ ಟಾಪ್ 3 ವಿಷಯ ಹುಡುಕಿ — ಯಾವುದು ಅವರನ್ನು ಹೆಚ್ಚು ಕಾಲ ಉಳಿಸುತ್ತದೆ ಅಥವಾ ಹೆಚ್ಚು ಪಾವತಿಸಲು ಪ್ರೇರೇಪಿಸುತ್ತದೆ?",
      "ಇಂದು ಒಂದು ಸಣ್ಣ ಸುಧಾರಣೆ ಮಾಡಿ — ಸಣ್ಣ ಫಿಕ್ಸ್ ಸಹ ಸರಿ. ತ್ವರಿತ ಬದಲಾವಣೆಗಳು ಗ್ರಾಹಕರಿಗೆ ನೀವು ಕಾಳಜಿ ವಹಿಸುತ್ತೀರಿ ಎಂದು ತೋರಿಸುತ್ತವೆ."
    ]},
  ],
  marketing: [
    { title: "Tell People About Your Work", titleHi: "लोगों को अपने काम के बारे में बताएं", titleKn: "ನಿಮ್ಮ ಕೆಲಸದ ಬಗ್ಗೆ ಜನರಿಗೆ ಹೇಳಿ", icon: "📢", actions: [
      "Pick ONE topic you want to be known for. Every post, message, and ad should connect to it.",
      "Make a 7-day content plan with one specific topic per day — showing up regularly matters more than being perfect.",
      "Take your best-performing post ever and make a follow-up — double down on what already works."
    ], actionsHi: [
      "ONE topic चुनें जिसके लिए आप जाने जाना चाहते हैं। हर post, message, और ad उससे connect होनी चाहिए।",
      "7-day content plan बनाएं — हर दिन एक specific topic। regularly दिखना, perfect होने से ज्यादा ज़रूरी है।",
      "अपनी best performing post लें और उसका follow-up बनाएं — जो already काम कर रहा है, उस पर double down करें।"
    ], actionsKn: [
      "ನೀವು ಯಾವುದಕ್ಕೆ ಹೆಸರಾಗಬೇಕು ಎಂದು ಒಂದು ವಿಷಯ ಆರಿಸಿ. ಪ್ರತಿ ಪೋಸ್ಟ್, ಸಂದೇಶ, ಮತ್ತು ಜಾಹೀರಾತು ಅದಕ್ಕೆ ಸಂಬಂಧಿಸಿರಬೇಕು.",
      "7 ದಿನಗಳ ವಿಷಯ ಯೋಜನೆ ಮಾಡಿ — ಪ್ರತಿ ದಿನ ಒಂದು ನಿರ್ದಿಷ್ಟ ವಿಷಯ. ನಿಯಮಿತವಾಗಿ ಕಾಣಿಸಿಕೊಳ್ಳುವುದು ಪರಿಪೂರ್ಣವಾಗಿರುವುದಕ್ಕಿಂತ ಮುಖ್ಯ.",
      "ನಿಮ್ಮ ಅತ್ಯುತ್ತಮ ಪ್ರದರ್ಶನದ ಪೋಸ್ಟ್ ತೆಗೆದುಕೊಂಡು ಅದರ ಮುಂದುವರಿಕೆ ಮಾಡಿ — ಈಗಾಗಲೇ ಕೆಲಸ ಮಾಡುತ್ತಿರುವುದರ ಮೇಲೆ ಹೆಚ್ಚು ಕೇಂದ್ರೀಕರಿಸಿ."
    ]},
  ],
};

function detectContext(activity) {
  const lower = activity.toLowerCase();
  const contexts = [];
  if (/\b(meet|meeting|call|zoom|discussion|sync|standup)\b/.test(lower)) contexts.push("meeting");
  if (/\b(sell|sales|deal|client|prospect|lead|pitch|clos|revenue|invoice|payment|order|customer)\b/.test(lower)) contexts.push("sales");
  if (/\b(product|feature|build|ship|launch|release|bug|code|develop|design|prototype|app)\b/.test(lower)) contexts.push("product");
  if (/\b(market|content|post|social|ad|campaign|brand|audience|seo|traffic|engagement|video|reel)\b/.test(lower)) contexts.push("marketing");
  return contexts;
}

function getLocalizedAction(step, language, actionIndex) {
  const langKey = `actions${getLangSuffix(language)}`;
  const localizedActions = step[langKey];
  if (localizedActions && localizedActions[actionIndex]) {
    return localizedActions[actionIndex];
  }
  return step.actions[actionIndex];
}

function getLocalizedTitle(step, language) {
  const key = `title${getLangSuffix(language)}`;
  return step[key] || step.title;
}

function getLangSuffix(language) {
  const map = {
    "Hindi": "Hi",
    "Kannada": "Kn",
    // For languages without translations, fall back to English
  };
  return map[language] || "";
}

function pickSteps(activity, day, previousOutput, language) {
  const contexts = detectContext(activity);
  const pool = [...STEP_BANK.general];
  for (const ctx of contexts) {
    if (STEP_BANK[ctx]) pool.push(...STEP_BANK[ctx]);
  }

  // Avoid repeating previous titles
  const prevTitles = new Set((previousOutput?.steps || []).map(s => s.title));

  // Shuffle pool deterministically based on day + activity
  const seed = day + activity.length;
  const shuffled = pool
    .filter(s => !prevTitles.has(s.title) && !prevTitles.has(getLocalizedTitle(s, language)))
    .sort((a, b) => {
      const ha = hashCode(a.title + seed) % 1000;
      const hb = hashCode(b.title + seed) % 1000;
      return ha - hb;
    });

  // Prioritize context-specific steps
  const contextTitles = new Set();
  for (const ctx of contexts) {
    if (STEP_BANK[ctx]) STEP_BANK[ctx].forEach(s => contextTitles.add(s.title));
  }

  const contextual = shuffled.filter(s => contextTitles.has(s.title));
  const general = shuffled.filter(s => !contextTitles.has(s.title));
  const ordered = [...contextual, ...general];

  const selected = ordered.slice(0, 6);

  return selected.map((s, i) => {
    const actionIdx = (day + i + activity.length) % s.actions.length;
    return {
      number: i + 1,
      title: getLocalizedTitle(s, language),
      action: getLocalizedAction(s, language, actionIdx),
      icon: s.icon || "📌",
    };
  });
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

const HEADLINES = {
  English: [
    "Sharpen Your Edge — Build a Stronger Business",
    "From Hustle to Smart Work — Better Every Day",
    "Growth Mode — Stack Small Wins Into Big Results",
    "Do Less, Impact More — Focus on What Matters",
    "Keep the Momentum — Every Action Adds Up",
    "Level Up — Think Bigger, Act Smarter",
    "Money First — Make Every Hour Count",
    "Break Through — New Strategy, New Results",
    "Build Systems — Make Success Repeatable",
    "Ship It — Try, Learn, Improve, Repeat",
    "Customer Focus — Give Them What They Need",
    "Cut the Noise — Focus on Real Growth",
    "Work Smarter — Find Hidden Opportunities",
    "Be Proactive — Don't Wait, Create",
    "Build Your Advantage — One Day at a Time",
  ],
  Hindi: [
    "अपनी ताकत बढ़ाएं — एक मज़बूत बिज़नेस बनाएं",
    "मेहनत से स्मार्ट वर्क तक — हर दिन बेहतर",
    "Growth Mode — छोटी जीत को बड़े नतीजों में बदलें",
    "कम करो, ज़्यादा असर — जो ज़रूरी है उस पर ध्यान दो",
    "रफ़्तार बनाए रखें — हर कदम जुड़ता है",
    "अगले Level पर — बड़ा सोचो, Smart करो",
    "पैसा पहले — हर घंटे को Count करें",
    "सीमा तोड़ो — नई Strategy, नए Results",
    "System बनाओ — सफलता को Repeatable बनाओ",
    "करके दिखाओ — Try करो, सीखो, सुधारो, Repeat करो",
    "Customer पर ध्यान — उन्हें वो दो जो चाहिए",
    "शोर हटाओ — असली Growth पर Focus करो",
    "Smart काम करो — छुपे मौके ढूंढो",
    "Proactive बनो — इंतज़ार मत करो, Create करो",
    "अपना फ़ायदा बनाओ — एक दिन में एक कदम",
  ],
  Kannada: [
    "ನಿಮ್ಮ ಶಕ್ತಿ ಹೆಚ್ಚಿಸಿ — ಬಲವಾದ ವ್ಯಾಪಾರ ನಿರ್ಮಿಸಿ",
    "ಶ್ರಮದಿಂದ ಸ್ಮಾರ್ಟ್ ಕೆಲಸಕ್ಕೆ — ಪ್ರತಿದಿನ ಉತ್ತಮ",
    "ಬೆಳವಣಿಗೆ ಮೋಡ್ — ಸಣ್ಣ ಗೆಲುವುಗಳನ್ನು ದೊಡ್ಡ ಫಲಿತಾಂಶಗಳಾಗಿ ಪರಿವರ್ತಿಸಿ",
    "ಕಡಿಮೆ ಮಾಡಿ, ಹೆಚ್ಚು ಪ್ರಭಾವ — ಮುಖ್ಯವಾದುದರ ಮೇಲೆ ಗಮನ ಕೇಂದ್ರೀಕರಿಸಿ",
    "ಚಲನೆ ಉಳಿಸಿ — ಪ್ರತಿ ಕ್ರಿಯೆ ಸೇರ್ಪಡೆಯಾಗುತ್ತದೆ",
    "ಮಟ್ಟ ಏರಿಸಿ — ದೊಡ್ಡದಾಗಿ ಯೋಚಿಸಿ, ಉತ್ತಮವಾಗಿ ಕೆಲಸ ಮಾಡಿ",
    "ಹಣ ಮೊದಲು — ಪ್ರತಿ ಗಂಟೆ ಲೆಕ್ಕ ಮಾಡಿ",
    "ಮಿತಿ ಮುರಿ — ಹೊಸ ತಂತ್ರ, ಹೊಸ ಫಲಿತಾಂಶ",
    "ವ್ಯವಸ್ಥೆ ನಿರ್ಮಿಸಿ — ಯಶಸ್ಸನ್ನು ಪುನರಾವರ್ತಿಸಬಹುದಾಗಿ ಮಾಡಿ",
    "ಮಾಡಿ ತೋರಿಸಿ — ಪ್ರಯತ್ನಿಸಿ, ಕಲಿಯಿರಿ, ಸುಧಾರಿಸಿ, ಪುನರಾವರ್ತಿಸಿ",
    "ಗ್ರಾಹಕ ಗಮನ — ಅವರಿಗೆ ಬೇಕಾದುದನ್ನು ಕೊಡಿ",
    "ಶಬ್ದ ಕಡಿಮೆ ಮಾಡಿ — ನಿಜವಾದ ಬೆಳವಣಿಗೆ ಮೇಲೆ ಗಮನ",
    "ಸ್ಮಾರ್ಟ್ ಆಗಿ ಕೆಲಸ ಮಾಡಿ — ಅಡಗಿರುವ ಅವಕಾಶ ಹುಡುಕಿ",
    "ಮುಂದಾಗಿ — ಕಾಯಬೇಡಿ, ಸೃಷ್ಟಿಸಿ",
    "ನಿಮ್ಮ ಪ್ರಯೋಜನ ನಿರ್ಮಿಸಿ — ಒಂದು ಸಮಯಕ್ಕೆ ಒಂದು ದಿನ",
  ],
};

const EVOLUTION_NOTES = {
  English: {
    day1: "Day 1 — your starting point. We've mapped out your first business moves.",
    evolving: (prevDay) => `Building on Day ${prevDay} — stepping up from doing to improving.`,
  },
  Hindi: {
    day1: "दिन 1 — आपका शुरुआती बिंदु। हमने आपके पहले business moves map कर दिए हैं।",
    evolving: (prevDay) => `दिन ${prevDay} पर बिल्डिंग — करने से सुधारने की तरफ बढ़ रहे हैं।`,
  },
  Kannada: {
    day1: "ದಿನ 1 — ನಿಮ್ಮ ಆರಂಭ ಬಿಂದು. ನಿಮ್ಮ ಮೊದಲ ವ್ಯಾಪಾರ ನಡೆಗಳನ್ನು ನಕ್ಷೆ ಮಾಡಿದ್ದೇವೆ.",
    evolving: (prevDay) => `ದಿನ ${prevDay} ಮೇಲೆ ನಿರ್ಮಿಸುತ್ತಿದ್ದೇವೆ — ಮಾಡುವುದರಿಂದ ಸುಧಾರಿಸುವ ಕಡೆಗೆ.`,
  },
};

const FOCUS_OPTIONS = {
  English: [
    "Tomorrow, check the results of today's actions — what moved the needle?",
    "Next up: create a simple system for what worked best today.",
    "Tomorrow, turn one of today's wins into a process others can copy.",
    "Next step: find one thing that slowed you down today and fix it before starting.",
    "Tomorrow: deepen one customer relationship that showed promise today.",
    "Next: look at today's steps and do more of the one that felt most useful.",
  ],
  Hindi: [
    "कल, आज के actions के results check करें — किसने सबसे ज़्यादा फ़र्क डाला?",
    "अगला कदम: आज जो सबसे अच्छा काम किया, उसका एक simple system बनाएं।",
    "कल, आज की एक जीत को ऐसी process में बदलें जो दूसरे भी follow कर सकें।",
    "अगला कदम: आज जो चीज़ slow करती रही उसे ढूंढें और शुरू करने से पहले fix करें।",
    "कल: एक customer relationship को deepen करें जिसमें आज potential दिखा।",
    "अगला: आज के steps देखें और जो सबसे useful लगा उसे ज्यादा करें।",
  ],
  Kannada: [
    "ನಾಳೆ, ಇಂದಿನ ಕ್ರಿಯೆಗಳ ಫಲಿತಾಂಶ ಪರಿಶೀಲಿಸಿ — ಯಾವುದು ಅತ್ಯಧಿಕ ವ್ಯತ್ಯಾಸ ಮಾಡಿತು?",
    "ಮುಂದಿನ ಹಂತ: ಇಂದು ಅತ್ಯುತ್ತಮವಾಗಿ ಕೆಲಸ ಮಾಡಿದ್ದಕ್ಕೆ ಸರಳ ವ್ಯವಸ್ಥೆ ರಚಿಸಿ.",
    "ನಾಳೆ, ಇಂದಿನ ಒಂದು ಗೆಲುವನ್ನು ಇತರರು ಅನುಸರಿಸಬಹುದಾದ ಪ್ರಕ್ರಿಯೆಗೆ ಪರಿವರ್ತಿಸಿ.",
    "ಮುಂದಿನ ಹಂತ: ಇಂದು ನಿಧಾನಗೊಳಿಸಿದ ಒಂದು ವಿಷಯ ಹುಡುಕಿ ಮತ್ತು ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು ಸರಿಪಡಿಸಿ.",
    "ನಾಳೆ: ಇಂದು ಭರವಸೆ ತೋರಿಸಿದ ಒಂದು ಗ್ರಾಹಕ ಸಂಬಂಧವನ್ನು ಆಳಗೊಳಿಸಿ.",
    "ಮುಂದೆ: ಇಂದಿನ ಹಂತಗಳನ್ನು ನೋಡಿ ಮತ್ತು ಅತ್ಯಂತ ಉಪಯುಕ್ತ ಅನಿಸಿದ್ದನ್ನು ಹೆಚ್ಚು ಮಾಡಿ.",
  ],
};

const DAY_LABEL = {
  English: "Day",
  Hindi: "दिन",
  Kannada: "ದಿನ",
  Tamil: "நாள்",
  Telugu: "రోజు",
  Malayalam: "ദിവസം",
  Marathi: "दिवस",
  Bengali: "দিন",
  Gujarati: "દિવસ",
  Punjabi: "ਦਿਨ",
};

function generateOfflineResponse(activity, day, previousOutput, language) {
  const lang = (HEADLINES[language]) ? language : "English";
  const steps = pickSteps(activity, day, previousOutput, language);
  const headline = HEADLINES[lang][(day + activity.length) % HEADLINES[lang].length];

  const isFirstDay = day === 1 || !previousOutput;

  const evoNotes = EVOLUTION_NOTES[lang] || EVOLUTION_NOTES.English;
  const evolutionNote = isFirstDay
    ? evoNotes.day1
    : evoNotes.evolving(day - 1);

  const focusOpts = FOCUS_OPTIONS[lang] || FOCUS_OPTIONS.English;
  const tomorrowFocus = focusOpts[(day + activity.length) % focusOpts.length];

  const dayWord = DAY_LABEL[language] || DAY_LABEL.English;

  return {
    dayLabel: `${dayWord} ${day}`,
    headline,
    steps,
    evolutionNote,
    tomorrowFocus,
  };
}

// ─── Anthropic API Prompt (used when API key is available) ───────────────────

const SYSTEM_PROMPT = `You are Voice2Venture — a friendly Business Growth Coach AI. You help small business owners in India grow their business step by step.

RULES:
1. Never repeat previous advice or steps.
2. Each response must BUILD upon and IMPROVE the previous output (if provided).
3. Track the day number and make advice more strategic as days progress (Day 1-5: basics, Day 6-15: intermediate, Day 15+: advanced).
4. Be specific, actionable, and use simple, easy-to-understand language.
5. Avoid fancy business jargon — write like you're talking to a shop owner or a first-time entrepreneur.
6. All currency references must use ₹ (INR).
7. CRITICAL: Your ENTIRE response must be in the user's requested language. All text — titles, actions, headlines, notes — ALL in the specified language.

OUTPUT FORMAT (strict JSON, no extra text):
{
  "dayLabel": "Day X (or translated equivalent)",
  "headline": "One simple sentence about today's focus",
  "steps": [
    { "number": 1, "title": "Simple Step Title", "action": "Easy-to-follow action to take", "icon": "relevant emoji" },
    { "number": 2, "title": "Simple Step Title", "action": "Easy-to-follow action to take", "icon": "relevant emoji" },
    { "number": 3, "title": "Simple Step Title", "action": "Easy-to-follow action to take", "icon": "relevant emoji" },
    { "number": 4, "title": "Simple Step Title", "action": "Easy-to-follow action to take", "icon": "relevant emoji" },
    { "number": 5, "title": "Simple Step Title", "action": "Easy-to-follow action to take", "icon": "relevant emoji" },
    { "number": 6, "title": "Simple Step Title", "action": "Easy-to-follow action to take", "icon": "relevant emoji" }
  ],
  "evolutionNote": "One sentence about how this improves from last time",
  "tomorrowFocus": "One sentence about what to focus on tomorrow"
}`;

// ─── Generate Endpoint ──────────────────────────────────────────────────────

app.post("/generate", async (req, res) => {
  const { activity, language, day, previousOutput } = req.body;

  if (!activity) {
    return res.status(400).json({ error: "Please describe your daily activity." });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // ── If API key is available, use Claude ──
  if (apiKey) {
    const userMessage = `
Day: ${day || 1}
Language: ${language || "English"}
Today's Activity: ${activity}
Currency: INR (₹)
${previousOutput ? `\nPrevious Day's Output (improve from this, do NOT repeat):\n${JSON.stringify(previousOutput, null, 2)}` : "\n(No previous output — this is Day 1)"}

Generate the 6-step business growth plan as JSON. 
IMPORTANT: 
- The ENTIRE output must be in ${language || "English"}.
- Use ₹ (INR) for all money references.
- Use simple, easy language — no complex business terms.
- Do NOT repeat any advice from the previous output.
- Each step should have a relevant emoji icon.
    `.trim();

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userMessage }],
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        console.error("Anthropic API error:", err);
        console.log("⚡ Falling back to offline coaching engine...");
      } else {
        const data = await response.json();
        const rawText = data.content?.[0]?.text || "";
        const clean = rawText.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(clean);
        return res.json(parsed);
      }
    } catch (err) {
      console.error("API call failed, using offline engine:", err.message);
    }
  }

  // ── Offline Coaching Engine (always works) ──
  console.log(`⚡ Generating offline plan for Day ${day || 1} in ${language || "English"}...`);

  // Add a small delay to feel natural
  await new Promise(r => setTimeout(r, 600 + Math.random() * 600));

  const result = generateOfflineResponse(activity, day || 1, previousOutput, language || "English");
  return res.json(result);
});

// ─── Chat / Follow-up Endpoint ──────────────────────────────────────────────

const CHAT_SYSTEM_PROMPT = `You are Voice2Venture — a friendly, helpful business coach AI for small business owners in India.

The user has just received a daily business growth plan (provided below). They are now asking a follow-up question about it.

RULES:
1. Answer in the SAME language the user is speaking in.
2. Be specific and practical — reference the plan steps by name when relevant.
3. Use simple language, no complex business jargon.
4. Keep answers concise but helpful (2-4 paragraphs max).
5. Use ₹ (INR) for any money references.
6. Be encouraging and supportive — they are building their business.
7. If the question is unrelated to business, gently steer back to their growth plan.`;

// Offline follow-up answers keyed by topic
const OFFLINE_FOLLOWUPS = {
  English: {
    step: (stepTitle) => `Great question about "${stepTitle}"! Here's how to get started: break it down into 3 small tasks you can do in the next hour. The first step is always the hardest — just start with something tiny. Even spending 15 minutes on this today will put you ahead of where you were yesterday.`,
    money: `When it comes to money, start small. Track every ₹10 that comes in and goes out for one week. You'll be surprised what you find. Most small businesses leak money on things they don't even notice — subscriptions they forgot, materials they overbuy, or time they waste on low-value tasks. Find one leak and plug it this week.`,
    customer: `Your customers are your best teachers. Talk to at least 3 this week and ask them: "What's the one thing we could do better?" Don't defend yourself — just listen and take notes. The patterns you find will tell you exactly where to focus your energy.`,
    time: `Time management for business owners is tough because everything feels urgent. Try this: every morning, write down the ONE thing that will make the biggest difference today. Do that first, before checking messages or social media. Protect your first 90 minutes like your life depends on it.`,
    marketing: `Marketing doesn't have to be expensive. Start by sharing your real story — what you're building, what challenges you face, what you've learned. People connect with honesty, not perfection. Post one thing every day for a week and see what gets the most response.`,
    general: `That's a great question! Looking at your plan, I'd suggest focusing on the steps that are closest to bringing in money or keeping customers happy. Everything else can wait. The biggest mistake new business owners make is trying to do everything at once — pick 2 things from your plan and nail those first.`,
  },
  Hindi: {
    step: (stepTitle) => `"${stepTitle}" के बारे में अच्छा सवाल! शुरू करने का तरीका: इसे 3 छोटे कामों में तोड़ें जो आप अगले एक घंटे में कर सकते हैं। पहला कदम हमेशा सबसे मुश्किल होता है — बस कुछ छोटा सा शुरू करें। आज इस पर 15 मिनट भी लगाने से आप कल से आगे होंगे।`,
    money: `पैसों की बात करें तो छोटे से शुरू करें। एक हफ्ते तक हर ₹10 को track करें जो आता और जाता है। आप हैरान होंगे कि क्या मिलता है। ज्यादातर छोटे businesses ऐसी चीज़ों पर पैसा बर्बाद करते हैं जो उन्हें पता भी नहीं होता।`,
    customer: `आपके ग्राहक आपके सबसे अच्छे गुरु हैं। इस हफ्ते कम से कम 3 से बात करें और पूछें: "हम क्या बेहतर कर सकते हैं?" बचाव मत करें — बस सुनें और नोट्स लें।`,
    general: `बहुत अच्छा सवाल! आपके plan को देखें तो, मैं suggest करूंगा कि उन steps पर focus करें जो पैसा लाने या customers को खुश रखने के सबसे करीब हैं। बाकी सब इंतज़ार कर सकता है।`,
  },
  Kannada: {
    step: (stepTitle) => `"${stepTitle}" ಬಗ್ಗೆ ಒಳ್ಳೆಯ ಪ್ರಶ್ನೆ! ಪ್ರಾರಂಭಿಸಲು: ಇದನ್ನು ಮುಂದಿನ ಒಂದು ಗಂಟೆಯಲ್ಲಿ ಮಾಡಬಹುದಾದ 3 ಸಣ್ಣ ಕೆಲಸಗಳಾಗಿ ವಿಭಜಿಸಿ. ಮೊದಲ ಹೆಜ್ಜೆ ಯಾವಾಗಲೂ ಕಷ್ಟ — ಸಣ್ಣದರಿಂದ ಪ್ರಾರಂಭಿಸಿ.`,
    general: `ಒಳ್ಳೆಯ ಪ್ರಶ್ನೆ! ನಿಮ್ಮ ಯೋಜನೆ ನೋಡಿ, ಹಣ ತರುವ ಅಥವಾ ಗ್ರಾಹಕರನ್ನು ಸಂತೋಷವಾಗಿಡುವ ಹಂತಗಳ ಮೇಲೆ ಗಮನ ಕೇಂದ್ರೀಕರಿಸಿ ಎಂದು ಸಲಹೆ ನೀಡುತ್ತೇನೆ.`,
  },
};

function generateOfflineChat(question, plan, language) {
  const q = question.toLowerCase();
  const lang = OFFLINE_FOLLOWUPS[language] ? language : "English";
  const answers = OFFLINE_FOLLOWUPS[lang];

  // Check if asking about a specific step
  const steps = plan?.steps || [];
  for (const step of steps) {
    const titleLower = (step.title || "").toLowerCase();
    if (titleLower && q.includes(titleLower.split(" ")[0])) {
      return (answers.step || OFFLINE_FOLLOWUPS.English.step)(step.title);
    }
  }

  // Check for step number references
  const stepMatch = q.match(/step\s*(\d)/i) || q.match(/(\d)\s*(st|nd|rd|th)/i);
  if (stepMatch) {
    const idx = parseInt(stepMatch[1]) - 1;
    if (steps[idx]) {
      return (answers.step || OFFLINE_FOLLOWUPS.English.step)(steps[idx].title);
    }
  }

  // Topic detection
  if (/money|earn|income|revenue|profit|₹|rupee|paisa|kamai|hisab/i.test(q)) {
    return answers.money || OFFLINE_FOLLOWUPS.English.money;
  }
  if (/customer|client|buyer|log|grahak|khariddar/i.test(q)) {
    return answers.customer || OFFLINE_FOLLOWUPS.English.customer;
  }
  if (/time|manage|schedule|waqt|samay/i.test(q)) {
    return answers.time || OFFLINE_FOLLOWUPS.English.time;
  }
  if (/market|promote|advertise|social|brand|post/i.test(q)) {
    return answers.marketing || OFFLINE_FOLLOWUPS.English.marketing;
  }

  return answers.general || OFFLINE_FOLLOWUPS.English.general;
}

app.post("/chat", async (req, res) => {
  const { question, language, plan, history } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Please ask a question." });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // ── Claude AI mode ──
  if (apiKey) {
    const planSummary = JSON.stringify(plan, null, 2);
    const messages = [];

    // Add history
    if (history && history.length) {
      for (const msg of history) {
        messages.push({ role: msg.role, content: msg.content });
      }
    }

    // Add current question
    messages.push({
      role: "user",
      content: `[Current Plan]\n${planSummary}\n\n[Language: ${language || "English"}]\n\n[User's Question]\n${question}\n\nAnswer the question helpfully in ${language || "English"}. Be specific, practical, and reference the plan steps when relevant. Use ₹ (INR) for money.`
    });

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          system: CHAT_SYSTEM_PROMPT,
          messages,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const answer = data.content?.[0]?.text || "";
        return res.json({ answer });
      } else {
        console.error("Chat API error, falling back to offline...");
      }
    } catch (err) {
      console.error("Chat API failed:", err.message);
    }
  }

  // ── Offline mode ──
  await new Promise(r => setTimeout(r, 400 + Math.random() * 400));
  const answer = generateOfflineChat(question, plan, language || "English");
  return res.json({ answer });
});

// ─── Start Server ───────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  const hasKey = !!process.env.ANTHROPIC_API_KEY;
  console.log(`✅ Voice2Venture running at http://localhost:${PORT}`);
  console.log(`   Mode: ${hasKey ? "☁️  Claude AI (online)" : "⚡ Built-in Coaching Engine (offline)"}`);
  if (!hasKey) {
    console.log(`   Add ANTHROPIC_API_KEY to .env for AI-powered responses.\n`);
  }
});
