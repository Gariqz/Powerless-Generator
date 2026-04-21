# 💀 POWERLESS.GEN — Official Zenith Protocol

**Developed by Zenith Team**  
A high-authority, industrial-grade vulnerability assessment tool designed for social media creators, streamers, and the "Powerless Collective."

---

## 🚀 Overview
POWERLESS.GEN is an interactive web experience that calculates exactly how "Powerless" a subject is based on their name. It features a minimalist, high-tech aesthetic (Zenith UI) and is optimized for TikTok creators to share results and engage their audience.

### Key Features
- **Official Zenith Certificate**: Generate a high-impact digital verdict.
- **Neural Link Simulation**: Immersive calculation animations (5-step protocol).
- **Persistence Layer**: Names are stored in a local JSON database—same name, same result, every time.
- **TikTok Ready**: One-click "Copy for TikTok" button with pre-formatted hashtags and emojis.
- **Responsive Zenith UI**: Flawless performance across Mobile, Tablet, and Desktop.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 + Framer Motion
- **Icons**: Lucide React
- **Logic**: Server-side Calculation + JSON File Storage (db.json)

---

## 🧠 Core Algorithm
The "Powerless" percentage is deterministic and follows a 4-step logic:
1. **ASCII Mapping**: Every character in the name is converted to its unique numeric code.
2. **Character Sum**: A total sum is calculated for the entire name.
3. **Modulo Operation**: `(Sum % 61) + 40` (Ensures a minimum base vulnerability of 40%).
4. **Match Factor**: 
   - Vowels add **1.2%** weight.
   - Consonants add **0.4%** weight.
   - Total length adds **0.2%** weight.
   - *Final result is capped at 100%.*

---

## 🎨 How to Modify & Customize

### 1. Changing the Mocking Messages
To update what the system says to the user after calculation, edit `components/Calculator.tsx` and find the `getMockingMessage` function:
```typescript
const getMockingMessage = (p: number) => {
  if (p > 90) return "YOUR CUSTOM HIGH-PERCENTAGE ROAST";
  if (p > 75) return "ZENITH TEAM IS DISAPPOINTED.";
  // Add more conditions as needed
};
```

### 2. Modifying the Algorithm
To tweak how the "Powerless" percentage is calculated, edit `lib/calculation.ts`. You can change the base percentage (currently `40`) or the weight of specific characters.

### 3. Updating the Branding
To change "Zenith Team" or the site name, update:
- `app/page.tsx` (Footer and Header)
- `components/Calculator.tsx` (Certificate badges and labels)

### 4. Styling & Colors
All visual elements use Tailwind CSS 4. Modify colors or spacing in:
- `app/globals.css` (Animations and Global Variables)
- `tailwind.config.js` (if applicable) or directly in component class names.

---

## 📦 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production
```bash
npm run build
```

---

## ⚠️ Security & Deployment
- Results are stored in `db.json`. This file is ignored by `.gitignore` by default.
- If deploying to a serverless environment (like Vercel), the file system is read-only. For production use, it is recommended to replace the logic in `lib/db.ts` with a real database like **Supabase**, **MongoDB**, or **Redis**.

---

**© 2026 Zenith Team. Authorized use only.**
