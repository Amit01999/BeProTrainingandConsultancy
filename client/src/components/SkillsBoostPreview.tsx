import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const skills = [
  { name: 'Communication', nameBn: 'যোগাযোগ', level: 1 },
  { name: 'Public Speaking', nameBn: 'পাবলিক স্পিকিং', level: 2 },
  { name: 'Teamwork', nameBn: 'টিমওয়ার্ক', level: 3 },
  { name: 'Problem Solving', nameBn: 'সমস্যা সমাধান', level: 4 },
  { name: 'Critical Thinking', nameBn: 'ক্রিটিক্যাল থিংকিং', level: 5 },
  { name: 'Leadership', nameBn: 'লিডারশিপ', level: 6 },
  { name: 'Emotional Intelligence', nameBn: 'ইমোশনাল ইন্টেলিজেন্স', level: 7 },
];

const SkillsBoostPreview = () => {
  const { t, i18n } = useTranslation('pages');
  const isBangla = i18n.language === 'bn';

  return (
    <section className="py-16 bg-muted/50 px-6 lg:px-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <Badge variant="secondary" className={`mb-4 ${isBangla ? 'font-bangla' : ''}`}>
              <Sparkles className="h-3 w-3 mr-1" />
              {t('home.skillsBoost.badge')}
            </Badge>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isBangla ? 'font-bangla' : ''}`}>
              {t('home.skillsBoost.title')} <span className="text-gradient">{t('home.skillsBoost.titleHighlight')}</span>{' '}
              {t('home.skillsBoost.titleEnd')}
            </h2>
            <p className={`text-lg text-muted-foreground mb-6 ${isBangla ? 'font-bangla' : ''}`}>
              {t('home.skillsBoost.tagline')}
            </p>
            <p className={`text-muted-foreground mb-8 ${isBangla ? 'font-bangla' : ''}`}>
              {t('home.skillsBoost.description')}
            </p>
            <Button
              className={`border border-black ${isBangla ? 'font-bangla' : ''}`}
              asChild
              variant="default"
              size="lg"
            >
              <Link to="/skillsboost">
                {t('home.skillsBoost.exploreButton')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Skills Pyramid */}
          <div className="relative">
            <div className="flex flex-col items-center gap-2">
              {[...skills].reverse().map((skill, index) => (
                <div
                  key={skill.name}
                  className="relative group"
                  style={{
                    width: `${100 - index * 10}%`,
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div
                    className={`
                      py-3 px-4 rounded-lg text-center transition-all duration-300
                      bg-primary text-primary-foreground border-2 border-black
                      shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1
                      ${index === 0 ? 'animate-pulse-glow' : ''}
                      ${isBangla ? 'font-bangla' : ''}
                    `}
                    // style={{
                    //   opacity: 0.6 + index * 0.057,
                    // }}
                  >
                    <span className="font-semibold text-sm md:text-base">
                      {isBangla ? skill.nameBn : skill.name}
                    </span>
                    {!isBangla && (
                      <span className="hidden md:inline text-xs opacity-80 ml-2 font-bangla">
                        ({skill.nameBn})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsBoostPreview;
