
![Quick Query](https://github.com/user-attachments/assets/0dd05065-0563-41e0-8a81-92e4ff068cd2)


# 🧳 AI Travel Planner (LangChain + Ollama + React)

This is an AI-powered travel planner app built with **React + Vite**, using **LangChain.js** and **Ollama** to run a local LLM and generate smart trip itineraries.

---

## 🚀 Features

- 🧠 Uses open-source LLMs via [Ollama](https://ollama.com)
- 🔗 Powered by [LangChain.js](https://js.langchain.com/) for prompt chaining
- 💬 Accepts user input: destination, interests, number of days
- 📄 Renders responses in Markdown
- ⚡ Built using [Vite](https://vitejs.dev) + [React](https://react.dev)

---

## 🛠️ Setup Instructions

### 1. Clone the repo

 ```bash
 git clone https://github.com/yourusername/planpilot.git
 cd planpilot
 ```
### 2. Install dependencies 


 ```bash
npm install
 ```

### 3. Install Ollama from link below 
 [Ollama](https://ollama.com/download)


### 4. Pull and Run Ollama 

```bash 
ollama pull qwen2.5-coder:1.5b-base
ollama run qwen2.5-coder:1.5b-base
```

### 5. Run the React App

```bash 
  npm run dev
```

Visit http://localhost:5173 in your browser.
