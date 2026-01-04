import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import heropng from '../asset/h1.png';

export default function HeroSection() {
  const { t, i18n } = useTranslation('pages');
  const isBangla = i18n.language === 'bn';

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-6 lg:px-16 pt-6 pb-16 relative">
        {/* 65% Left / 35% Right Layout */}
        <div className="grid lg:grid-cols-[60%_40%] gap-5 items-center">
          {/* LEFT CONTENT */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-200 z-20 `}
          >
            <div className="space-y-4">
              <h1
                className={`text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight ${
                  isBangla ? 'font-bangla' : ''
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
                className={`text-xl text-gray-600 leading-relaxed max-w-xl font-medium ${
                  isBangla ? 'font-bangla' : ''
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
            <div className="flex gap-4 mb-10">
              <button
                className={`bg-primary text-white text-[15px] font-semibold px-7 py-3 rounded-xl transition-all duration-200 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] ${
                  isBangla ? 'font-bangla' : ''
                }`}
              >
                {t('home.hero.findCourse')}
              </button>

              <button
                className={`text-foreground bg-white border-2 border-black flex items-center gap-2 text-[15px] font-semibold px-5 py-3 rounded-xl transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] group ${
                  isBangla ? 'font-bangla' : ''
                }`}
              >
                {t('home.hero.viewBlog')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Stats - More Compact */}
            <div className="flex gap-5 flex-wrap">
              <div className="bg-white/90 backdrop-blur-sm border-2 border-black rounded-2xl px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">
                <div
                  className={`bg-primary text-white text-[9px] font-semibold px-6 py-0.5 rounded-full mb-1 inline-block border-2 border-black ${
                    isBangla ? 'font-bangla' : ''
                  }`}
                >
                  e-learning
                </div>
                <div
                  className={`text-[11px] text-[#757575] ${
                    isBangla ? 'font-bangla' : ''
                  }`}
                >
                  {t('home.hero.stats.subjects')}
                </div>
                <div className="text-[28px] font-black">+40</div>
              </div>

              <div className="bg-primary rounded-2xl px-8 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">
                <div
                  className={`bg-yellow-400 text-black text-[9px] font-semibold px-3 py-0.5 rounded-full mb-1 inline-block border border-black ${
                    isBangla ? 'font-bangla' : ''
                  }`}
                >
                  Online
                </div>
                <div
                  className={`text-[11px] text-white/90 ${
                    isBangla ? 'font-bangla' : ''
                  }`}
                >
                  {t('home.hero.stats.courses')}
                </div>
                <div className="text-[28px] font-black text-white">+120</div>
              </div>

              <div className="bg-yellow-400 rounded-2xl px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">
                <div className="text-black text-[12px] font-bold">
                  ★★★★★ 5.0
                </div>
                <div
                  className={`text-[11px] text-[#424242] font-medium ${
                    isBangla ? 'font-bangla' : ''
                  }`}
                >
                  {t('home.hero.stats.reviews')}
                </div>
                <div className="text-[28px] font-black">+180k</div>
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
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
}
