# 🧠 CortexAI

### Agentic AI Ecosystem

CortexAI is an **agentic AI platform** that brings multiple specialized AI agents together into a single ecosystem.

Instead of using one AI workflow for every task, CortexAI provides specialized agents for **conversation, coding, PDF generation, PPT generation, image analysis, and web research**.

The platform is designed around the idea of intelligent task routing — a user provides a request, and the appropriate specialized agent handles the task.

---

## ✨ Features

### 💬 Chat Agent

Have intelligent conversations with contextual responses.

* General-purpose AI conversations
* Context-aware interactions
* Conversation history
* Persistent chat sessions
* Streaming responses

---

### 💻 Coding Agent

A specialized agent for software development tasks.

* Generate code
* Explain code
* Debug errors
* Improve existing code
* Work with multiple programming languages

---

### 📄 PDF Agent

Generate structured PDF documents from user requests.

* Create documents from prompts
* Generate structured content
* Convert generated content into PDF
* Download generated documents

---

### 📊 PPT Agent

Create presentations from simple user instructions.

* Generate presentation content
* Structure information into slides
* Create presentation files
* Download generated presentations

---

### 🖼️ Image Agent

Analyze images using AI-powered vision capabilities.

* Upload images
* Analyze image content
* Understand visual information
* Answer questions about uploaded images

---

### 🔎 Search Agent

Research information from the web.

* Search for relevant information
* Retrieve web results
* Summarize information
* Assist with research tasks

---

## 🧠 How CortexAI Works

CortexAI follows an agent-based architecture where different capabilities are handled by specialized agents.

A simplified workflow looks like this:

```text
                         ┌───────────────┐
                         │  Chat Agent   │
                         └───────▲───────┘
                                 │
                         ┌───────┴───────┐
                         │ Coding Agent  │
                         └───────▲───────┘
                                 │
┌──────────────┐         ┌────────┴───────┐
│ User Request │ ──────► │ CortexAI Core  │
└──────────────┘         │ Agent Routing  │
                         └────────┬───────┘
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
       ┌─────▼─────┐        ┌─────▼─────┐        ┌─────▼─────┐
       │ PDF Agent │        │ PPT Agent │        │Image Agent │
       └───────────┘        └───────────┘        └───────────┘

                              │
                        ┌─────▼─────┐
                        │  Search   │
                        │   Agent   │
                        └───────────┘
```

The architecture allows individual agents to focus on specific tasks instead of making one large workflow responsible for everything.

---

# 🏗️ Architecture

CortexAI follows a modern full-stack architecture.

```text
┌─────────────────────────────────────────────┐
│                  Frontend                   │
│                                             │
│              React + Tailwind               │
│                                             │
└──────────────────────┬──────────────────────┘
                       │
                       │ REST API
                       ▼
┌─────────────────────────────────────────────┐
│                  Backend                    │
│                                             │
│              Node.js + Express              │
│                                             │
├─────────────────────────────────────────────┤
│                  Gateway                    │
│                                             │
├─────────────────────────────────────────────┤
│              Microservices                  │
│                                             │
│       Auth │ Chat | Agent | Billing         |
│                                             │
├─────────────────────────────────────────────┤
│               Agent Layers                  │
│  Chat| Coding | Pdf | Ppt | Image | Search  │
├─────────────────────────────────────────────┤
│                                             │
│        LangChain / LangGraph                │
│                                             │
└───────────────┬──────────────┬──────────────┘
                │              │
                ▼              ▼
          ┌──────────┐   ┌──────────────┐
          │  Redis   │   │   Database   │
          └──────────┘   └──────────────┘

                │
                ▼
        External AI / Search
             Services
```

---

# 🛠️ Tech Stack

## Frontend

* React
* JavaScript
* Tailwind CSS
* Redux
* Axios
* React Icons

## Backend

* Node.js
* Express.js
* REST APIs
* Middleware-based architecture

## AI / Agent Framework

* LangChain
* LangGraph
* Large Language Models
* AI-powered specialized agents

## Data & Infrastructure

* Redis
* Database
* Object/File Storage
* Qdrant for vector search / retrieval workflows

## Authentication

* Firebase Authentication
* Google Sign-In

## Other Technologies

* Git
* GitHub
* REST APIs
* Server-Sent Events (where applicable)

---

# 📁 Project Structure

The repository is organized into separate frontend and backend applications.

```text
CortexAI/
│
├── Frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── assets/
│   │   └── features
│   │
│   ├──utils/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── Backend/
│   │
│   ├── gateway/
│   ├── services/
│   │   ├── agent/
│   │   ├── auth/
│   │   ├── billing/
│   │   └── chat/
│   │  
│   ├──shared/
│   │   └── redis
│   ├── package.json
│   └── docker-compose.yml
│
└── README.md
```

---

# 🚀 Running CortexAI Locally

Follow the steps below to run CortexAI on your local machine.

## Prerequisites

Make sure the following are installed:

* **Node.js** — LTS version recommended
* **npm**
* **Git**
* A database instance required by the backend
* **Redis**
* Required AI/LLM API access
* Firebase project for authentication
* Qdrant if using the retrieval/vector features
* Razorpay credential for payment service

You can verify Node.js and npm:

```bash
node -v
npm -v
```

---

Add the required backend configuration.

A typical configuration may contain:

```env
PORT=8000

# Database
DATABASE_URL=your_database_connection

# Redis
REDIS_URL=your_redis_connection

# Authentication
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key

# AI / LLM
LLM_API_KEY=your_llm_api_key

# Search
SEARCH_API_KEY=your_search_api_key

# Vector Database
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key

# Storage
STORAGE_ACCESS_KEY=your_access_key
STORAGE_SECRET_KEY=your_secret_key

# Razorpay
RAZORPAY_KEY_ID=Razorpay API key ID 
RAZORPAY_KEY_SECRET=Razorpay API secret 
```
## 🚀 Running CortexAI Locally

CortexAI uses a **microservice-based backend architecture**. The backend consists of an API Gateway and multiple independent services.

### Backend Services

| Service             | Purpose                                                                        |
| ------------------- | ------------------------------------------------------------------------------ |
| **Gateway**         | Entry point for client requests and routes requests to the appropriate service |
| **Auth Service**    | Handles authentication and user-related operations                             |
| **Agent Service**   | Handles AI agent workflows and agent execution                                 |
| **Billing Service** | Handles credits, payments, and billing-related operations                      |
| **Chat Service**    | Handles conversations, messages, and chat history                              |
| **Redis**           | Used for caching, rate limiting, and other fast-access application data        |

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Docker Desktop
* Git

You will also need the required environment variables for the services, including database, authentication, AI, Redis, payment, and other external service credentials.

> Environment variables and Docker configuration may change as the project evolves. Refer to the `.env.example` files and service configuration before starting the application.

---

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <repository-folder>
```

---

## 2. Install Dependencies

Install dependencies for the frontend and each backend service.

For the backend:

```bash
cd Backend
npm install
```

Then install dependencies inside each service if required:

```bash
cd services/auth
npm install

cd ../agent
npm install

cd ../billing
npm install

cd ../chat
npm install
```

Install frontend dependencies separately:

```bash
cd Frontend
npm install
```

---

## 3. Start Redis with Docker

Redis is configured through Docker Compose.

Open a terminal in the `Backend` directory:

```bash
cd Backend
```

Start the Docker services:

```bash
docker compose up
```

This starts the Docker-managed infrastructure required by the backend, including Redis.

Keep this terminal running.

> If your `docker-compose.yml` contains additional infrastructure services, those services will also be started by this command.

---

## 4. Start the API Gateway

Open a **new terminal**.

```bash
cd Backend
```

Start the gateway:

```bash
nodemon server.js
```

The gateway acts as the main entry point for requests coming from the frontend and forwards them to the appropriate backend microservice.

---

## 5. Start the Auth Service

Open another terminal:

```bash
cd Backend/services/auth
```

Start the service:

```bash
nodemon server.js
```

---

## 6. Start the Agent Service

Open another terminal:

```bash
cd Backend/services/agent
```

Start the service:

```bash
nodemon server.js
```

The Agent Service handles CortexAI's AI-agent workflows.

---

## 7. Start the Billing Service

Open another terminal:

```bash
cd Backend/services/billing
```

Start the service:

```bash
nodemon server.js
```

The Billing Service handles billing and payment-related operations.

---

## 8. Start the Chat Service

Open another terminal:

```bash
cd Backend/services/chat
```

Start the service:

```bash
nodemon server.js
```

The Chat Service handles conversations and chat-related operations.

---

## 9. Start the Frontend

Open another terminal and navigate to the frontend:

```bash
cd Frontend
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at the URL shown by Vite, typically:

```text
http://localhost:5173
```

---

## 🧩 Local Development Architecture

During local development, the application runs approximately as follows:

```text
                         ┌─────────────────┐
                         │    Frontend     │
                         │ React / Vite    │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │  API Gateway    │
                         │   server.js     │
                         └────────┬────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
              ▼                   ▼                   ▼
      ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
      │ Auth Service │    │Agent Service │    │Chat Service  │
      │   server.js  │    │   server.js  │    │   server.js  │
      └──────────────┘    └──────────────┘    └──────────────┘
                                  │
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Billing Service │
                         │   server.js     │
                         └─────────────────┘

                         ┌─────────────────┐
                         │      Redis      │
                         │ Docker Container│
                         └─────────────────┘
```

### Terminal Overview

For local development, you will typically have the following processes running:

**Terminal 1 — Redis / Docker**

```bash
cd Backend
docker compose up
```

**Terminal 2 — Gateway**

```bash
cd Backend
nodemon server.js
```

**Terminal 3 — Auth**

```bash
cd Backend/services/auth
nodemon server.js
```

**Terminal 4 — Agent**

```bash
cd Backend/services/agent
nodemon server.js
```

**Terminal 5 — Billing**

```bash
cd Backend/services/billing
nodemon server.js
```

**Terminal 6 — Chat**

```bash
cd Backend/services/chat
nodemon server.js
```

**Terminal 7 — Frontend**

```bash
cd Frontend
npm run dev
```

Once all services are running, open the frontend in your browser and use CortexAI.
---

# 🧩 Adding a New Agent

CortexAI is designed so additional specialized agents can be added as the platform grows.

A new agent generally requires:

```text
User Request
     │
     ▼
Agent Selection / Routing
     │
     ▼
New Specialized Agent
     │
     ▼
Tools / LLM / External Services
     │
     ▼
Agent Response
```

For example, future agents could include:

* SQL Agent
* Data Analysis Agent
* Research Agent
* Email Agent
* Browser Agent
* Document Analysis Agent
* DevOps Agent

---

# 📌 Current Agents

| Agent           | Purpose                         |
| --------------- | ------------------------------- |
| 💬 Chat Agent   | General AI conversations        |
| 💻 Coding Agent | Software development assistance |
| 📄 PDF Agent    | PDF/document generation         |
| 📊 PPT Agent    | Presentation generation         |
| 🖼️ Image Agent | Image understanding             |
| 🔎 Search Agent | Web research                    |

---

# 🌐 Platform

CortexAI is designed to provide access to AI capabilities through a unified platform rather than requiring users to work with separate tools for every task.

The platform can be accessed through a web interface, with the architecture also allowing additional client applications and interfaces to be added later.

---

# 🎯 Project Goals

The main goals of CortexAI are:

* Build a practical agentic AI platform.
* Separate AI capabilities into specialized agents.
* Explore multi-agent application architecture.
* Provide a unified interface for different AI tasks.
* Use LangChain and LangGraph for agent workflows.
* Use Redis for fast-access state and caching.
* Support file-based AI workflows.
* Build an architecture that can be extended with new agents.

---

# 🚧 Future Improvements

Possible future improvements include:

* More specialized agents
* Improved automatic agent routing
* Agent-to-agent communication
* More advanced RAG workflows
* Better long-term memory
* More external tool integrations
* Advanced workflow visualization
* Mobile application
* Improved observability and monitoring
* Production-scale infrastructure
* More granular permissions and user management

---

# 🤝 Contributing

Contributions are welcome.

To contribute:

### 1. Fork the repository

```bash
git clone [https://github.com/Chetan1maurya/MultiAgentPlateform.git](https://github.com/Chetan1maurya/MultiAgentPlateform.git)
```

### 2. Create a branch

```bash
git checkout -b feature/your-feature
```

### 3. Make your changes

Implement and test your changes locally.

### 4. Commit

```bash
git add .
git commit -m "Add your feature"
```

### 5. Push

```bash
git push origin feature/your-feature
```

### 6. Create a Pull Request

Open a Pull Request describing your changes.

---

# ⚠️ Disclaimer

CortexAI is a software project for experimenting with and building AI-powered workflows.

AI-generated responses may contain inaccurate or incomplete information. Users should independently verify important information before relying on AI-generated output.

---

# 👨‍💻 Author

**Chetan Maurya**

Software Developer | MERN Stack

GitHub:
https://github.com/Chetan1maurya

LinkedIn:
https://linkedin.com/in/mauryachetan27

---

# ⭐ Support

If you find CortexAI interesting, consider giving the repository a ⭐ on GitHub.

Feedback, issues, and contributions are welcome.

---

## 📄 License

Add the project's license here if you have selected one.

For example:

```text
MIT License
```

or add a `LICENSE` file to the repository and reference it here.
