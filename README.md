# Manus Video - AI Studio

**Comprehensive video analysis and generation system using Google's native AI tools (Gemini API, Vertex AI, Google Cloud)**

Built for maximum effectiveness in video scanning, timestamp analysis, reconstruction, recommendations, and detailed player analysis.

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/milosriki/manusvideo.git
cd manusvideo

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env and add your Gemini API key

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ✨ Features

- **Gemini 2.5 Pro Video Analysis**: Scene detection, timestamps, emotions, objects, transcription
- **PTD Fitness Optimization**: Hook analysis, conversion scoring, V-Shred/WarriorBabe frameworks
- **Video Generation (Veo 3.1)**: Text-to-video with custom styles and durations
- **Pre-Made Templates**: Dubai Men 40+ Executive Edge template included

---

## 📖 Documentation

- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)**: Complete technical guide
- **[Gemini API Docs](https://ai.google.dev/gemini-api/docs)**: Official API documentation

---

## 🛠️ Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- Google Gemini API
- Vertex AI (coming soon)

---

## 📊 Usage Example

\`\`\`typescript
import { GeminiVideoAnalyzer } from './services/geminiService';

const analyzer = new GeminiVideoAnalyzer('your-api-key');
const analysis = await analyzer.analyzeVideo(videoFile, {
  ptdFitnessOptimized: true,
});

console.log(analysis.recommendations);
\`\`\`

---

**Built for maximum video analysis effectiveness** 🎯
