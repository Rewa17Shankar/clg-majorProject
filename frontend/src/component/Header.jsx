// import { Users } from 'lucide-react';
// import { useState, useEffect } from 'react';

// export default function Header() {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
//       scrolled
//         ? 'bg-slate-900/80 backdrop-blur-xl shadow-lg'
//         : 'bg-transparent'
//     }`}>
//       <div className="container mx-auto px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
//               <Users className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-xl font-bold text-white">OnBoard-X</span>
//           </div>

//           <nav className="hidden md:flex items-center gap-8">
//             <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
//             <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
//             <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
//             <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
//           </nav>

//           <div className="flex items-center gap-4">
//             <button className="hidden sm:block px-5 py-2 text-gray-300 hover:text-white transition-colors">
//               Sign In
//             </button>
//             <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-medium">
//               Get Started
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


import { Users } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled
        ? 'bg-slate-900/80 backdrop-blur-xl shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo Image */}
            <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden shadow-lg shadow-purple-500/30 bg-slate-800">
              <img 
                src="/LOGO.jpg" 
                alt="OnBoard-X Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-bold text-white">OnBoard-X</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            {/* <button className="hidden sm:block px-5 py-2 text-gray-300 hover:text-white transition-colors">
              Sign In
            </button> */}
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-medium">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
