# AI Resume Assistant & ATS Analyzer

A modern, full-stack AI-powered web application that analyzes resumes, evaluates ATS compatibility, detects skill gaps, and generates improved PDF resumes tailored to specific job roles.

---

## Key Features

- **Upload & Parse PDF Resumes**: Instant client-side text extraction using `pdf.js`.
- **AI Resume & ATS Scoring**: Overall resume score (out of 100), ATS simulation, and keyword match breakdown.
- **Job Role Matching & Skill Gap Analysis**: Compares extracted resume skills against target job requirements and generates a learning roadmap.
- **Strengths, Weaknesses & Recommendations**: Detailed analysis highlighting strong points, areas for improvement, and actionable tips.
- **AI Resume Rewriter**: Generates an optimized version of the resume with stronger action verbs and quantifiable results.
- **Custom PDF Export**: Download rewritten resumes with customizable visual themes (Modern Teal, Executive Navy, Classic Black).
- **Dual Resume Comparison**: Compare two resumes side-by-side to evaluate match quality for a target job role.
- **AI Interview Preparation**: Generates role-specific technical & behavioral interview questions with sample answers.
- **Analysis History**: Persists past analyses locally for easy access and quick restoration.

---

## Tech Stack

### Frontend & Core
- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Glassmorphism, Shadcn UI / Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React

### File Handling & Exports
- **PDF Extraction**: `pdfjs-dist` (Client-side PDF text extraction)
- **PDF Generation**: `jsPDF`

### Backend & AI Services
- **Backend / Edge**: Supabase Edge Functions (Deno runtime)
- **AI Gateway**: Gemini 3 Flash model (via Lovable AI Gateway) + Local AI Fallback Engine

---

## Project Structure

```text
resume-ai-assistant/
├── public/                 # Static assets
├── src/
│   ├── components/         # UI components & analysis panels
│   │   ├── FileUpload.tsx
│   │   ├── FormattingChecker.tsx
│   │   ├── HistorySidebar.tsx
│   │   ├── ImprovedResume.tsx
│   │   ├── InterviewPrep.tsx
│   │   ├── JobRoleInput.tsx
│   │   ├── Navbar.tsx
│   │   ├── ResultsPanel.tsx
│   │   ├── ResumeComparison.tsx
│   │   ├── ScoreCircle.tsx
│   │   └── SkillGapAnalysis.tsx
│   ├── hooks/              # Custom hooks (useResumeAnalysis, use-toast)
│   ├── lib/                # Utility modules & mock AI fallback engine
│   │   ├── mockAnalyzer.ts
│   │   ├── pdfParser.ts
│   │   └── utils.ts
│   ├── pages/              # Page routes (Index.tsx, Compare.tsx, NotFound.tsx)
│   ├── App.tsx             # Main App layout & routing
│   └── main.tsx            # Application entry point
├── supabase/
│   └── functions/          # Edge function for AI analysis
│       └── analyze-resume/
├── package.json
├── tailwind.config.ts
└── vite.config.ts
