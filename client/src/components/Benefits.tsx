import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Award,
  Wrench,
  Briefcase,
  Compass,
  Users,
  Globe,
  Clock,
  Building2,
  GraduationCap,
} from 'lucide-react';

const ICONS = [
  Award,
  Wrench,
  Briefcase,
  Compass,
  Users,
  Globe,
  Clock,
  Building2,
  GraduationCap,
];

const CARD_COLORS = [
  { bg: 'bg-orange-50', iconBg: 'bg-orange-100', icon: 'text-orange-600', border: 'border-orange-300' },
  { bg: 'bg-purple-50', iconBg: 'bg-purple-100', icon: 'text-purple-600', border: 'border-purple-300' },
  { bg: 'bg-yellow-50', iconBg: 'bg-yellow-100', icon: 'text-yellow-600', border: 'border-yellow-300' },
  { bg: 'bg-blue-50',   iconBg: 'bg-blue-100',   icon: 'text-blue-600',   border: 'border-blue-300'   },
  { bg: 'bg-green-50',  iconBg: 'bg-green-100',  icon: 'text-green-600',  border: 'border-green-300'  },
  { bg: 'bg-pink-50',   iconBg: 'bg-pink-100',   icon: 'text-pink-600',   border: 'border-pink-300'   },
  { bg: 'bg-indigo-50', iconBg: 'bg-indigo-100', icon: 'text-indigo-600', border: 'border-indigo-300' },
  { bg: 'bg-red-50',    iconBg: 'bg-red-100',    icon: 'text-red-600',    border: 'border-red-300'    },
  { bg: 'bg-teal-50',   iconBg: 'bg-teal-100',   icon: 'text-teal-600',   border: 'border-teal-300'   },
];

export default function Benefits() {
  const { t, i18n } = useTranslation('common');
  const isBangla = i18n.language === 'bn';

  const items = t('benefits.items', { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  return (
    <section className="py-16 bg-gradient-to-b from-orange-50/40 to-white px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-primary/20 ${isBangla ? 'font-bangla' : ''}`}
          >
            {t('benefits.sectionLabel')}
          </span>
          <h2
            className={`text-4xl md:text-5xl font-bold leading-tight mb-4 ${isBangla ? 'font-bangla' : ''}`}
          >
            {t('benefits.title')}{' '}
            <span className="text-primary">{t('benefits.titleHighlight')}</span>
          </h2>
          <p
            className={`text-foreground/70 max-w-2xl mx-auto text-lg leading-relaxed ${isBangla ? 'font-bangla' : ''}`}
          >
            {t('benefits.subtitle')}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(items) &&
            items.map((item, index) => {
              const Icon = ICONS[index % ICONS.length];
              const color = CARD_COLORS[index % CARD_COLORS.length];
              return (
                <div
                  key={index}
                  className={`${color.bg} rounded-2xl p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 group`}
                >
                  <div
                    className={`${color.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-black/10 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className={`w-6 h-6 ${color.icon}`} />
                  </div>
                  <h3
                    className={`font-bold text-lg text-gray-900 mb-2 leading-snug ${isBangla ? 'font-bangla' : ''}`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-foreground/65 text-sm leading-relaxed ${isBangla ? 'font-bangla' : ''}`}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
