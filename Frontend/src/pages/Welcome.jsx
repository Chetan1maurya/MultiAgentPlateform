import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import { useState } from "react";
import api from "../../utils/axios.js"
import { auth, googleProvider } from "../../utils/firebase.js";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import {
    FaFilePowerpoint,
    FaFilePdf,
    FaGoogle,
    FaComments,
} from "react-icons/fa";

const Welcome = () => {
    
    const dispatch = useDispatch()
    const handleLogin = async (token) => {
        try {
            const { data } = await api.post("/api/auth/login", { token }, { withCredentials: true })
            dispatch(setUserData(data))
        } catch (error) {
            console.log(error)
        }
    }
    const googleLogin = async () => {
    try {
        googleProvider.setCustomParameters({
            prompt: "select_account",
        });

        const data = await signInWithPopup(auth, googleProvider);
        const token = await data.user.getIdToken();

        await handleLogin(token);
    } catch (error) {
        console.log(error);
    }
};
    const features = [
        {
            name: "Chat Agent",
            description:
                "Have intelligent conversations, ask questions, brainstorm ideas, and get contextual answers powered by AI.",
            icon: "💬",
        },
        {
            name: "Coding Agent",
            description:
                "Generate, explain, debug, and improve code across different programming languages and development tasks.",
            icon: "💻",
        },
        {
            name: "PDF Agent",
            description:
                "Create structured PDF documents from your ideas, prompts, notes, and other information.",
            icon: "📄",
        },
        {
            name: "PPT Agent",
            description:
                "Turn your ideas into professional presentations with structured slides and concise content.",
            icon: "📊",
        },
        {
            name: "Image Agent",
            description:
                "Analyze and understand images using AI-powered vision capabilities.",
            icon: "🖼️",
        },
        {
            name: "Search Agent",
            description:
                "Find and summarize relevant information from the web to help you research faster.",
            icon: "🔎",
        },
    ];

    const cardStyles = [
        {
            accent: "from-cyan-400 to-blue-500",
            glow: "group-hover:shadow-cyan-500/20",
            badge: "Conversational AI",
            preview: "Ask anything...",
        },
        {
            accent: "from-emerald-400 to-green-500",
            glow: "group-hover:shadow-emerald-500/20",
            badge: "Code Assistant",
            preview: "</> Generate code",
        },
        {
            accent: "from-rose-400 to-red-500",
            glow: "group-hover:shadow-rose-500/20",
            badge: "Document Creator",
            preview: "📄 Building your PDF",
        },
        {
            accent: "from-orange-400 to-amber-500",
            glow: "group-hover:shadow-orange-500/20",
            badge: "Presentation Builder",
            preview: "▣ Creating slide 04",
        },
        {
            accent: "from-fuchsia-400 to-purple-500",
            glow: "group-hover:shadow-fuchsia-500/20",
            badge: "Vision Intelligence",
            preview: "🖼️ Image understood",
        },
        {
            accent: "from-sky-400 to-indigo-500",
            glow: "group-hover:shadow-sky-500/20",
            badge: "Web Research",
            preview: "⌕ Finding results...",
        },
    ];

    return (
        <div className="welcome-page min-h-screen bg-[#080a0f] text-white overflow-y-auto">
            <style>{`
            html,
    body,
    #root,
    .welcome-page {
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    html::-webkit-scrollbar,
    body::-webkit-scrollbar,
    #root::-webkit-scrollbar,
    .welcome-page::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
    }
            .welcome-page {
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .welcome-page::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
        }
    .feature-card {
        --rotate-x: 0deg;
        --rotate-y: 0deg;
        transform: perspective(1000px)
            rotateX(var(--rotate-x))
            rotateY(var(--rotate-y));
        transform-style: preserve-3d;
        will-change: transform;
        transition: transform 180ms ease-out;
    }

    .feature-card > *:not(.feature-card-glow) {
        transform: translateZ(24px);
    }
`}</style>
            {/* Background glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-600/20 blur-[150px] rounded-full" />
                <div className="absolute top-[500px] left-[-200px] w-[400px] h-[400px] bg-violet-600/10 blur-[130px] rounded-full" />
                <div className="absolute top-[800px] right-[-200px] w-[400px] h-[400px] bg-blue-600/10 blur-[130px] rounded-full" />
            </div>

            {/* Navbar */}
            <nav className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-6 flex items-center justify-between">

                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <span className="text-lg font-bold">C</span>
                    </div>

                    <span className="text-xl font-semibold tracking-tight">
                        Cortex<span className="text-indigo-400">AI</span>
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
                    <a
                        href="#features"
                        className="hover:text-white transition-colors"
                    >
                        Features
                    </a>

                    <a
                        href="#about"
                        className="hover:text-white transition-colors"
                    >
                        About
                    </a>
                </div>

                <button onClick={googleLogin} className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-medium hover:bg-slate-200 transition-colors cursor-pointer">
                    <FcGoogle size={20} className="inline white" /> Login with Google
                </button>

            </nav>


            {/* Hero Section */}
            <section className="relative z-10 min-h-[calc(100vh-90px)] flex items-center justify-center px-6">

                <div className="max-w-5xl mx-auto text-center">
                    <style>{`
        @keyframes cortex-float-1 {
            0%, 100% { transform: translateY(0) rotate(-5deg); }
            50% { transform: translateY(-18px) rotate(5deg); }
        }

        @keyframes cortex-float-2 {
            0%, 100% { transform: translateY(0) rotate(5deg); }
            50% { transform: translateY(16px) rotate(-5deg); }
        }

        .cortex-float-1 {
            animation: cortex-float-1 5s ease-in-out infinite;
        }

        .cortex-float-2 {
            animation: cortex-float-2 6s ease-in-out infinite;
        }
    `}</style>
                    <div className="hidden md:flex cortex-float-1 absolute left-22 top-20 w-36 h-20 rounded-2xl border border-red-400/20 bg-red-500/10 items-center justify-center gap-3 text-red-300 shadow-lg shadow-red-500/10">
                        <FaFilePowerpoint size={28} />
                        <span className="text-sm font-medium">PowerPoint</span>
                    </div>

                    <div className="hidden md:flex cortex-float-2 absolute right-22 top-16 w-32 h-20 rounded-2xl border border-red-400/20 bg-red-500/10 items-center justify-center gap-3 text-red-300 shadow-lg shadow-red-500/10">
                        <FaFilePdf size={28} />
                        <span className="text-sm font-medium">PDF</span>
                    </div>

                    <div className="hidden md:flex cortex-float-2 absolute left-46 bottom-24 w-36 h-20 rounded-2xl border border-blue-400/20 bg-blue-500/10 items-center justify-center gap-3 text-blue-300 shadow-lg shadow-blue-500/10">
                        <FaGoogle size={26} />
                        <span className="text-sm font-medium">Search</span>
                    </div>

                    <div className="hidden md:flex cortex-float-1 absolute right-46 bottom-20 w-32 h-20 rounded-2xl border border-violet-400/20 bg-violet-500/10 items-center justify-center gap-3 text-violet-300 shadow-lg shadow-violet-500/10">
                        <FaComments size={27} />
                        <span className="text-sm font-medium">Chat</span>
                    </div>
                    {/* Heading */}
                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05] bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">

                        CortexAI

                        <br />

                        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                            Agentic Ecosystem
                        </span>

                    </h1>


                    {/* Description */}
                    <p className="mt-8 max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed">
                        Welcome to <span className="text-white font-semibold">CortexAI </span>
                        An intelligent ecosystem of
                        specialized AI agents designed to help you chat,
                        code, create documents, build presentations, analyze
                        images, and research faster.
                    </p>


                    {/* Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

                        <button
                            onClick={() =>
                                document
                                    .getElementById("features")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="cursor-pointer px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all font-medium shadow-lg shadow-indigo-600/20"
                        >
                            Explore Agents
                        </button>

                    </div>


                    {/* Scroll indicator */}
                    <div className="mt-20 flex flex-col items-center gap-3 text-slate-500">

                        <span className="text-xs uppercase tracking-[0.25em]">
                            Scroll to explore
                        </span>

                        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
                            <div className="w-1 h-1.5 rounded-full bg-white/60 animate-bounce" />
                        </div>

                    </div>

                </div>

            </section>


            {/* Features Section */}
            <section
                id="features"
                className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-28"
            >

                {/* Section heading */}
                <div className="max-w-2xl mb-16">

                    <p className="text-sm font-medium text-indigo-400 uppercase tracking-[0.2em] mb-4">
                        CortexAI Ecosystem
                    </p>

                    <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
                        AI agents built for
                        <span className="text-slate-500"> different tasks.</span>
                    </h2>

                    <p className="mt-5 text-slate-400 leading-relaxed">
                        CortexAI brings multiple specialized agents together
                        in one ecosystem, allowing you to choose the right
                        intelligence for the task you're working on.
                    </p>

                </div>


                {/* Feature cards */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const style = cardStyles[index];

                        return (
                            <div
                                key={feature.name}
                                className={`feature-card group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition-colors duration-300 hover:bg-white/[0.07] hover:shadow-2xl ${style.glow}`}
                                onMouseMove={(event) => {
                                    const card = event.currentTarget;
                                    const rect = card.getBoundingClientRect();

                                    const x = (event.clientX - rect.left) / rect.width;
                                    const y = (event.clientY - rect.top) / rect.height;

                                    const rotateX = (0.5 - y) * 14;
                                    const rotateY = (x - 0.5) * 14;

                                    card.style.setProperty("--rotate-x", `${rotateX}deg`);
                                    card.style.setProperty("--rotate-y", `${rotateY}deg`);
                                }}
                                onMouseLeave={(event) => {
                                    event.currentTarget.style.setProperty("--rotate-x", "0deg");
                                    event.currentTarget.style.setProperty("--rotate-y", "0deg");
                                }}
                            >
                                <div
                                    className={`feature-card-glow absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${style.accent} opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-30`}
                                />

                                <div className="relative flex items-start justify-between">
                                    <div
                                        className={`flex h-8 w-5 items-center justify-center rounded-2xl bg-gradient-to-br ${style.accent} text-2xl shadow-lg`}
                                    >
                                        {feature.icon}
                                    </div>

                                    <span className="text-xs font-medium text-slate-600">
                                        0{index + 1}
                                    </span>
                                </div>

                                <div className="relative mt-6">
                                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] text-slate-300">
                                        {style.badge}
                                    </span>

                                    <h3 className="mt-4 text-xl font-semibold">
                                        {feature.name}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-400">
                                        {feature.description}
                                    </p>
                                </div>

                                <div className="relative mt-6 rounded-xl border border-white/10 bg-black/20 px-4 py-3 font-mono text-xs text-slate-400 transition-colors group-hover:border-white/20">
                                    <span className="mr-2 text-emerald-400">●</span>
                                    {style.preview}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </section>


            {/* Small bottom section */}
            <section
                id="about"
                className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-24"
            >

                <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-10 sm:p-16 text-center">

                    <p className="text-indigo-400 text-sm font-medium mb-4">
                        CORTEXAI
                    </p>

                    <h2 className="text-3xl sm:text-4xl font-bold">
                        Intelligence for every workflow.
                    </h2>

                    <p className="mt-4 max-w-xl mx-auto text-slate-400">
                        One platform. Multiple specialized agents.
                        Built to help you move from idea to execution faster.
                    </p>

                </div>
                <div className="flex justify-center items-center mt-10">
                    <button onClick={googleLogin} className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-medium hover:bg-slate-200 transition-colors cursor-pointer">
                     Get Started
                </button>
                </div>

            </section>

        </div>
    );
};

export default Welcome;

