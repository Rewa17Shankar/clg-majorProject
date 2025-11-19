import { ArrowRight, BarChart3, Clock, Shield } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const navigate = useNavigate(); // ✅ initialize navigate

  const handleWatchDemo = () => {
    navigate("/role-select"); // navigate to RoleSelect page
  };
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMDAsIDIwMCwgMjAwLCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-full mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-300">Next-Gen HR Management Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Empowering Your Workforce
            </span>
            <br />
            <span className="text-white">with Smart HR Solutions</span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Transform your HR operations with cutting-edge automation, real-time analytics, and seamless workforce management—all in one intuitive platform.
          </p>

          {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white rounded-lg font-semibold border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
              Watch Demo
            </button>
          </div> */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2">
          Get Started Free
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* ✅ Updated button */}
        <button
          onClick={handleWatchDemo} // navigate when clicked
          className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white rounded-lg font-semibold border border-slate-700 hover:border-cyan-500/50 transition-all duration-300"
        >
          Watch Demo
        </button>
      </div>

          <div className="relative mt-20">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="group p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Real-Time Analytics</h3>
                <p className="text-sm text-gray-400">Track workforce metrics and performance instantly</p>
              </div>

              <div className="group p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Time Automation</h3>
                <p className="text-sm text-gray-400">Automate attendance, leave, and shift management</p>
              </div>

              <div className="group p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Enterprise Security</h3>
                <p className="text-sm text-gray-400">Bank-grade encryption and compliance ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-slate-950"></div>
    </section>
  );
}
