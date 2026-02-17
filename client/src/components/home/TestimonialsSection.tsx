import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Testimonial {
  id: number;
  name: string;
  nameBn: string;
  roleKey: string;
  content: string;
  contentBn: string;
  course: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sabbir Hossain',
    nameBn: 'সাব্বির হোসেন',
    roleKey: 'testimonials.roles.graphicDesigner',
    content:
      'The NSDA-approved training completely transformed my career. I now work as a professional graphic designer at a leading agency.',
    contentBn:
      'এনএসডিএ অনুমোদিত প্রশিক্ষণ আমার ক্যারিয়ার সম্পূর্ণ বদলে দিয়েছে।',
    course: 'Graphic Design L-2',
  },
  {
    id: 2,
    name: 'Nusrat Jahan',
    nameBn: 'নুসরাত জাহান',
    roleKey: 'testimonials.roles.digitalMarketer',
    content:
      "BePro's digital marketing course gave me practical skills that I use every day. The trainers are extremely knowledgeable and supportive.",
    contentBn:
      'বিপ্রো এর ডিজিটাল মার্কেটিং কোর্স আমাকে প্রতিদিন ব্যবহার করার মতো দক্ষতা দিয়েছে।',
    course: 'Digital Marketing L-3',
  },
  {
    id: 3,
    name: 'Mehedi Hasan',
    nameBn: 'মেহেদী হাসান',
    roleKey: 'testimonials.roles.entrepreneur',
    content:
      'The entrepreneurship development program helped me start my own business. The soft skills training was invaluable.',
    contentBn:
      'উদ্যোক্তা উন্নয়ন প্রোগ্রাম আমাকে নিজের ব্যবসা শুরু করতে সাহায্য করেছে।',
    course: 'Entrepreneurship',
  },
  {
    id: 4,
    name: 'Tanjila Akter',
    nameBn: 'তানজিলা আক্তার',
    roleKey: 'testimonials.roles.corporateTrainer',
    content:
      'After completing the SkillsBoost program, I became a certified soft skills trainer myself. This program changed my life.',
    contentBn:
      'স্কিলসবুস্ট প্রোগ্রাম সম্পন্ন করার পর আমি নিজেই একজন প্রশিক্ষক হয়ে গেছি।',
    course: 'SkillsBoost',
  },
];

const TestimonialsSection = () => {
  const { t, i18n } = useTranslation('pages');
  const isBangla = i18n.language === 'bn';
  const [current, setCurrent] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent(prev => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/20 via-secondary/20 to-[#FFBE06]/20 rounded-full blur-3xl" />

      <div className="container relative z-10 text-center mb-16">
        <Badge
          variant="secondary"
          className={`mb-4 text-sm ${isBangla ? 'font-bangla' : ''}`}
        >
          {t('testimonials.badge')}
        </Badge>
        <h2
          className={`text-3xl md:text-5xl font-bold mb-4 ${isBangla ? 'font-bangla' : ''}`}
        >
          {t('testimonials.title')}{' '}
          <span className="text-gradient">
            {t('testimonials.titleHighlight')}
          </span>{' '}
          {t('testimonials.titleEnd')}
        </h2>
      </div>

      <div className="relative flex justify-center items-center">
        {/* Previous Button */}
        <button
          onClick={prev}
          className="h-12 w-12 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mr-8"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Card container */}
        <div className="w-full max-w-3xl relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 md:p-10 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-0">
                  <Quote className="h-12 w-12 text-primary/30 mb-4" />
                  <blockquote
                    className={`text-lg mb-6 leading-relaxed ${isBangla ? 'font-bangla' : ''}`}
                  >
                    "
                    {isBangla
                      ? testimonials[current].contentBn
                      : testimonials[current].content}
                    "
                  </blockquote>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div>
                      <div
                        className={`font-semibold text-lg ${isBangla ? 'font-bangla' : ''}`}
                      >
                        {isBangla
                          ? testimonials[current].nameBn
                          : testimonials[current].name}
                      </div>
                      <div
                        className={`text-sm text-primary mt-1.5 font-medium ${isBangla ? 'font-bangla' : ''}`}
                      >
                        {t(testimonials[current].roleKey)} •{' '}
                        {testimonials[current].course}
                      </div>
                    </div>
                    <Badge
                      className={`text-sm px-4 py-1.5 ${isBangla ? 'font-bangla' : ''}`}
                    >
                      {testimonials[current].course}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <button
          onClick={next}
          className="h-12 w-12 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ml-8"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === current
                ? 'w-10 bg-gradient-to-r from-primary to-secondary scale-110'
                : 'w-2.5 bg-border hover:bg-primary/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
