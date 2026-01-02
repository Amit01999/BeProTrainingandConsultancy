import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Lightbulb, Users, MessageCircle, Target } from 'lucide-react';
import { Link } from 'wouter';

export default function SkillsBoost() {
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
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500">
              SkillsBoost
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
              Go beyond technical skills. Master the soft skills that drive
              leadership, emotional intelligence, and professional excellence.
            </p>
          </motion.div>
        </div>

        {/* Background blobs */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2" />
      </section>
      {/* Skills Pyramid */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Skill Progression
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your <span className="text-gradient">Learning Journey</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Progress through carefully designed levels, each building upon the
              previous to create a complete professional skill set.
            </p>
          </div>

          {/* Skills Staircase */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="relative mb-4 animate-slide-up"
                  style={{
                    marginLeft: `${index * 2}%`,
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <Card className="p-6 hover:border-primary/50">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{skill.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">
                            {skill.name}
                          </h3>
                          <Badge
                            variant="outline"
                            className="font-bangla text-xs"
                          >
                            {skill.nameBn}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">
                          {skill.description}
                        </p>
                      </div>
                      <div className="text-2xl font-bold text-primary/20">
                        {index + 1}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Features */}
      <section className="py-24 px-6 lg:px-20 bg-[#F7F7F5]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Lightbulb,
                title: 'Emotional Intelligence',
                desc: 'Understand and manage emotions effectively.',
              },
              {
                icon: Users,
                title: 'Leadership',
                desc: 'Inspire teams and drive organizational success.',
              },
              {
                icon: MessageCircle,
                title: 'Communication',
                desc: 'Articulate ideas clearly and persuasively.',
              },
              {
                icon: Target,
                title: 'Problem Solving',
                desc: 'Navigate complex challenges with strategic thinking.',
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
                <h3 className="text-xl font-bold font-display mb-3 text-slate-900">
                  {skill.title}
                </h3>
                <p className="text-slate-500">{skill.desc}</p>
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
              <h2 className="text-3xl font-display font-bold mb-6">
                Why Soft Skills Matter?
              </h2>
              <p className="text-slate-600 mb-6 text-lg">
                In today's competitive job market, technical skills get you the
                interview, but soft skills get you the job—and the promotion.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-2 h-2 rounded-full bg-primary" /> 85% of job
                  success comes from soft skills
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-2 h-2 rounded-full bg-primary" /> Essential
                  for management roles
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-2 h-2 rounded-full bg-primary" /> Improves
                  workplace collaboration
                </li>
              </ul>
              <Link href="/courses">
                <Button
                  size="lg"
                  className="bg-slate-900 text-white hover:bg-slate-800"
                >
                  View SkillsBoost Courses
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
