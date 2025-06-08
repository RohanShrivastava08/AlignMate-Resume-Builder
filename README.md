
# AlignMate Resume Builder 🚀

AlignMate is an intelligent resume building application designed to help job seekers, especially freshers and professionals in the Indian job market, craft compelling, ATS-friendly resumes with the power of AI. Built with Next.js, React, ShadCN UI, Tailwind CSS, and Genkit for AI capabilities, AlignMate aims to streamline the resume creation process and empower users to present their best professional selves.

## ✨ Key Features

*   **AI-Powered Resume Generation:**
    *   Generate a complete resume from structured form input.
    *   AI actively rewrites descriptions for impact, uses strong action verbs, and quantifies achievements.
*   **AI Resume Optimization:**
    *   Paste an existing resume and let AI optimize its content and formatting for ATS compatibility and professionalism.
*   **AI Resume Tailoring:**
    *   Tailor your resume specifically to a job description.
    *   AI analyzes the job description, integrates relevant keywords, and highlights matching skills and experiences.
*   **ATS Checker & Resume Review:**
    *   Get an in-depth AI review of your resume against a job description.
    *   Includes an estimated ATS score, keyword match rate, readability assessment, and actionable suggestions for improvement (strengths & weaknesses).
*   **Structured Resume Form:**
    *   Intuitive form-based input for all essential resume sections:
        *   Personal Details
        *   Job Profile/Resume Heading
        *   Skills
        *   Work Experience
        *   Projects
        *   Education
        *   Volunteer Experience (Optional)
        *   Hobbies (Optional)
*   **Live Preview:**
    *   See your resume update in real-time as you fill the form or as AI makes modifications.
*   **Easy Export:**
    *   Download your generated resume as a `.txt` file, ideal for copy-pasting into online applications and ensuring maximum ATS compatibility.
*   **Modern UI/UX:**
    *   Clean, responsive design built with ShadCN UI components and Tailwind CSS.
    *   Includes Dark/Light mode theme toggle.
*   **Landing Page:**
    *   Informative sections detailing features, templates (illustrative), why use AlignMate, user reviews, and FAQs.

## 🛠️ Technology Stack

*   **Frontend:**
    *   Next.js (App Router)
    *   React
    *   TypeScript
*   **UI Components:**
    *   ShadCN UI
*   **Styling:**
    *   Tailwind CSS
    *   CSS Variables for Theming
*   **AI Integration:**
    *   Genkit (with Google AI - Gemini models)
*   **State Management:**
    *   React Hooks (useState, useEffect, useCallback)
    *   React Hook Form (for resume form management)
    *   Zod (for schema validation)
*   **Linting/Formatting:**
    *   ESLint, Prettier (implicitly via Next.js setup)

## ⚙️ Getting Started

### Prerequisites

*   Node.js (version 18.x or higher recommended)
*   npm or yarn

### Setup & Running Locally

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    *   Create a `.env.local` file in the root of your project.
    *   You'll need to add your Google AI API key for Genkit to work:
        ```env
        GOOGLE_API_KEY=YOUR_GOOGLE_AI_API_KEY
        ```
    *   You can obtain a Google AI API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Run the Genkit development server (for AI flows):**
    In a separate terminal, run:
    ```bash
    npm run genkit:dev
    # or for auto-reloading on changes
    npm run genkit:watch
    ```
    This starts the Genkit development server, typically on port 4000, making the AI flows available.

5.  **Run the Next.js development server:**
    In another terminal, run:
    ```bash
    npm run dev
    ```
    This will start the Next.js application, usually on `http://localhost:9002`.

6.  Open your browser and navigate to `http://localhost:9002` to see the application.

### Building for Production

```bash
npm run build
npm run start
```

## 📂 Project Structure

Here's a brief overview of the key directories:

*   `src/app/`: Contains the Next.js App Router pages and layouts.
    *   `page.tsx`: The main entry point for the homepage.
    *   `layout.tsx`: The root layout for the application.
    *   `globals.css`: Global styles and Tailwind CSS theme configuration.
*   `src/components/`: Shared React components.
    *   `AlignAiResume/`: Components specific to the AlignMate application (Header, Footer, ResumeBuilder, feature sections, etc.).
    *   `ui/`: ShadCN UI components.
*   `src/ai/`: Genkit AI integration.
    *   `genkit.ts`: Genkit initialization and configuration.
    *   `flows/`: Contains the Genkit flows for different AI features (e.g., `generate-resume.ts`, `optimize-resume.ts`, `tailor-resume.ts`).
    *   `dev.ts`: Development server entry point for Genkit flows.
*   `src/lib/`: Utility functions and libraries.
    *   `utils.ts`: General utility functions (like `cn` for class names).
    *   `zod-schemas.ts`: Zod schemas for form validation and AI flow inputs/outputs.
*   `src/hooks/`: Custom React hooks (e.g., `use-toast.ts`, `use-mobile.ts`).
*   `public/`: Static assets (though images in this project are mostly placeholders or external).
*   `next.config.ts`: Next.js configuration file.
*   `tailwind.config.ts`: Tailwind CSS configuration.
*   `components.json`: ShadCN UI configuration.

## 🤖 AI Features Explained

AlignMate leverages Genkit to interact with Google's Gemini models for its AI capabilities.

1.  **Generate Resume (`generate-resume.ts`)**
    *   **Input:** Structured data from the resume form (`GenerateResumeInput`).
    *   **Process:** The AI acts as an expert resume writer. It takes the user's raw data, refines the language, uses action verbs, quantifies achievements where appropriate, ensures professional tone, incorporates general ATS-friendly keywords, and formats it into a clean, plain text resume.
    *   **Output:** A string containing the generated plain text resume (`GenerateResumeOutput`).

2.  **Optimize Resume (`optimize-resume.ts`)**
    *   **Input:** Raw text of an existing resume (`OptimizeResumeInput`).
    *   **Process:** The AI reformats and optimizes the provided text, focusing on ATS-friendly structure, professional formatting, action verbs, and relevant keywords.
    *   **Output:** An object containing the optimized resume text (`OptimizeResumeOutput`).

3.  **Tailor Resume & ATS Checker (`tailor-resume.ts`)**
    *   **Input:** The current resume text and a job description (`TailorResumeInput`).
    *   **Process:**
        *   The AI deeply analyzes the job description to extract key skills, technologies, responsibilities, and company culture cues.
        *   It then rewrites/reorganizes the resume to highlight alignment with these specific requirements, integrating keywords naturally and concisely.
        *   Simultaneously, it generates a review object.
    *   **Output:** An object (`TailorResumeOutput`) containing:
        *   `tailoredResume`: The new, job-description-specific plain text resume.
        *   `review`: An object with:
            *   `strengths`: Strengths of the resume against the job description (bullet points).
            *   `weaknesses`: Weaknesses/gaps (bullet points).
            *   `atsScore`: Estimated ATS score (0-100%).
            *   `readability`: Brief readability assessment.
            *   `keywordMatchRate`: Estimated keyword match rate (0-100%).
            *   `suggestions`: Actionable improvement suggestions (bullet points).

## 🎨 UI & Styling

*   **ShadCN UI:** Provides a set of beautifully designed and accessible components that can be easily customized.
*   **Tailwind CSS:** Used for utility-first styling, allowing for rapid UI development and easy maintenance.
*   **Theming:** Dark and Light modes are supported through CSS variables defined in `src/app/globals.css` and managed by `next-themes`.

## 🚀 Future Enhancements (Ideas)

*   Direct PDF/DOCX export options.
*   User accounts for saving and managing multiple resumes.
*   More sophisticated template selection (beyond illustrative).
*   Integration with job boards for easier application.
*   Advanced AI suggestions for specific industries or roles.
*   Cover letter generation assistant.

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or want to fix a bug, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

---

Thank you for checking out AlignMate Resume Builder! We hope it helps you align your career path with success.
