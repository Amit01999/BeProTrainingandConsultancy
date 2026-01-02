import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';

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
    descriptionBn: 'দর্শকদের সামনে ধারণা উপস্থাপন করতে আত্মবিশ্বাস বিকাশ করুন।',
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

const SkillsBoostPage = () => {
  return (
    <div>
      <section className=" bg-[#C27ACF] text-primary-foreground relative overflow-hidden container mx-auto px-4 z-10 text-center">
        <div className="container py-20 px-4 z-10 text-center">
          <div className="absolute top-10 right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
          <div className="container relative  z-10">
            <div className="">
              <Badge className="mb-4">
                <Sparkles className="h-3 w-3 mr-1" />
                Signature Program
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                SkillsBoost <span className="text-accent">Soft Skills</span>{' '}
                Program
              </h1>
              <p className="text-xl opacity-90 font-bangla mb-4">
                শুরু করুন আপনার সফটস্কিলস শেখার যাত্রা
              </p>
              <p className="text-lg opacity-80">
                Build the essential soft skills that employers value most. Our
                comprehensive program takes you from foundational communication
                to advanced leadership.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-6 px-6 lg:px-20 bg-[#F7F7F5] ">
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
                Progress through carefully designed levels, each building upon
                the previous to create a complete professional skill set.
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
      </section>
      {/* Benefits */}
      <section className="py-20 bg-muted/50">
        <div className="container px-6 lg:px-20 ">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Program <span className="text-gradient">Benefits</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Our SkillsBoost program is designed with your career success in
                mind, combining practical training with real-world applications.
              </p>
              <div className="space-y-4">
                {benefits.map(benefit => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
              <h3 className="text-2xl font-bold mb-4">Start Your Journey</h3>
              <p className="text-muted-foreground mb-6 font-bangla">
                আজই আপনার সফটস্কিলস উন্নয়নের যাত্রা শুরু করুন এবং আপনার
                ক্যারিয়ারকে নতুন উচ্চতায় নিয়ে যান।
              </p>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold font-bangla">৭ দিন</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-muted-foreground">Class Time</span>
                  <span className="font-semibold font-bangla">
                    ৪ ঘন্টা ৩০ মিনিট/দিন
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-muted-foreground">Fee</span>
                  <span className="font-semibold text-primary">৳২,০০০</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-muted-foreground">Certificate</span>
                  <span className="font-semibold">Yes ✓</span>
                </div>
              </div>
              <Button asChild size="lg" className="w-full mt-6">
                <Link to="/contact">
                  Enroll Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillsBoostPage;
