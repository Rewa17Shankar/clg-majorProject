import { useEffect, useState } from "react";

export default function Preloader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 85) {
          setGlowIntensity(((next - 85) / 15) * 100); // 85->100% maps to glow intensity 0->100%
        }
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0f10]">
      <div className="relative w-[900px] max-w-[95%] h-[460px] rounded-xl bg-gradient-to-b from-white/[0.02] to-black/[0.06] shadow-[0_6px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.02)] p-7 overflow-hidden">
        
        {/* Neon Glows */}
        <div className="absolute left-[12%] top-[38%] w-[220px] h-[220px] rounded-full blur-[36px] opacity-80 bg-gradient-radial from-cyan-400/50 to-transparent z-10"></div>
        <div className="absolute right-[12%] top-[38%] w-[220px] h-[220px] rounded-full blur-[36px] opacity-80 bg-gradient-radial from-purple-500/50 to-transparent z-10"></div>

        {/* Paths */}
        <svg viewBox="0 0 1200 460" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-20">
          <path
            d="M120 220 C220 210, 320 200, 420 220 C520 248, 560 300, 560 300 C640 330, 720 320, 780 270"
            className="neon-path-left fill-none stroke-cyan-400 stroke-[7] stroke-linecap-round"
            style={{
              strokeDasharray: 1000,
              strokeDashoffset: 1000,
              filter: "drop-shadow(0 0 35px rgba(79,231,255,0.6))",
              animation: "draw-left 5s ease-in-out 0.5s forwards",
            }}
          />
          <path
            d="M1080 220 C980 210, 880 200, 780 220 C680 248, 640 300, 640 300 C560 330, 480 320, 420 270"
            className="neon-path-right fill-none stroke-purple-500 stroke-[7] stroke-linecap-round"
            style={{
              strokeDasharray: 1000,
              strokeDashoffset: 1000,
              filter: "drop-shadow(0 0 35px rgba(211,110,255,0.6))",
              animation: "draw-right 5s ease-in-out 1.5s forwards",
            }}
          />
        </svg>

        {/* Floating Nodes */}
        <div className="absolute left-[12%] top-[36%] w-[34px] h-[34px] rounded-lg bg-cyan-400/15 grid place-items-center animate-node-float-left z-30">
          <div className="w-[18px] h-[18px] rounded bg-white"></div>
        </div>
        <div className="absolute right-[12%] top-[36%] w-[34px] h-[34px] rounded-lg bg-purple-500/15 grid place-items-center animate-node-float-right z-30">
          <div className="w-[18px] h-[18px] rounded bg-white"></div>
        </div>

        {/* Logo */}
        <div
          className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[210px] h-[210px] rounded-[18px] bg-gradient-to-b from-[#111213] to-[#0a0a0a] shadow-[0_35px_60px_rgba(0,0,0,0.6)] grid place-items-center animate-float-card z-40 overflow-hidden"
          style={{
            boxShadow: `
              0 0 ${glowIntensity * 0.3}px #41D1FF, 
              0 0 ${glowIntensity * 0.6}px #41D1FF, 
              0 0 ${glowIntensity * 0.4}px #D36EFF, 
              0 0 ${glowIntensity * 0.7}px #D36EFF
            `,
            transition: "box-shadow 0.1s ease-in-out",
          }}
        >
          <div className="absolute inset-0 rounded-[18px] bg-gradient-to-br from-white/[0.03] to-transparent mix-blend-overlay"></div>
          <img
            src="/LOGO1.jpg"
            alt="HRMS Logo"
            className="w-[120px] h-[120px] object-cover opacity-80 mix-blend-lighten"
          />
        </div>

        {/* Loading Info */}
        <div className="absolute bottom-7 left-7 text-[15px] text-gray-300 z-50">
          <h3 className="text-lg font-semibold text-white mb-1">Loading HRMS Platform</h3>
          <p className="text-sm">Preparing your workspace... {progress}%</p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes draw-left { to { stroke-dashoffset: 0; } }
        @keyframes draw-right { to { stroke-dashoffset: 0; } }
        @keyframes float-card {
          0%,100% { transform: translate(-50%, -50%) rotate(18deg) translateY(0); }
          50% { transform: translate(-50%, -50%) rotate(22deg) translateY(-12px); }
        }
        @keyframes node-float-left {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-14px) scale(1.05); }
        }
        @keyframes node-float-right {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-14px) scale(1.05); }
        }
        .animate-float-card { animation: float-card 6s ease-in-out infinite; }
        .animate-node-float-left { animation: node-float-left 4s ease-in-out infinite; }
        .animate-node-float-right { animation: node-float-right 4s ease-in-out infinite 0.5s; }
      `}</style>
    </div>
  );
}
