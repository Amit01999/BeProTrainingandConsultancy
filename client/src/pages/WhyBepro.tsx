import React from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Award,
  Briefcase,
  Wrench,
  Zap,
  FileCheck,
  Gift,
  Globe,
  Users,
  Building2,
  TrendingUp,
  Layers,
  Target,
  Network,
  Code,
  Star,
  Shield,
  CheckCircle,
  Check,
  ArrowRight,
} from 'lucide-react';

type ReasonItem = {
  icon: React.ComponentType<{ className?: string }>;
  accent: string; // tailwind bg color for left border & icon bg
  iconColor: string; // tailwind text color for icon
  lightBg: string; // subtle card bg
  en: { title: string; bullets: string[] };
  bn: { title: string; bullets: string[] };
};

const REASONS: ReasonItem[] = [
  {
    icon: Award,
    accent: 'bg-orange-500',
    iconColor: 'text-orange-600',
    lightBg: 'bg-orange-50',
    en: {
      title: 'Government Approved & Certified Training',
      bullets: [
        'NSDA & Government Approved Training Institute',
        'Certificates recognized locally & internationally',
      ],
    },
    bn: {
      title: 'সরকারি অনুমোদিত ও সার্টিফাইড ট্রেনিং',
      bullets: [
        'NSDA ও সরকারি অনুমোদিত প্রশিক্ষণ প্রতিষ্ঠান',
        'দেশে ও বিদেশে সার্টিফিকেট গ্রহণযোগ্য',
      ],
    },
  },
  {
    icon: Briefcase,
    accent: 'bg-blue-500',
    iconColor: 'text-blue-600',
    lightBg: 'bg-blue-50',
    en: {
      title: 'Job Placement Cell (Real Career Support)',
      bullets: [
        'CV Review & Development — professionalizing your resume',
        'Mock Interviews — practice with a professional panel',
        'Job Referral Support — connecting you directly to employers',
        'Career Guidelines — full support from training to employment',
      ],
    },
    bn: {
      title: 'জব প্লেসমেন্ট সেল (প্রকৃত ক্যারিয়ার সাপোর্ট)',
      bullets: [
        'CV রিভিউ ও উন্নয়ন — জীবনবৃত্তান্ত পেশাদারভাবে তৈরি করা',
        'মক ইন্টারভিউ — প্রফেশনাল প্যানেলের মাধ্যমে প্রস্তুতি',
        'জব রেফারেল সাপোর্ট — সরাসরি নিয়োগকর্তার সাথে সংযোগ',
        'ক্যারিয়ার গাইডলাইন — প্রশিক্ষণ থেকে চাকরি পর্যন্ত পূর্ণাঙ্গ সাপোর্ট',
      ],
    },
  },
  {
    icon: Wrench,
    accent: 'bg-purple-500',
    iconColor: 'text-purple-600',
    lightBg: 'bg-purple-50',
    en: {
      title: '100% Practical & Industry-Based Training',
      bullets: [
        'Real Projects + Practical Work + Market-Based Skills',
        'Real Client Work Simulation',
        'Portfolio Development',
        'Industry-standard workflow training',
      ],
    },
    bn: {
      title: '১০০% প্র্যাকটিক্যাল ও ইন্ডাস্ট্রি ভিত্তিক ট্রেনিং',
      bullets: [
        'রিয়েল প্রজেক্ট + প্র্যাকটিক্যাল কাজ + মার্কেট ভিত্তিক স্কিল',
        'রিয়েল ক্লায়েন্ট ওয়ার্ক সিমুলেশন',
        'পোর্টফোলিও ডেভেলপমেন্ট',
        'ইন্ডাস্ট্রি স্ট্যান্ডার্ড কাজ শেখানো',
      ],
    },
  },
  {
    icon: Zap,
    accent: 'bg-yellow-500',
    iconColor: 'text-yellow-600',
    lightBg: 'bg-yellow-50',
    en: {
      title: 'Fast Career Ready Program',
      bullets: [
        'Job-ready in just 12 days',
        'Interview Skills & Communication',
        'Confidence Building',
      ],
    },
    bn: {
      title: 'ফাস্ট ক্যারিয়ার রেডি প্রোগ্রাম',
      bullets: [
        'মাত্র ১২ দিনেই জব-রেডি',
        'ইন্টারভিউ দক্ষতা ও যোগাযোগ',
        'আত্মবিশ্বাস বৃদ্ধি',
      ],
    },
  },
  {
    icon: FileCheck,
    accent: 'bg-green-500',
    iconColor: 'text-green-600',
    lightBg: 'bg-green-50',
    en: {
      title: 'Government RPL Certification (Experience → Certificate)',
      bullets: [
        'Certification through NSDA RPL',
        'Validation of existing experience',
        'Awarding of official government certificates',
      ],
    },
    bn: {
      title: 'সরকারি RPL সার্টিফিকেশন (অভিজ্ঞতা → সার্টিফিকেট)',
      bullets: [
        'NSDA RPL-এর মাধ্যমে সনদপত্র',
        'পূর্ব অভিজ্ঞতা যাচাই ও স্বীকৃতি',
        'সরকারি সার্টিফিকেট প্রদান',
      ],
    },
  },
  {
    icon: Gift,
    accent: 'bg-pink-500',
    iconColor: 'text-pink-600',
    lightBg: 'bg-pink-50',
    en: {
      title: 'Free Training Opportunity (ASSET Project)',
      bullets: [
        'Fully government-funded free training',
        'Allowance (Stipend) provided',
        'Government Certification upon completion',
      ],
    },
    bn: {
      title: 'ফ্রি ট্রেনিং সুবিধা (ASSET প্রজেক্ট)',
      bullets: [
        'সম্পূর্ণ সরকারি খরচে ফ্রি ট্রেনিং',
        'ভাতা (Allowance) প্রদানের সুবিধা',
        'সরকারি সার্টিফিকেট প্রদান',
      ],
    },
  },
  {
    icon: Globe,
    accent: 'bg-teal-500',
    iconColor: 'text-teal-600',
    lightBg: 'bg-teal-50',
    en: {
      title: 'Freelancing & Income Opportunity',
      bullets: [
        'Freelancing Marketplace guidance',
        'Online Income & Remote Work opportunities',
      ],
    },
    bn: {
      title: 'ফ্রিল্যান্সিং ও আয়ের সুযোগ',
      bullets: [
        'ফ্রিল্যান্সিং মার্কেটপ্লেস গাইডেন্স',
        'অনলাইন ইনকাম ও রিমোট ওয়ার্কের সুযোগ',
      ],
    },
  },
  {
    icon: Users,
    accent: 'bg-indigo-500',
    iconColor: 'text-indigo-600',
    lightBg: 'bg-indigo-50',
    en: {
      title: 'Expert Trainer Panel',
      bullets: [
        'Industry-experienced trainers',
        'Real-world work experience',
        'Practical, hands-on guidance',
      ],
    },
    bn: {
      title: 'দক্ষ ট্রেইনার প্যানেল',
      bullets: [
        'ইন্ডাস্ট্রিতে অভিজ্ঞ ট্রেইনার',
        'বাস্তব কাজের অভিজ্ঞতা সম্পন্ন মেন্টর',
        'হাতে-কলমে দিকনির্দেশনা',
      ],
    },
  },
  {
    icon: Building2,
    accent: 'bg-rose-500',
    iconColor: 'text-rose-600',
    lightBg: 'bg-rose-50',
    en: {
      title: 'Corporate & Professional Training Environment',
      bullets: [
        'Small Batches for personalized care',
        'Friendly learning atmosphere',
        'Offline + Online flexibility',
      ],
    },
    bn: {
      title: 'কর্পোরেট ও প্রফেশনাল পরিবেশ',
      bullets: [
        'ব্যক্তিগত যত্নের জন্য ছোট ছোট ব্যাচ',
        'বন্ধুসুলভ শেখার পরিবেশ',
        'অফলাইন + অনলাইন সুবিধা',
      ],
    },
  },
  {
    icon: TrendingUp,
    accent: 'bg-cyan-500',
    iconColor: 'text-cyan-600',
    lightBg: 'bg-cyan-50',
    en: {
      title: 'Career Growth Focused Training',
      bullets: [
        'Skill Development & Career Planning',
        'Job Placement Support',
        'A holistic career plan, not just a course',
      ],
    },
    bn: {
      title: 'ক্যারিয়ার গ্রোথ ফোকাসড ট্রেনিং',
      bullets: [
        'স্কিল ডেভেলপমেন্ট ও ক্যারিয়ার প্ল্যানিং',
        'জব প্লেসমেন্ট সাপোর্ট',
        'শুধু কোর্স নয়, পুরো ক্যারিয়ারের পরিকল্পনা',
      ],
    },
  },
  {
    icon: Layers,
    accent: 'bg-violet-500',
    iconColor: 'text-violet-600',
    lightBg: 'bg-violet-50',
    en: {
      title: 'Multi-Skill Learning Platform',
      bullets: [
        'IT & Soft Skills — everything in one place',
        'Language Training: English, German, Japanese, Korean',
        'Corporate Training',
      ],
    },
    bn: {
      title: 'মাল্টি-স্কিল লার্নিং প্ল্যাটফর্ম',
      bullets: [
        'IT ও সফট স্কিল — একই ছাদের নিচে সব সুবিধা',
        'ভাষা শিক্ষা: ইংরেজি, জার্মান, জাপানিজ, কোরিয়ান',
        'কর্পোরেট ট্রেনিং',
      ],
    },
  },
  {
    icon: Target,
    accent: 'bg-amber-500',
    iconColor: 'text-amber-600',
    lightBg: 'bg-amber-50',
    en: {
      title: 'Student Success-Oriented System',
      bullets: [
        "Our goal is not enrollment — it's student success",
        'Result-driven training',
        'Continuous support and career tracking',
      ],
    },
    bn: {
      title: 'স্টুডেন্ট সাকসেস ওরিয়েন্টেড সিস্টেম',
      bullets: [
        'আমাদের লক্ষ্য শুধু ভর্তি নয়, সাফল্য নিশ্চিত করা',
        'ফলাফল-মুখী প্রশিক্ষণ',
        'নিরবচ্ছিন্ন সাপোর্ট ও ক্যারিয়ার ট্র্যাকিং',
      ],
    },
  },
  {
    icon: Network,
    accent: 'bg-sky-500',
    iconColor: 'text-sky-600',
    lightBg: 'bg-sky-50',
    en: {
      title: 'Corporate Networking Opportunities',
      bullets: [
        'Connect with Company HRs',
        'Networking with industry professionals',
        'Access to Seminars & Career Events',
      ],
    },
    bn: {
      title: 'কর্পোরেট নেটওয়ার্কিং সুযোগ',
      bullets: [
        'বিভিন্ন কোম্পানির HR-দের সাথে যোগাযোগ',
        'ইন্ডাস্ট্রি প্রফেশনালদের সাথে নেটওয়ার্কিং',
        'সেমিনার ও ক্যারিয়ার ইভেন্টে অংশগ্রহণ',
      ],
    },
  },
  {
    icon: Code,
    accent: 'bg-lime-500',
    iconColor: 'text-lime-600',
    lightBg: 'bg-lime-50',
    en: {
      title: 'Live Project & Client Work Opportunities',
      bullets: [
        'Work on real client projects',
        'Gain live work experience and team collaboration',
        'Graduate as both Job-Ready and Experience-Ready',
      ],
    },
    bn: {
      title: 'লাইভ প্রজেক্ট ও ক্লায়েন্ট ওয়ার্ক সুবিধা',
      bullets: [
        'সরাসরি ক্লায়েন্ট প্রজেক্টে কাজ',
        'লাইভ কাজের অভিজ্ঞতা ও টিম কোলাবরেশন',
        'জব-রেডি ও এক্সপেরিয়েন্স-রেডি একসাথে',
      ],
    },
  },
  {
    icon: Star,
    accent: 'bg-fuchsia-500',
    iconColor: 'text-fuchsia-600',
    lightBg: 'bg-fuchsia-50',
    en: {
      title: 'Professional Grooming & Personality Development',
      bullets: [
        'Body Language & Communication Style',
        'Presentation Skills & Professional Behavior',
        'Corporate personality alongside technical skills',
      ],
    },
    bn: {
      title: 'প্রফেশনাল গ্রুমিং ও পার্সোনালিটি ডেভেলপমেন্ট',
      bullets: [
        'বডি ল্যাঙ্গুয়েজ ও কথা বলার ধরণ',
        'প্রেজেন্টেশন স্কিল ও পেশাদার আচরণ',
        'দক্ষতার পাশাপাশি কর্পোরেট ব্যক্তিত্ব',
      ],
    },
  },
  {
    icon: Shield,
    accent: 'bg-slate-500',
    iconColor: 'text-slate-600',
    lightBg: 'bg-slate-50',
    en: {
      title: 'Corporate Training Standard Delivery',
      bullets: [
        'Structured Modules',
        'Professional Environment',
        'Corporate-style presentations',
      ],
    },
    bn: {
      title: 'কর্পোরেট ট্রেনিং স্ট্যান্ডার্ড ডেলিভারি',
      bullets: [
        'সুসংগঠিত মডিউল',
        'পেশাদার পরিবেশ',
        'কর্পোরেট স্টাইলে প্রেজেন্টেশন',
      ],
    },
  },
  {
    icon: CheckCircle,
    accent: 'bg-emerald-500',
    iconColor: 'text-emerald-600',
    lightBg: 'bg-emerald-50',
    en: {
      title: 'Result-Oriented Training Commitment',
      bullets: [
        'Focus is not just on completing the course',
        'Ensuring measurable results',
        'Securing Job Placements for every student',
      ],
    },
    bn: {
      title: 'রেজাল্ট-ওরিয়েন্টেড ট্রেনিং প্রতিশ্রুতি',
      bullets: [
        'শুধু কোর্স শেষ করা নয়, ফলাফল নিশ্চিত করা',
        'কার্যকর ও পরিমাপযোগ্য ফলাফল',
        'প্রতিটি শিক্ষার্থীর জব প্লেসমেন্ট নিশ্চিত',
      ],
    },
  },
];

const STATS = [
  { num: '17+', enLabel: 'Unique Benefits', bnLabel: 'অনন্য সুবিধা' },
  {
    num: '100%',
    enLabel: 'Practical Learning',
    bnLabel: '১০০% প্র্যাকটিক্যাল',
  },
  { num: 'NSDA', enLabel: 'Govt. Approved', bnLabel: 'সরকারি অনুমোদিত' },
  { num: '5000+', enLabel: 'Students Placed', bnLabel: 'শিক্ষার্থী প্লেসড' },
];

export default function WhyBepro() {
  const { i18n } = useTranslation('common');
  const isBangla = i18n.language === 'bn';
  const bn = (en: string, bn: string) => (isBangla ? bn : en);

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0c0c0c] overflow-hidden min-h-[480px] flex items-center">
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Giant background "17" */}
        <span className="absolute right-[-2rem] top-1/2 -translate-y-1/2 text-[22rem] font-black text-white/[0.03] leading-none select-none pointer-events-none tabular-nums">
          17
        </span>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-16 w-full mb-6">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 text-orange-400 text-sm font-semibold px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              {bn(
                'Our Commitment to Your Career',
                'আপনার ক্যারিয়ারে আমাদের প্রতিশ্রুতি',
              )}
            </div>
            {/* Title */}
            <h1
              className={`font-black leading-[0.9] tracking-tight mb-6 ${isBangla ? 'font-bangla' : ''}`}
            >
              <span className="block text-white text-5xl md:text-7xl lg:text-8xl">
                {bn('Why Choose', 'কেন বেছে নেবেন')}
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-orange-400 via-orange-500 to-red-400 bg-clip-text text-transparent">
                BEPRO?
              </span>
            </h1>

            <p
              className={`text-gray-400 text-lg leading-relaxed max-w-xl mb-10 ${isBangla ? 'font-bangla' : ''}`}
            >
              {bn(
                'Discover the 17 reasons why thousands of students trust BEPRO Training & Consultancy for real, results-driven career transformation.',
                '১৭টি কারণ আবিষ্কার করুন কেন হাজার হাজার শিক্ষার্থী BEPRO-কে তাদের ক্যারিয়ার গড়ার বিশ্বস্ত পার্টনার হিসেবে বেছে নেন।',
              )}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4">
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-sm"
                >
                  <div className="text-2xl font-black text-orange-400 tabular-nums">
                    {s.num}
                  </div>
                  <div
                    className={`text-gray-500 text-xs mt-0.5 ${isBangla ? 'font-bangla' : ''}`}
                  >
                    {bn(s.enLabel, s.bnLabel)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1440V16C1200 48 960 0 720 16C480 32 240 0 0 32V48Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ── INTRO STRIP ──────────────────────────────────────────────────── */}
      <section className="bg-white pt-4 pb-10 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-b-2 border-black pb-10">
          <div>
            <p
              className={`text-3xl md:text-4xl font-black text-gray-900 leading-tight ${isBangla ? 'font-bangla' : ''}`}
            >
              {bn('Not just a course —', 'শুধু কোর্স নয় —')}{' '}
              <span className="text-primary">
                {bn('a career.', 'একটি ক্যারিয়ার।')}
              </span>
            </p>
            <p
              className={`text-gray-500 mt-2 max-w-lg ${isBangla ? 'font-bangla' : ''}`}
            >
              {bn(
                'Every benefit below is built around one mission: getting you employed and helping you grow.',
                'নিচের প্রতিটি সুবিধা একটি লক্ষ্যকে কেন্দ্র করে তৈরি — আপনাকে চাকরি দেওয়া এবং বিকশিত করা।',
              )}
            </p>
          </div>
          <Link href="/courses">
            <Button
              className={`bg-primary text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-full px-8 h-12 flex-shrink-0 ${isBangla ? 'font-bangla' : ''}`}
            >
              {bn('Explore Courses', 'কোর্স দেখুন')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── REASONS GRID ─────────────────────────────────────────────────── */}
      <section className="bg-white pb-20 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {REASONS.map((item, idx) => {
              const Icon = item.icon;
              const content = isBangla ? item.bn : item.en;
              const num = String(idx + 1).padStart(2, '0');

              return (
                <div
                  key={idx}
                  className={`relative group bg-white rounded-2xl border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200`}
                >
                  {/* Colored top accent bar */}
                  <div className={`${item.accent} h-1.5 w-full`} />

                  {/* Giant background number */}
                  <span
                    className={`absolute top-3 right-4 text-[7rem] font-black leading-none select-none pointer-events-none tabular-nums ${item.iconColor} opacity-[0.06]`}
                  >
                    {num}
                  </span>

                  <div className="relative p-6">
                    {/* Icon + number row */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl ${item.lightBg} border border-black/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}
                      >
                        <Icon className={`w-6 h-6 ${item.iconColor}`} />
                      </div>
                      <span
                        className={`text-xs font-black ${item.iconColor} bg-white border border-current/20 px-2.5 py-1 rounded-full shadow-sm`}
                      >
                        # {num}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-black text-gray-900 text-[15px] leading-snug mb-4 ${isBangla ? 'font-bangla' : ''}`}
                    >
                      {content.title}
                    </h3>

                    {/* Divider */}
                    <div
                      className={`h-0.5 w-10 ${item.accent} rounded-full mb-4`}
                    />

                    {/* Bullets */}
                    <ul className="space-y-2.5">
                      {content.bullets.map((bullet, bi) => (
                        <li
                          key={bi}
                          className={`flex items-start gap-2.5 text-sm text-gray-600 leading-snug ${isBangla ? 'font-bangla' : ''}`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full ${item.lightBg} border border-black/10 flex items-center justify-center flex-shrink-0 mt-px`}
                          >
                            <Check className={`w-3 h-3 ${item.iconColor}`} />
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DARK BANNER ──────────────────────────────────────────────────── */}
      <section className="bg-[#0c0c0c] py-14 px-6 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-orange-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {
                en: 'Government Certified',
                bn: 'সরকারি সার্টিফাইড',
                icon: Award,
              },
              {
                en: 'Job Placement Cell',
                bn: 'জব প্লেসমেন্ট সেল',
                icon: Briefcase,
              },
              { en: '100% Practical', bn: '১০০% প্র্যাকটিক্যাল', icon: Wrench },
              {
                en: 'Result Oriented',
                bn: 'রেজাল্ট ওরিয়েন্টেড',
                icon: Target,
              },
            ].map((pill, i) => {
              const PillIcon = pill.icon;
              return (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <PillIcon className="w-7 h-7 text-orange-400" />
                  </div>
                  <span
                    className={`text-white font-bold text-sm ${isBangla ? 'font-bangla' : ''}`}
                  >
                    {bn(pill.en, pill.bn)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-orange-500 rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            {/* BG decoration */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none opacity-10">
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                <circle
                  cx="150"
                  cy="50"
                  r="80"
                  stroke="white"
                  strokeWidth="40"
                />
                <circle
                  cx="30"
                  cy="170"
                  r="60"
                  stroke="white"
                  strokeWidth="30"
                />
              </svg>
            </div>

            <div className="relative z-10 p-10 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p
                  className={`text-orange-100 text-sm font-semibold mb-2 ${isBangla ? 'font-bangla' : ''}`}
                >
                  {bn(
                    'Ready to transform your career?',
                    'আপনার ক্যারিয়ার পরিবর্তন করতে প্রস্তুত?',
                  )}
                </p>
                <h2
                  className={`text-3xl md:text-4xl font-black text-white leading-tight ${isBangla ? 'font-bangla' : ''}`}
                >
                  {bn('Start Your Journey', 'আজই যাত্রা শুরু করুন')}{' '}
                  <br className="hidden md:block" />
                  {bn('with BEPRO Today.', 'BEPRO-এর সাথে।')}
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <Link href="/courses">
                  <Button
                    size="lg"
                    className={`bg-white text-orange-600 hover:bg-orange-50 border-2 border-black font-black px-8 h-14 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-full ${isBangla ? 'font-bangla' : ''}`}
                  >
                    {bn('Explore Courses', 'কোর্স দেখুন')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className={`bg-white text-orange-600 hover:bg-orange-50 border-2 border-black font-black px-8 h-14 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-full ${isBangla ? 'font-bangla' : ''}`}
                  >
                    {bn('Contact Us', 'যোগাযোগ করুন')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
