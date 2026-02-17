import {
  ArrowRight,
  Badge,
  Building2,
  Globe2,
  GraduationCap,
  Briefcase,
} from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'wouter';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

export default function TopCourse() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t, i18n } = useTranslation('pages');
  const isBangla = i18n.language === 'bn';

  const services = [
    {
      icon: Building2,
      titleKey: 'services.items.corporateTraining.title',
      descKey: 'services.items.corporateTraining.desc',
    },
    {
      icon: Globe2,
      titleKey: 'services.items.foreignJob.title',
      descKey: 'services.items.foreignJob.desc',
    },
    {
      icon: GraduationCap,
      titleKey: 'services.items.languageTraining.title',
      descKey: 'services.items.languageTraining.desc',
    },
    {
      icon: Briefcase,
      titleKey: 'services.items.careerSupport.title',
      descKey: 'services.items.careerSupport.desc',
    },
  ];

  return (
    <section className="relative py-12 sm:py-24 bg-background px-4 sm:px-6 lg:px-20">
      <div className="absolute top-12 right-12 w-72 h-72 bg-primary/5 rounded-full blur-3xl hidden sm:block" />
      <div className="absolute bottom-12 left-12 w-96 h-96 bg-primary/3 rounded-full blur-3xl hidden sm:block" />

      <div className="relative container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          {/* Left Content */}
          <div>
            <div className="inline-block mb-8">
              <span className={`text-sm font-medium text-primary tracking-wider uppercase border-b-2 border-primary pb-1 ${isBangla ? 'font-bangla' : ''}`}>
                {t('services.badge')}
              </span>
            </div>

            <h2 className={`text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-[1.1] tracking-tight ${isBangla ? 'font-bangla' : ''}`}>
              {t('services.title')} <span className="text-primary">{t('services.titleHighlight')}</span>
              <br />
              <span className="text-foreground/60">{t('services.titleEnd')}</span>
            </h2>

            <p className={`text-base sm:text-lg text-foreground/60 mb-8 sm:mb-12 max-w-lg leading-relaxed ${isBangla ? 'font-bangla' : ''}`}>
              {t('services.description')}
            </p>

            {/* Service Pills */}
            <div className="space-y-3 mb-8 sm:mb-14">
              {[
                'services.pills.corporateTraining',
                'services.pills.foreignJob',
                'services.pills.languageTraining',
                'services.pills.internship',
                'services.pills.higherStudy',
              ].map((key, i) => (
                <div key={i} className="inline-flex items-center mr-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                  <span className={`text-foreground/70 hover:text-foreground transition-colors cursor-default ${isBangla ? 'font-bangla' : ''}`}>
                    {t(key)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
              <Link href="/services">
                <Button
                  size="lg"
                  className={`bg-primary hover:bg-primary/90 text-white px-8 h-14 text-base font-medium border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${isBangla ? 'font-bangla' : ''}`}
                >
                  {t('services.exploreButton')}
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className={`bg-white text-foreground border-2 border-black px-8 h-14 text-base font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${isBangla ? 'font-bangla' : ''}`}
                >
                  {t('services.consultationButton')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Cards - Bento Grid Style */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-10">
            {services.map((item, i) => {
              const Icon = item.icon;
              const isActive = activeIndex === i;

              // tighter editorial offsets
              const offsets = ['sm:mt-0', 'sm:mt-10', 'sm:mt-4', 'sm:mt-12'];

              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={`group relative transition-all duration-300 mt-0 ${offsets[i]}`}
                >
                  {/* Ambient Accent */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition`}
                  />

                  {/* Card */}
                  <div
                    className={`relative bg-white/95 backdrop-blur-lg border-2 border-black rounded-2xl p-6 transition-all
                      ${
                        isActive
                          ? 'shadow-[8px_8px_0px_0px_rgba(127,61,138,1)] -translate-y-1'
                          : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                      }`}
                  >
                    {/* Micro corner detail */}
                    <div className="absolute top-3 right-3 w-3 h-3 bg-primary" />

                    <div
                      className={`w-12 h-12 mb-4 rounded-xl border-2 border-black flex items-center justify-center transition
            ${isActive ? 'bg-primary text-white' : 'bg-white text-foreground'}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <h4 className={`font-semibold text-lg mb-1.5 text-primary ${isBangla ? 'font-bangla' : ''}`}>
                      {t(item.titleKey)}
                    </h4>

                    <p className={`text-sm text-foreground/70 leading-relaxed ${isBangla ? 'font-bangla' : ''}`}>
                      {t(item.descKey)}
                    </p>

                    <div
                      className={`mt-3 inline-flex items-center text-primary text-sm font-medium transition
            ${isActive ? 'opacity-100 translate-x-1' : 'opacity-0'} ${isBangla ? 'font-bangla' : ''}`}
                    >
                      {t('services.learnMore')} <ArrowRight className="ml-1 w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
