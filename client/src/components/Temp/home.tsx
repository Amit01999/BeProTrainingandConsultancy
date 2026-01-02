import React from 'react';
import { ArrowRight } from 'lucide-react';
import heropng from '../asset/h1.png';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 lg:px-16 flex items-center ">
      {/* Mesh Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ff572230_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />

      {/* Gradient Lighting */}
      <div className="absolute -top-40 -left-48 w-[700px] h-[700px] bg-[#FFCCBC] rounded-full blur-[160px] opacity-80" />
      <div className="absolute top-1/4 -right-64 w-[720px] h-[720px] bg-[#E1BEE7] rounded-full blur-[170px] opacity-75" />
      <div className="absolute top-[60%] right-[10%] w-[300px] h-[300px] bg-[#CE93D8] rounded-full blur-[140px] opacity-40 pointer-events-none" />

      {/* Decorative stars */}
      <div className="absolute top-20 right-[50%] text-[#FFC107] text-3xl animate-pulse">
        ★
      </div>
      <div className="absolute top-[48%] right-[14%] text-[#FFC107] text-2xl animate-bounce">
        ★
      </div>

      <div className="max-w-[1500px] mx-auto px-6 lg:px-16 pt-12 pb-16 relative">
        <div className="grid lg:grid-cols-[65%_35%] items-center gap-0">
          {/* LEFT CONTENT - WIDER */}
          <div className="relative z-10 pr-4">
            <h1 className="text-[78px] lg:text-[84px] leading-[1.10] font-black text-black mb-6 tracking-normal ontouch-auto">
              Find the right <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
                  Course
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <path
                    d="M2 10C80 2 220 2 298 10"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#FF5722" />
                      <stop offset="50%" stopColor="#E91E63" />
                      <stop offset="100%" stopColor="#CE93D8" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              for you
            </h1>

            <p className="text-[18px] text-[#424242] leading-relaxed mb-8 max-w-[90%] font-medium">
              See personalised recommendations crafted around your interests,
              abilities, and long-term career ambitions.
            </p>

            <div className="flex gap-4 mb-10">
              <button className="bg-gradient-to-br from-[#FF5722] to-[#FF7043] text-white text-[15px] font-semibold px-7 py-3 rounded-2xl transition-all duration-300 shadow-xl border border-black hover:shadow-[0_24px_60px_-15px_rgba(255,87,34,0.7)] hover:-translate-y-1">
                Find course
              </button>

              <button className="text-[#FF5722] hover:text-[#E64A19] flex items-center gap-2 text-[15px] font-semibold px-3 py-2 transition-all duration-300 group">
                View our blog
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Stats - More Compact */}
            <div className="flex gap-5 flex-wrap">
              <div className="bg-white/90 backdrop-blur-sm border-2 border-[#E1BEE7] rounded-[20px] px-6 py-3 shadow-lg hover:-translate-y-1 transition-all">
                <div className="bg-[#CE93D8] text-white text-[9px] font-semibold px-6 py-0.5 rounded-full mb-1 inline-block">
                  e-learning
                </div>
                <div className="text-[11px] text-[#757575]">subjects</div>
                <div className="text-[28px] font-black">+40</div>
              </div>

              <div className="bg-gradient-to-br from-[#CE93D8] to-[#BA68C8] rounded-[20px] px-8 py-3 shadow-lg hover:-translate-y-1 transition-all">
                <div className="bg-[#FFC107] text-black text-[9px] font-semibold px-3 py-0.5 rounded-full mb-1 inline-block">
                  Online
                </div>
                <div className="text-[11px] text-white/80">courses</div>
                <div className="text-[28px] font-black text-white">+120</div>
              </div>

              <div className="bg-gradient-to-br from-[#FFC107] to-[#FFB300] rounded-[20px] px-6 py-3 shadow-lg hover:-translate-y-1 transition-all">
                <div className="text-white text-[12px]">★★★★★ 5.0</div>
                <div className="text-[11px] text-[#424242]">
                  learner reviews
                </div>
                <div className="text-[28px] font-black">+180k</div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE - Smaller space */}
          <div className="relative h-[600px] hidden lg:flex items-center justify-center -ml-8">
            <div className="absolute w-[600px] h-[600px] rounded-full bg-[#FF8A65]/15 blur-[90px]" />
            <img
              src={heropng}
              alt="Hero"
              className="relative scale-[2.65] w-[180%] max-w-none object-contain drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </div>
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="rgb(var(--whitebackground))"
          />
        </svg>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
}

// import React from 'react';
// import { ArrowRight } from 'lucide-react';
// import heropng from '../asset/h1.png';
// import { Button } from '@/components/ui/button';

// export default function HeroSection() {
//   return (
//     <section className="relative min-h-screen bg-white px-6 lg:px-16 flex items-center overflow-hidden">
//       {/* Background Shapes */}
//       <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#FF6947]/10 blur-[120px]" />
//       <div className="absolute top-1/4 -right-48 w-[600px] h-[600px] rounded-full bg-[#C987D4]/10 blur-[150px]" />
//       <div className="absolute top-[60%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#FFBE06]/10 blur-[100px]" />

//       <div className="container mx-auto relative z-10 py-24">
//         <div className="grid lg:grid-cols-[60%_40%] items-center gap-12">
//           {/* LEFT SIDE */}
//           {/* LEFT CONTENT - WIDER */}
//           <div className="relative z-10 pr-4">
//             <h1 className="text-[78px] lg:text-[84px] leading-[1.10] font-black text-black mb-6 tracking-normal ontouch-auto">
//               Find the right <br />
//               <span className="text-[#FF5722] relative inline-block">
//                 course
//                 <span className="absolute -bottom-3 left-0 w-full h-[7px] bg-gradient-to-r from-[#FF5722] via-[#FF8A65] to-[#FFCCBC] blur-sm rounded-full" />
//               </span>{' '}
//               for you
//             </h1>

//             <p className="text-[18px] text-[#424242] leading-relaxed mb-8 max-w-[90%] font-medium">
//               See personalised recommendations crafted around your interests,
//               abilities, and long-term career ambitions.
//             </p>

//             <div className="flex gap-4 mb-10">
//               {/* Buttons */}
//               <div className="flex gap-4 flex-wrap">
//                 <Button
//                   size="lg"
//                   className="bg-primary hover:bg-primary/90 text-white px-8 h-14 text-base font-medium border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-full"
//                 >
//                   Enroll Now
//                 </Button>
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="bg-white text-foreground border-2 border-black px-8 h-14 text-base font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-full flex items-center gap-2"
//                 >
//                   Learn More
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </Button>
//               </div>
//             </div>

//             {/* Stats - More Compact */}
//             <div className="flex gap-5 flex-wrap">
//               <div className="bg-white/90 backdrop-blur-sm border-2 border-[#E1BEE7] rounded-[20px] px-6 py-3 shadow-lg hover:-translate-y-1 transition-all">
//                 <div className="bg-[#CE93D8] text-white text-[9px] font-semibold px-6 py-0.5 rounded-full mb-1 inline-block">
//                   e-learning
//                 </div>
//                 <div className="text-[11px] text-[#757575]">subjects</div>
//                 <div className="text-[28px] font-black">+40</div>
//               </div>

//               <div className="bg-gradient-to-br from-[#CE93D8] to-[#BA68C8] rounded-[20px] px-8 py-3 shadow-lg hover:-translate-y-1 transition-all">
//                 <div className="bg-[#FFC107] text-black text-[9px] font-semibold px-3 py-0.5 rounded-full mb-1 inline-block">
//                   Online
//                 </div>
//                 <div className="text-[11px] text-white/80">courses</div>
//                 <div className="text-[28px] font-black text-white">+120</div>
//               </div>

//               <div className="bg-gradient-to-br from-[#FFC107] to-[#FFB300] rounded-[20px] px-6 py-3 shadow-lg hover:-translate-y-1 transition-all">
//                 <div className="text-white text-[12px]">★★★★★ 5.0</div>
//                 <div className="text-[11px] text-[#424242]">
//                   learner reviews
//                 </div>
//                 <div className="text-[28px] font-black">+180k</div>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT IMAGE */}
//           <div className="relative h-[500px] hidden lg:flex items-center justify-center">
//             <div className="absolute w-[500px] h-[500px] rounded-full bg-[#FF6947]/10 blur-[90px]" />
//             <img
//               src={heropng}
//               alt="Hero"
//               className="relative w-[180%] max-w-none object-contain drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]"
//             />
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
//       `}</style>
//     </section>
//   );
// }
