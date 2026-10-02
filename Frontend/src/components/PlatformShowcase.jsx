import React from "react";
import horizontalImage from "../assets/Horizontal.png";
import VerticalImage from "../assets/Vertical.png";
const PlatformShowcase = () => {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-28 overflow-hidden">

      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-16">

        <p className="text-sm font-medium text-indigo-400 uppercase tracking-[0.2em] mb-4">
          Access CortexAI
        </p>

        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Your workspace,
          <span className="text-slate-500"> everywhere.</span>
        </h2>

        <p className="mt-5 text-slate-400 leading-relaxed">
          Start a conversation, send a request, or use specialized agents
          from whichever device works best for you.
        </p>

      </div>


      {/* Devices */}
      <div className="relative flex items-end justify-center gap-[-20px] min-h-[500px]">


        {/* LAPTOP */}
        <div className="relative w-[720px] max-w-[75%]">

          {/* Laptop Screen */}
          <div className="relative rounded-t-2xl border-[6px] border-slate-700 bg-slate-950 p-2 shadow-2xl shadow-black/50">

            {/* Camera */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-600 z-20" />

            {/* Dummy Screen */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[#080a0f] border border-white/10">


            <img src={horizontalImage} alt="CortexAI platform"
  className="w-full h-full" />

             

            </div>

          </div>


          {/* Laptop Base */}
          <div className="relative h-5 bg-gradient-to-b from-slate-600 to-slate-800 rounded-b-xl shadow-xl">

            <div className="absolute left-1/2 -translate-x-1/2 top-1 w-28 h-1 rounded-full bg-slate-500" />

          </div>

          {/* Laptop Bottom Shadow */}
          <div className="absolute -bottom-5 left-[5%] right-[5%] h-5 bg-black/50 blur-xl" />

        </div>



        {/* MOBILE */}
        <div className="relative -ml-24 mb-[-15px] z-20">

          <div className="relative w-[190px] h-[380px] rounded-[2.2rem] border-[7px] border-slate-700 bg-slate-950 p-2 shadow-2xl shadow-black/60">

            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black z-20" />

            {/* Dummy Mobile Screen */}
            <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden bg-[#080a0f] border border-white/10">

         

           <img src={VerticalImage} alt="CortexAI platform"
  className="w-full h-full" />
             

            </div>

          </div>

        </div>

      </div>

      {/* Ambient glow */}
      <div className="absolute pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-indigo-500/[0.05] blur-[120px] rounded-full -z-10" />

    </section>
  );
};

export default PlatformShowcase;
