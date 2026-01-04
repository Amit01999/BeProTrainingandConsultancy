import React from 'react';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

export default function FinalCTA() {
  const { t, i18n } = useTranslation('common');
  const isBangla = i18n.language === 'bn';

  return (
    <div>
      <section className="py-16 px-6 lg:px-20 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-secondary rounded-3xl p-12 lg:p-16 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            {/* Content */}
            <div className="text-center">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${isBangla ? 'font-bangla' : ''}`}>
                {t('cta.title')}{' '}
                <span className="text-primary">{t('cta.titleHighlight')}</span>
              </h2>
              <p className={`text-foreground/70 mb-10 text-lg leading-relaxed ${isBangla ? 'font-bangla' : ''}`}>
                {t('cta.description')} {t('cta.with')}{' '}
                <span className="font-semibold">
                  {t('cta.company')}
                </span>
                .
              </p>

              <Button
                size="lg"
                className={`bg-primary border-2 border-black text-white px-10 h-14 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-full ${isBangla ? 'font-bangla' : ''}`}
              >
                {t('buttons.applyNow')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
