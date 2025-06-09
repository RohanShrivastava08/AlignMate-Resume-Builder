# 🧠 AlignMate Resume Builder – AI-Powered ATS Resume Crafter

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/f5264748-7b71-4c71-9785-e558dbaca78b" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/c2ae5fbc-57bf-4f19-b4f1-74ae1a7b73be" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/9ce7a0cd-981e-4d8e-be34-2bcc520619eb" />


- An intelligent, AI-assisted resume builder built for Indian job seekers and global professionals alike.

- Create, optimize, and tailor job-winning, ATS-friendly resumes with real-time previews and Genkit AI workflows.

- Built using Firebase Studio, Next.js (App Router), React, TypeScript, Tailwind CSS, ShadCN UI, and integrated with Genkit (Google Gemini).


## 📋 Table of Contents
- Introduction
- Features
- Project Implementation Process
- File Structure
- Technology Stack
- Installation
- Usage
- Screenshots
- Contributing
- License
- Contact

## 📘 Introduction

- AlignMate is a futuristic resume-building platform that empowers users to generate powerful, tailored, and optimized resumes for any job role.
- Whether you're a fresher or a seasoned professional, AlignMate brings AI into your job hunt—crafting ATS-compatible, professional resumes effortlessly.


## ✨ Features

    🧠 AI Resume Generation
→ Automatically builds a resume from structured form input using action verbs and quantifiable results.

    🧰 AI Resume Optimization
→ Paste your current resume and let the AI enhance content, formatting, and keyword alignment for better ATS performance.

    🎯 AI Resume Tailoring
→ Upload a job description and let AlignMate customize your resume to match it—skills, keywords, tone, and all.

    📊 ATS Checker + AI Review
→ Get an estimated ATS score, keyword match %, readability analysis, strengths, weaknesses, and improvement tips.

    📝 Structured Resume Form
→ Intuitive form to input personal details, work experience, skills, projects, education, and optional sections like hobbies.

    🖼 Live Preview
→ See your resume update in real-time with every change or AI enhancement.

    ⬇️ Plain Text Export
→ Download as .txt to easily paste into job portals or word processors—ensuring 100% ATS compatibility.

    🌘 Modern UI/UX
→ Responsive design built with Tailwind and ShadCN components. Fully supports Light/Dark mode.

    📢 Landing Page
→ Elegant landing page featuring features, templates, testimonials, and FAQs.

## 🛠 Project Implementation Process

#### 1. Structure & Form UX
- Componentized form sections for Resume inputs (Job Title, Skills, Projects, etc.)
- Responsive and minimal layout using Tailwind + ShadCN UI

#### 2. AI Integration with Genkit
- Google’s Gemini models power Genkit flows for resume generation, tailoring, and review
- Multiple flows structured for reusability and performance

#### 3. Resume Output
- Text-only resumes for ATS accuracy
- Cleanly formatted with bullet points and consistent tone


## 📁 File Structure

```bash
alignmate-resume-builder/
├── src/
│   ├── app/                 # Next.js App Router (pages, layouts, globals)
│   ├── components/
│   │   ├── AlignAiResume/  # Resume builder, layout sections, feature blocks
│   │   └── ui/             # ShadCN components
│   ├── ai/                 # Genkit AI logic (flows, config)
│   ├── lib/                # Utilities and Zod schema validation
│   ├── hooks/              # Custom hooks
├── public/                 # Static assets
├── .env.local              # Environment variables (Google AI Key)
├── next.config.ts          # Next.js config
├── tailwind.config.ts      # Tailwind theme
└── README.md

```

## 💻 Technology Stack

Category	Tech Used

🧠 AI Engine	Genkit (Google Gemini via Google AI Studio)

⚛️ Framework	Next.js (App Router), React

💅 Styling	Tailwind CSS, ShadCN UI, CSS Variables

🔠 Language	TypeScript

✅ Validation	Zod, React Hook Form

🧪 State Management	React Hooks

🧹 Linting/Formatting	ESLint, Prettier

🚀 Deployment	Vercel (recommended)

## 🛠 Installation

Follow these steps to set up and run the Techny project locally:

#### 1. Clone the repository
```bash
git clone https://github.com/YourUsername/alignmate-resume-builder.git
cd alignmate-resume-builder

```

#### 2. Install dependencies

```bash
npm install
# or
yarn install

```

#### 3. Set Up Environment Variables

- Create a .env.local file in the root:

```bash
GOOGLE_API_KEY=your_google_ai_api_key
```

Get your API key at: Google AI Studio

#### 4. Run Genkit (AI server)

```bash
npm run genkit:dev
# or for hot reload
npm run genkit:watch
```

### 5. Run the app

```bash
npm run dev
```
Visit: http://localhost:9002

## 🚀 Usage
- Fill in resume form sections step by step
- Use AI to generate or tailor your resume
- View real-time preview instantly
- Download plain text for ATS-optimized submissions
- Switch between dark and light modes

🤖 AI Capabilities

Feature	AI Flow	Input	Output

Resume Generator	generate-resume.ts	 Form data (GenerateResumeInput)	Clean, ATS-ready plain text resume

Resume Optimizer	optimize-resume.ts	Existing resume text	 Polished and reformatted text

Tailor & ATS	tailor-resume.ts	Resume text + Job  Description	Tailored resume + review breakdown



## 📸 Screenshots

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/f5264748-7b71-4c71-9785-e558dbaca78b" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/c2ae5fbc-57bf-4f19-b4f1-74ae1a7b73be" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/9ce7a0cd-981e-4d8e-be34-2bcc520619eb" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/fd233ed4-d045-439a-bf7f-766effae344a" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/8c901b93-4396-4368-bd30-cccde9c4a4ee" />

<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/5c910e29-4142-4869-aa9f-65152dbe4135" />

## 🤝 Contributing
We welcome community contributions! Follow the steps below to contribute:

#### Fork the repository
- Create a new branch:
```bash
git checkout -b feature/YourFeature
```

- Commit your changes:
```bash
git commit -m 'Add your feature'
```

- Push to the branch:
```bash
git push origin feature/YourFeature
```

- Open a pull request with detailed explanations of your changes.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact
For any questions or suggestions, feel free to reach out:

- Email: rohansh0808@gmail.com
- GitHub: Rohansh0808
