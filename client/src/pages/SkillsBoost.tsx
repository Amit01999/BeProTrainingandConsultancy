import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Lightbulb, Users, MessageCircle, Target } from 'lucide-react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';

export default function SkillsBoost() {
  const { t, i18n } = useTranslation('pages');
  const isBangla = i18n.language === 'bn';
  const skills = [
    {
      name: 'Communication',
      nameBn: 'যোগাযোগ',
      description:
        'Master verbal and written communication skills for professional success.',
      descriptionBn:
        'পেশাদার সাফল্যের জন্য মৌখিক এবং লিখিত যোগাযোগ দক্ষতা আয়ত্ত করুন।',
      icon: '💬',
    },
    {
      name: 'Public Speaking',
      nameBn: 'পাবলিক স্পিকিং',
      description:
        'Develop confidence to present ideas and speak in front of audiences.',
      descriptionBn:
        'দর্শকদের সামনে ধারণা উপস্থাপন করতে আত্মবিশ্বাস বিকাশ করুন।',
      icon: '🎤',
    },
    {
      name: 'Teamwork',
      nameBn: 'টিমওয়ার্ক',
      description:
        'Learn to collaborate effectively and contribute to team success.',
      descriptionBn:
        'কার্যকরভাবে সহযোগিতা করতে এবং দলের সাফল্যে অবদান রাখতে শিখুন।',
      icon: '🤝',
    },
    {
      name: 'Problem Solving',
      nameBn: 'সমস্যা সমাধান',
      description:
        'Develop analytical skills to identify and solve complex problems.',
      descriptionBn:
        'জটিল সমস্যা চিহ্নিত করতে এবং সমাধান করতে বিশ্লেষণাত্মক দক্ষতা বিকাশ করুন।',
      icon: '🧩',
    },
    {
      name: 'Critical Thinking',
      nameBn: 'ক্রিটিক্যাল থিংকিং',
      description:
        'Enhance your ability to analyze information and make sound decisions.',
      descriptionBn: 'তথ্য বিশ্লেষণ এবং সঠিক সিদ্ধান্ত নেওয়ার ক্ষমতা বাড়ান।',
      icon: '🧠',
    },
    {
      name: 'Leadership',
      nameBn: 'লিডারশিপ',
      description:
        'Learn to inspire, motivate, and guide others towards common goals.',
      descriptionBn:
        'অন্যদের অনুপ্রাণিত করতে এবং সাধারণ লক্ষ্যের দিকে পরিচালিত করতে শিখুন।',
      icon: '👑',
    },
    {
      name: 'Emotional Intelligence',
      nameBn: 'ইমোশনাল ইন্টেলিজেন্স',
      description:
        'Understand and manage emotions for better relationships and decisions.',
      descriptionBn:
        'ভাল সম্পর্ক এবং সিদ্ধান্তের জন্য আবেগ বুঝুন এবং পরিচালনা করুন।',
      icon: '❤️',
    },
  ];

  const benefits = [
    'Practical, hands-on training approach',
    'Experienced industry trainers',
    'Real-world case studies',
    'Interactive workshops',
    'Certification upon completion',
    'Career counseling support',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#C27ACF' }}>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className={`text-5xl md:text-7xl font-display font-bold mb-6 text-white ${
                isBangla ? 'font-bangla' : ''
              }`}
            >
              {t('skillsBoostPage.hero.title')}
            </h1>
            <p
              className={`text-xl text-white/90 max-w-2xl mx-auto mb-10 ${
                isBangla ? 'font-bangla' : ''
              }`}
            >
              {t('skillsBoostPage.hero.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Background blobs */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-800/20 rounded-full blur-[100px] -translate-y-1/2" />
      </section>
      {/* Skills Progression - Clean Grid Layout */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container relative z-10 px-4 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge
              variant="secondary"
              className={`mb-4 ${isBangla ? 'font-bangla' : ''}`}
            >
              {t('skillsBoostPage.progression.badge')}
            </Badge>
            <h2
              className={`text-3xl md:text-5xl font-bold mb-4 ${
                isBangla ? 'font-bangla' : ''
              }`}
            >
              {t('skillsBoostPage.progression.title')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
                {t('skillsBoostPage.progression.titleHighlight')}
              </span>
            </h2>
            <p
              className={`text-slate-600 text-lg max-w-2xl mx-auto ${
                isBangla ? 'font-bangla' : ''
              }`}
            >
              {t('skillsBoostPage.progression.description')}
            </p>
          </motion.div>

          {/* Clean Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {skills.map((skill, index) => {
              const colorSchemes = [
                {
                  accent: 'border-orange-500',
                  bg: 'bg-orange-50',
                  text: 'text-orange-600',
                  icon: 'bg-gradient-to-br from-orange-500 to-orange-600',
                  shadow: 'shadow-orange-500/20',
                },
                {
                  accent: 'border-blue-500',
                  bg: 'bg-blue-50',
                  text: 'text-blue-600',
                  icon: 'bg-gradient-to-br from-blue-500 to-blue-600',
                  shadow: 'shadow-blue-500/20',
                },
                {
                  accent: 'border-purple-500',
                  bg: 'bg-purple-50',
                  text: 'text-purple-600',
                  icon: 'bg-gradient-to-br from-purple-500 to-purple-600',
                  shadow: 'shadow-purple-500/20',
                },
                {
                  accent: 'border-green-500',
                  bg: 'bg-green-50',
                  text: 'text-green-600',
                  icon: 'bg-gradient-to-br from-green-500 to-green-600',
                  shadow: 'shadow-green-500/20',
                },
                {
                  accent: 'border-rose-500',
                  bg: 'bg-rose-50',
                  text: 'text-rose-600',
                  icon: 'bg-gradient-to-br from-rose-500 to-rose-600',
                  shadow: 'shadow-rose-500/20',
                },
                {
                  accent: 'border-indigo-500',
                  bg: 'bg-indigo-50',
                  text: 'text-indigo-600',
                  icon: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
                  shadow: 'shadow-indigo-500/20',
                },
                {
                  accent: 'border-teal-500',
                  bg: 'bg-teal-50',
                  text: 'text-teal-600',
                  icon: 'bg-gradient-to-br from-teal-500 to-teal-600',
                  shadow: 'shadow-teal-500/20',
                },
              ];
              const scheme = colorSchemes[index % colorSchemes.length];

              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                >
                  <Card
                    className={`group relative overflow-hidden border-2 ${scheme.accent} hover:shadow-2xl ${scheme.shadow} transition-all duration-300 bg-white h-full`}
                  >
                    <div className="p-6">
                      {/* Icon and Level Badge */}
                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`flex-shrink-0 w-16 h-16 rounded-2xl ${scheme.icon} flex items-center justify-center text-3xl shadow-lg`}
                        >
                          {skill.icon}
                        </motion.div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-bold ${scheme.bg} ${scheme.text} border-2 ${scheme.accent}`}
                        >
                          Level {index + 1}
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-xl font-bold text-slate-900 mb-3 ${
                          isBangla ? 'font-bangla' : ''
                        }`}
                      >
                        {isBangla ? skill.nameBn : skill.name}
                      </h3>

                      {/* Description */}
                      <p
                        className={`text-sm text-slate-600 leading-relaxed mb-4 ${
                          isBangla ? 'font-bangla' : ''
                        }`}
                      >
                        {isBangla ? skill.descriptionBn : skill.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-medium ${scheme.text}`}>
                            Progress
                          </span>
                          <span className={`text-xs font-bold ${scheme.text}`}>
                            {Math.round(((index + 1) / skills.length) * 100)}%
                          </span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${scheme.icon} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${
                                ((index + 1) / skills.length) * 100
                              }%`,
                            }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: index * 0.1 + 0.3,
                              ease: 'easeOut',
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Hover Gradient Overlay */}
                    <div
                      className={`absolute inset-0 ${scheme.icon} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    />
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Achievement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 blur-xl opacity-50 rounded-2xl" />

              {/* Badge content */}
              <div className="relative inline-flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl shadow-2xl border-2 border-white/20">
                <span className="text-4xl">🏆</span>
                <div>
                  <div
                    className={`font-bold text-lg ${
                      isBangla ? 'font-bangla' : ''
                    }`}
                  >
                    {isBangla ? 'সম্পূর্ণ দক্ষতা অর্জন' : 'Complete Mastery'}
                  </div>
                  <div
                    className={`text-sm opacity-90 ${
                      isBangla ? 'font-bangla' : ''
                    }`}
                  >
                    {isBangla ? '৭টি দক্ষতা আয়ত্ত করুন' : '7 Skills Unlocked'}
                  </div>
                </div>
                <span className="text-4xl">✨</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Features */}
      <section className="py-24 px-6 lg:px-20 bg-[#F7F7F5]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Lightbulb,
                titleKey:
                  'skillsBoostPage.features.emotionalIntelligence.title',
                descKey: 'skillsBoostPage.features.emotionalIntelligence.desc',
              },
              {
                icon: Users,
                titleKey: 'skillsBoostPage.features.leadership.title',
                descKey: 'skillsBoostPage.features.leadership.desc',
              },
              {
                icon: MessageCircle,
                titleKey: 'skillsBoostPage.features.communication.title',
                descKey: 'skillsBoostPage.features.communication.desc',
              },
              {
                icon: Target,
                titleKey: 'skillsBoostPage.features.problemSolving.title',
                descKey: 'skillsBoostPage.features.problemSolving.desc',
              },
            ].map((skill, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 text-center border border-slate-100"
              >
                <div className="inline-flex p-4 bg-orange-50 rounded-full text-primary mb-6">
                  <skill.icon className="h-8 w-8" />
                </div>
                <h3
                  className={`text-xl font-bold font-display mb-3 text-slate-900 ${
                    isBangla ? 'font-bangla' : ''
                  }`}
                >
                  {t(skill.titleKey)}
                </h3>
                <p
                  className={`text-slate-500 ${isBangla ? 'font-bangla' : ''}`}
                >
                  {t(skill.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2
                className={`text-3xl font-display font-bold mb-6 ${
                  isBangla ? 'font-bangla' : ''
                }`}
              >
                {t('skillsBoostPage.whySoftSkills.title')}
              </h2>
              <p
                className={`text-slate-600 mb-6 text-lg ${
                  isBangla ? 'font-bangla' : ''
                }`}
              >
                {t('skillsBoostPage.whySoftSkills.description')}
              </p>
              <ul className="space-y-4 mb-8">
                <li
                  className={`flex items-center gap-3 text-slate-700 ${
                    isBangla ? 'font-bangla' : ''
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />{' '}
                  {t('skillsBoostPage.whySoftSkills.stats.jobSuccess')}
                </li>
                <li
                  className={`flex items-center gap-3 text-slate-700 ${
                    isBangla ? 'font-bangla' : ''
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />{' '}
                  {t('skillsBoostPage.whySoftSkills.stats.management')}
                </li>
                <li
                  className={`flex items-center gap-3 text-slate-700 ${
                    isBangla ? 'font-bangla' : ''
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />{' '}
                  {t('skillsBoostPage.whySoftSkills.stats.collaboration')}
                </li>
              </ul>
              <Link href="/courses">
                <Button
                  size="lg"
                  className={`bg-slate-900 text-white hover:bg-slate-800 ${
                    isBangla ? 'font-bangla' : ''
                  }`}
                >
                  {t('skillsBoostPage.whySoftSkills.button')}
                </Button>
              </Link>
            </div>
            <div className="flex-1">
              {/* Unsplash image for teamwork/leadership */}
              {/* group of professionals brainstorming on a whiteboard */}
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Team Collaboration"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
