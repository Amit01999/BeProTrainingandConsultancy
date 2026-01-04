import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import heropng from '../asset/h1.png';

export default function HeroSection() {
  const { t, i18n } = useTranslation('pages');
  const isBangla = i18n.language === 'bn';

  return (
    <section className="relative lg:min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-6 lg:px-16 pt-6 pb-20 max-sm:pb-24 relative">
        {/* 65% Left / 35% Right Layout */}
        <div className="grid lg:grid-cols-[60%_40%] gap-5 items-center">
          {/* LEFT CONTENT */}
          <div
            className={`space-y-8 lg:transition-opacity lg:duration-1000 lg:delay-200 z-20 transform-gpu`}
          >
            <div className={`space-y-4 ${isBangla ? 'max-sm:space-y-4' : ''}`}>
              <h1
                className={`text-7xl max-sm:text-7xl max-sm:font-bold lg:text-8xl font-black leading-[0.95] max-sm:leading-tight tracking-tight ${
                  isBangla
                    ? 'font-bangla max-sm:leading-[1.15] max-sm:tracking-normal'
                    : ''
                }`}
              >
                <span className="text-gray-900"> {t('home.hero.title')}</span>
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
                    {t('home.hero.titleHighlight')}
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
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%">
                        <stop offset="0%" stopColor="#FF5722" />
                        <stop offset="50%" stopColor="#E91E63" />
                        <stop offset="100%" stopColor="#CE93D8" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>

                <span className="text-gray-900">
                  {' '}
                  {t('home.hero.titleEnd')}
                </span>
              </h1>

              <p
                className={`text-xl max-sm:text-base text-gray-600 leading-relaxed max-sm:leading-relaxed max-w-xl font-medium ${
                  isBangla
                    ? 'font-bangla max-sm:leading-[1.7] max-sm:tracking-normal'
                    : ''
                }`}
              >
                {t('home.hero.subtitle')}
                <span className="text-orange-600 font-semibold">
                  {' '}
                  {t('home.hero.transformSkills')}
                </span>{' '}
                {t('home.hero.description')}
              </p>
            </div>

            {/* CTA */}
            <div
              className={`flex gap-4 mb-10 max-sm:flex-col max-sm:gap-5 ${
                isBangla ? 'max-sm:mt-4' : ''
              }`}
            >
              <button
                className={`bg-primary text-white text-[15px] max-sm:text-sm font-semibold px-7 max-sm:px-6 py-3 max-sm:py-2.5 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-sm:w-full max-sm:justify-center transform-gpu lg:transition-[box-shadow,transform] lg:duration-200 lg:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] lg:hover:translate-x-[2px] lg:hover:translate-y-[2px] active:scale-95 ${
                  isBangla ? 'font-bangla max-sm:text-[13px]' : ''
                }`}
              >
                {t('home.hero.findCourse')}
              </button>

              <button
                className={`text-foreground bg-white border-2 border-black flex items-center justify-center gap-2 text-[15px] max-sm:text-sm font-semibold px-5 max-sm:px-6 py-3 max-sm:py-2.5 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group max-sm:w-full transform-gpu lg:transition-[box-shadow,transform] lg:duration-200 lg:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] lg:hover:translate-x-[2px] lg:hover:translate-y-[2px] active:scale-95 ${
                  isBangla ? 'font-bangla max-sm:text-[13px]' : ''
                }`}
              >
                {t('home.hero.viewBlog')}
                <ArrowRight className="w-4 h-4 max-sm:w-3.5 max-sm:h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* Stats - More Compact */}
            <div
              className={`flex gap-5 flex-wrap max-sm:gap-3 ${
                isBangla ? 'max-sm:mt-2' : ''
              }`}
            >
              <div className="bg-white max-sm:bg-white lg:bg-white/90 lg:backdrop-blur-sm border-2 border-black rounded-2xl px-6 max-sm:px-4 py-3 max-sm:py-2.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform-gpu lg:transition-[box-shadow,transform] lg:duration-300 lg:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:hover:-translate-y-1 active:scale-95">
                <div
                  className={`bg-primary text-white text-[9px] max-sm:text-[8px] font-semibold px-6 max-sm:px-4 py-0.5 rounded-full mb-1 inline-block border-2 border-black ${
                    isBangla ? 'font-bangla max-sm:leading-tight' : ''
                  }`}
                >
                  e-learning
                </div>
                <div
                  className={`text-[11px] max-sm:text-[10px] text-[#757575] ${
                    isBangla
                      ? 'font-bangla max-sm:leading-tight max-sm:mb-0.5'
                      : ''
                  }`}
                >
                  {t('home.hero.stats.subjects')}
                </div>
                <div className="text-[28px] max-sm:text-[24px] font-black">
                  +40
                </div>
              </div>

              <div className="bg-primary rounded-2xl px-8 max-sm:px-5 py-3 max-sm:py-2.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform-gpu lg:transition-[box-shadow,transform] lg:duration-300 lg:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:hover:-translate-y-1 active:scale-95">
                <div
                  className={`bg-yellow-400 text-black text-[9px] max-sm:text-[8px] font-semibold px-3 py-0.5 rounded-full mb-1 inline-block border border-black ${
                    isBangla ? 'font-bangla max-sm:leading-tight' : ''
                  }`}
                >
                  Online
                </div>
                <div
                  className={`text-[11px] max-sm:text-[10px] text-white/90 ${
                    isBangla
                      ? 'font-bangla max-sm:leading-tight max-sm:mb-0.5'
                      : ''
                  }`}
                >
                  {t('home.hero.stats.courses')}
                </div>
                <div className="text-[28px] max-sm:text-[24px] font-black text-white">
                  +120
                </div>
              </div>

              <div className="bg-yellow-400 rounded-2xl px-6 max-sm:px-4 py-3 max-sm:py-2.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform-gpu lg:transition-[box-shadow,transform] lg:duration-300 lg:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:hover:-translate-y-1 active:scale-95">
                <div className="text-black text-[12px] max-sm:text-[11px] font-bold max-sm:leading-tight">
                  ★★★★★ 5.0
                </div>
                <div
                  className={`text-[11px] max-sm:text-[10px] text-[#424242] font-medium ${
                    isBangla
                      ? 'font-bangla max-sm:leading-tight max-sm:mb-0.5'
                      : ''
                  }`}
                >
                  {t('home.hero.stats.reviews')}
                </div>
                <div className="text-[28px] max-sm:text-[24px] font-black">
                  +180k
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT SIDE IMAGE (Replaces Stats Cards) */}
          <div
            className={`relative h-[600px] hidden lg:flex items-center justify-center transition-all duration-1000 delay-400 `}
          >
            <div className="absolute  w-[800px] h-[800px] rounded-full bg-[#FF8A65]/15 blur-[90px] " />
            <img
              src={heropng}
              alt="Hero"
              className=" mt-20 relative scale-[2.0] w-[200%] max-w-none object-contain drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          className="w-full h-auto"
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1) translateZ(0);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05) translateZ(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateZ(0);
          }
          50% {
            transform: translateY(-12px) translateZ(0);
          }
        }

        /* GPU acceleration for better mobile performance */
        .transform-gpu {
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          perspective: 1000px;
          -webkit-perspective: 1000px;
        }
      `}</style>
    </section>
  );
}
