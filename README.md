# 🧠 AskMyNotes

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.3-black)
![Convex](https://img.shields.io/badge/Convex-Backend/DB-orange)
![AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-6.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

**AskMyNotes** is an intelligent, AI-powered note-taking application that turns your static notes into an interactive knowledge base. Built with the **Next.js 15 App Router** and **Convex**, it leverages **Retrieval-Augmented Generation (RAG)** to allow you to chat with your own data.

Stop searching through notes. Just ask.

---

## ✨ Key Features

- **📝 Smart Note Management** Create, edit, and organize rich text notes with a clean, distraction-free interface.
 

- **🤖 RAG-Powered AI Assistant** An integrated chatbot that understands your notes. It uses vector search to find relevant information and answers your questions in context.
 

- **⚡ Real-Time Sync & Vector Storage** Powered by **Convex**, notes are synced instantly across devices. Embeddings are generated and stored automatically upon note creation or update.
 

- **🧠 Advanced AI Integration** Utilizes **Google Gemini** models (via Vercel AI SDK) for both embedding generation and natural language reasoning.
 

- **🔐 Secure Authentication** Robust user authentication provided by **Convex Auth** ensures your private notes remain private.
 

- **🎨 Modern & Accessible UI** A beautiful, responsive interface built with **Tailwind CSS**, **Shadcn UI**, and full Dark Mode support.
 

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [Shadcn UI](https://ui.shadcn.com/) (Radix UI primitives)
- **State Management:** React Hooks & Convex React Client

### Backend & Database
- **Platform:** [Convex](https://convex.dev/) (Backend-as-a-Service)
- **Database:** Real-time document store with built-in Vector Search
- **Auth:** Convex Auth

### Artificial Intelligence
- **SDK:** [Vercel AI SDK](https://sdk.vercel.ai/docs) (v6.0)
- **LLM:** Google Gemini (`gemini-1.5-flash`) for chat
- **Embeddings:** Google Text Embedding (`text-embedding-001`)

---

## ⚙️ How It Works (The RAG Pipeline)

1.  **Ingestion & Embedding**:  
    When you create or edit a note, the text is sent to a Convex Action. This action uses Google's embedding model to convert your text into a vector (a 3072-dimensional list of numbers representing meaning).
   

2.  **Storage**:  
    The raw text is stored in the `notes` table, and the vector is stored in the `noteEmbeddings` table, indexed for fast retrieval.
   

3.  **Retrieval**:  
    When you ask the chatbot a question, your query is converted into a vector. The system performs a **cosine similarity search** to find the notes most relevant to your question.
   

4.  **Generation**:  
    The relevant notes are injected into the AI's context window. The AI then answers your question using *only* the information found in your notes, minimizing hallucinations.
   

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **pnpm**
- A **Convex** account
- A **Google AI Studio** API Key

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/askmynotes.git](https://github.com/your-username/askmynotes.git)
cd askmynotes
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory. You will need your Google API key here. The Convex variables will be set automatically in the next step.

```env
# .env.local
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here
```

### 4. Initialize Convex
Run the dev command to set up your Convex project. This will prompt you to log in and create a new project.

```bash
npx convex dev
```
*Keep this terminal running. It syncs your backend functions and schema.*

### 5. Start the Frontend
In a new terminal window, start the Next.js development server.

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the app!

---

## 📂 Project Structure

```bash
├── convex/                 # Backend logic (Serverless functions)
│   ├── auth.ts             # Auth configuration
│   ├── http.ts             # HTTP Actions (Chat API endpoint)
│   ├── notes.ts            # Database Mutations & Queries
│   ├── notesActions.ts     # AI Actions (Embeddings & RAG)
│   └── schema.ts           # Database Schema & Vector Index
├── src/
│   ├── app/                # Next.js App Router Pages
│   │   ├── (auth)/         # Sign-in/Auth pages
│   │   └── (main)/         # Main application pages (Notes, Chat)
│   ├── components/         # Reusable UI Components
│   │   ├── ui/             # Shadcn UI primitives
│   │   └── ...
│   └── lib/                # Utility functions
│       └── embeddings.ts   # AI Embedding logic
└── public/                 # Static assets
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## Acknowledgments

This project was built following a tutorial by [**Coding in Flow**](https://youtube.com/@codinginflow?si=J2ug4-7zkVS_E9kH).


---

<p align="center">
  Built with ❤️ using Next.js and Convex
</p>