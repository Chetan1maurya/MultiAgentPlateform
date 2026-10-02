import React from "react";

const agents = [
  { name: "Chat Agent", icon: "💬" },
  { name: "Coding Agent", icon: "💻" },
  { name: "PDF Agent", icon: "📄" },
  { name: "PPT Agent", icon: "📊" },
  { name: "Image Agent", icon: "🖼️" },
  { name: "Search Agent", icon: "🔎" },
];

const paths = [
  "M 185 210 C 350 210, 370 35, 650 35",
  "M 185 210 C 350 210, 390 105, 650 105",
  "M 185 210 C 350 210, 410 175, 650 175",
  "M 185 210 C 350 210, 410 245, 650 245",
  "M 185 210 C 350 210, 390 315, 650 315",
  "M 185 210 C 350 210, 370 385, 650 385",
];

const AgentWorkflow = () => {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 overflow-hidden">

      {/* Heading */}
      <div className="text-center mb-16">
        <p className="text-sm font-medium text-indigo-400 uppercase tracking-[0.2em] mb-4">
          Intelligent Routing
        </p>

        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          One request.
          <span className="text-slate-500"> Multiple possibilities.</span>
        </h2>

        <p className="mt-4 text-slate-400 max-w-xl mx-auto">
          CortexAI intelligently routes every request to the specialized
          agent designed for the task.
        </p>
      </div>


      {/* Workflow */}
      <div className="relative h-[440px]">

        {/* SVG CONNECTIONS */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 820 420"
          preserveAspectRatio="none"
        >

          <defs>

            {/* Line gradient */}
            <linearGradient
              id="workflowLine"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#64748b" stopOpacity="0.15" />
              <stop offset="40%" stopColor="#818cf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.25" />
            </linearGradient>

            {/* Glow */}
            <filter
              id="dotGlow"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur stdDeviation="3" result="blur" />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

          </defs>


          {paths.map((path, index) => (
            <g key={index}>

              {/* CONTINUOUS BASE LINE */}
              <path
                d={path}
                fill="none"
                stroke="url(#workflowLine)"
                strokeWidth="1.5"
              />


              {/* MOVING DOTS */}

              <circle
                r="2.5"
                fill="#818cf8"
                filter="url(#dotGlow)"
              >
                <animateMotion
                  dur={`${2.8 + index * 0.25}s`}
                  repeatCount="indefinite"
                  begin={`${index * 0.35}s`}
                  path={path}
                />
              </circle>


              <circle
                r="1.5"
                fill="#c4b5fd"
                opacity="0.8"
              >
                <animateMotion
                  dur={`${2.8 + index * 0.25}s`}
                  repeatCount="indefinite"
                  begin={`${index * 0.35 + 0.45}s`}
                  path={path}
                />
              </circle>


              <circle
                r="1"
                fill="#7dd3fc"
                opacity="0.7"
              >
                <animateMotion
                  dur={`${2.8 + index * 0.25}s`}
                  repeatCount="indefinite"
                  begin={`${index * 0.35 + 0.9}s`}
                  path={path}
                />
              </circle>

            </g>
          ))}
        </svg>

        <div
          aria-hidden="true"
          className="absolute top-1/2 left-44 h-[1.5px] -translate-y-1/2 bg-gradient-to-r from-indigo-400/30 to-indigo-400/15"
          style={{ width: "max(0px, calc(22.56% - 176px))" }}
        />

        {/* USER REQUEST */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2">

          <div className="workflow-input relative w-44 h-28 rounded-2xl border border-indigo-400/30 bg-indigo-500/[0.08] backdrop-blur-md flex flex-col items-center justify-center shadow-xl shadow-indigo-500/10">

            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl bg-indigo-500/5 blur-xl" />

            <div className="relative text-2xl mb-2">
              ✨
            </div>

            <span className="relative text-sm font-medium text-white">
              User Request
            </span>

            <span className="relative text-[10px] text-slate-500 mt-1">
              Input
            </span>

          </div>

        </div>


        {/* AGENTS */}
        <div className="absolute right-0 top-0 h-full flex flex-col justify-between">

          {agents.map((agent, index) => (

            <div
              key={agent.name}
              className="workflow-agent relative w-56 h-14 rounded-xl border border-white/10 bg-white/[0.035] backdrop-blur-md flex items-center gap-3 px-4"
            >

              {/* Agent glow */}
              <div className="absolute inset-0 rounded-xl bg-indigo-500/[0.03]" />

              <div className="relative w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center text-lg">
                {agent.icon}
              </div>

              <div className="relative">

                <p className="text-sm font-medium text-white">
                  {agent.name}
                </p>

                <p className="text-[10px] text-slate-500">
                  Specialized Agent
                </p>

              </div>

            </div>

          ))}

        </div>


        {/* ROUTING LABEL */}
        <div className="absolute left-[34%] top-1/2 -translate-y-1/2">

          <div className="px-3 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">

            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Intelligent Routing
            </span>

          </div>

        </div>

      </div>


      {/* CSS */}
      <style>{`

        .workflow-input {
          animation: inputPulse 3s ease-in-out infinite;
        }

        @keyframes inputPulse {

          0%, 100% {
            box-shadow:
              0 0 0 rgba(99,102,241,0),
              0 10px 40px rgba(99,102,241,0.05);
          }

          50% {
            box-shadow:
              0 0 35px rgba(99,102,241,0.15),
              0 10px 40px rgba(99,102,241,0.08);
          }

        }


        .workflow-agent {
          transition:
            border-color 300ms ease,
            background 300ms ease,
            transform 300ms ease;
        }

        .workflow-agent:hover {
          border-color: rgba(129,140,248,0.35);
          background: rgba(255,255,255,0.06);
          transform: translateX(-4px);
        }


        @media (prefers-reduced-motion: reduce) {

          .workflow-input {
            animation: none;
          }

        }

      `}</style>

    </section>
  );
};

export default AgentWorkflow;
