import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Users,
  Phone,
  CheckCircle2,
  Rocket,
  ArrowRight,
  Star,
  Target,
  Lightbulb,
  TrendingUp,
  Megaphone,
  LayoutGrid,
  DollarSign,
  Presentation,
  Handshake,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import womenImage from '../asset/woman.png';

const FORM_URL = 'https://forms.gle/83vpwRVTC5E8Ygza6';

/* Smooth deceleration curve */
const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease },
  }),
};

const trainingModules = [
  {
    icon: Lightbulb,
    title: 'Entrepreneurial Thinking & Growth Strategy',
    desc: 'Develop a growth-oriented mindset to identify opportunities and scale your business.',
  },
  {
    icon: Megaphone,
    title: 'Branding & Digital Marketing Fundamentals',
    desc: 'Learn to build a brand presence and leverage digital channels for growth.',
  },
  {
    icon: LayoutGrid,
    title: 'Business Model Canvas (Practical Workshop)',
    desc: 'Hands-on workshop to map your business model from idea to execution.',
  },
  {
    icon: DollarSign,
    title: 'Finance Basics for Women-Led Businesses',
    desc: 'Understand financial planning, budgeting, and funding for your venture.',
  },
  {
    icon: Presentation,
    title: 'Pitching Skills & Investor Communication',
    desc: 'Master the art of pitching your ideas to investors and stakeholders.',
  },
  {
    icon: Handshake,
    title: 'Networking with Emerging Women Leaders',
    desc: 'Connect with like-minded entrepreneurs and build a strong support network.',
  },
];

const whyMatters = [
  'Selection-based participation for quality learning',
  'Real-world practical sessions',
  'Local business ecosystem insights',
  'Confidence-building leadership exercises',
  'Strong peer and mentor network',
];

export default function BootcampPage() {
  return (
    <>
      <Helmet>
        <title>Women Entrepreneurs Leadership Bootcamp 2026 | BePro</title>
        <meta
          name="description"
          content="Join the Women Entrepreneurs Leadership Bootcamp 2026 in Khulna. Free training on entrepreneurship, branding, finance, and leadership for women aged 17-35."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#FBF0F7] via-[#F5E6F0] to-[#EDE0EB]">
        {/* ═══════════════ HERO SECTION ═══════════════ */}
        <section className="relative overflow-hidden max-sm:mt-5">
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-purple-200/20 blur-3xl" />
            <div className="absolute top-40 right-20 h-48 w-48 rounded-full bg-pink-200/25 blur-3xl" />
            <div className="absolute bottom-10 left-1/3 h-56 w-56 rounded-full bg-purple-100/20 blur-3xl" />
          </div>

          {/* Woman image as background — right side */}
          <div
            className="hidden md:block absolute inset-0 bg-no-repeat bg-right-bottom bg-cover pointer-events-none"
            style={{
              backgroundImage: `url(${womenImage})`,
              backgroundPosition: '90% 20%', // right + slightly down
            }}
          />

          <div className="relative max-w-6xl px-4 sm:px-6 lg:px-24 pt-12 sm:pt-8 pb-12 lg:ml-10">
            <div className="w-full md:w-[60%]">
              {/* Top badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="mb-6"
              >
                <span
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-white"
                  style={{
                    background:
                      'linear-gradient(135deg, #8B3A6B 0%, #A0527D 50%, #7B2D5F 100%)',
                  }}
                >
                  🌸 International Women's Day Special 🌸
                </span>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease }}
              >
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[66px] font-extrabold leading-[1.08] text-gray-900 tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Women Entrepreneurs{' '}
                  <Rocket className="inline h-7 w-7 sm:h-8 sm:w-8 text-[#8B3A6B]" />
                  <br />
                  <span
                    style={{
                      background:
                        'linear-gradient(90deg, #7B2D5F, #A0527D, #C76BA3)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Leadership Bootcamp 2026
                  </span>
                </h1>
                <p
                  className="mt-3 text-lg sm:text-xl font-semibold tracking-[0.12em]"
                  style={{ color: '#B8860B' }}
                >
                  Build. Lead. Scale.
                </p>
              </motion.div>

              {/* Event meta pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25, ease }}
                className="flex flex-wrap gap-3 mt-6"
              >
                {[
                  { icon: MapPin, label: 'Khulna' },
                  { icon: Calendar, label: 'March 7–8, 2026' },
                  { icon: Users, label: 'Age: 17–35 Years' },
                ].map(item => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-sm border border-purple-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
                  >
                    <item.icon size={15} className="text-[#8B3A6B]" />
                    {item.label}
                  </div>
                ))}
              </motion.div>

              {/* CTA button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease }}
                className="mt-8"
              >
                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-base sm:text-lg font-bold text-white tracking-wide hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-purple-300/50"
                  style={{
                    background:
                      'linear-gradient(135deg, #7B2D5F 0%, #9B4578 50%, #7B2D5F 100%)',
                    boxShadow: '0 12px 32px -6px rgba(123, 45, 95, 0.45)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  Apply Now
                  <ArrowRight size={18} />
                </a>
                <p className="mt-3 text-sm text-gray-500">
                  Free Training Program · Limited Seats · Selection Based
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════ TRAINING MODULES ═══════════════ */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-12"
          >
            <motion.div custom={0} variants={fadeUp}>
              <span
                className="inline-block rounded-md px-4 py-1.5 text-xs font-bold tracking-wider uppercase text-white mb-4"
                style={{
                  background: 'linear-gradient(90deg, #B8860B, #D4A843)',
                }}
              >
                Free Training Program
              </span>
            </motion.div>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              What You'll Learn
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="mt-3 text-gray-500 max-w-xl mx-auto"
            >
              Six intensive modules designed to equip you with everything needed
              to launch and grow a business.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {trainingModules.map((mod, i) => (
              <motion.div
                key={mod.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                className="group relative rounded-2xl bg-white/80 backdrop-blur-sm border border-purple-100/60 p-6 hover:shadow-xl hover:-translate-y-1"
                style={{
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                <div
                  className="flex items-center justify-center h-11 w-11 rounded-xl text-white mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #8B3A6B, #A0527D)',
                  }}
                >
                  <mod.icon size={20} />
                </div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-1.5 leading-snug">
                  {mod.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  {mod.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════ WHY THIS BOOTCAMP MATTERS ═══════════════ */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — visual card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="relative rounded-3xl overflow-hidden p-8 sm:p-10"
              style={{
                background:
                  'linear-gradient(135deg, #8B3A6B 0%, #A0527D 40%, #C76BA3 100%)',
              }}
            >
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-xl" />
              <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-white/5 blur-xl" />

              <h3
                className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Why This Bootcamp
                <br />
                Matters
              </h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed max-w-sm">
                Designed specifically for young women entrepreneurs in the
                Khulna region — practical, local, and empowering.
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="rounded-xl bg-white/15 backdrop-blur-sm px-4 py-3 text-center">
                  <p className="text-2xl font-extrabold text-white">2</p>
                  <p className="text-xs text-white/70">Days</p>
                </div>
                <div className="rounded-xl bg-white/15 backdrop-blur-sm px-4 py-3 text-center">
                  <p className="text-2xl font-extrabold text-white">6</p>
                  <p className="text-xs text-white/70">Modules</p>
                </div>
                <div className="rounded-xl bg-white/15 backdrop-blur-sm px-4 py-3 text-center">
                  <p className="text-2xl font-extrabold text-white">100%</p>
                  <p className="text-xs text-white/70">Free</p>
                </div>
              </div>
            </motion.div>

            {/* Right — checklist */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <ul className="space-y-4">
                {whyMatters.map((item, i) => (
                  <motion.li
                    key={item}
                    custom={i}
                    variants={fadeUp}
                    className="flex items-start gap-3 rounded-xl bg-white/70 backdrop-blur-sm border border-purple-100/50 px-5 py-4 shadow-sm"
                  >
                    <CheckCircle2
                      size={20}
                      className="shrink-0 mt-0.5 text-[#8B3A6B]"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ ORGANIZERS ═══════════════ */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
          >
            <div className="text-center">
              <span className="inline-block rounded-full bg-[#8B3A6B]/10 px-4 py-1 text-[11px] font-bold tracking-wider uppercase text-[#8B3A6B] mb-2">
                Organizer
              </span>
              <p className="text-lg font-bold text-gray-800">
                Startup Grind Khulna
              </p>
            </div>
            <div className="hidden sm:block h-12 w-px bg-purple-200" />
            <div className="text-center">
              <span className="inline-block rounded-full bg-[#8B3A6B]/10 px-4 py-1 text-[11px] font-bold tracking-wider uppercase text-[#8B3A6B] mb-2">
                Co-organizer
              </span>
              <p className="text-lg font-bold text-gray-800">
                BePro Training & Consultancy
              </p>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════ FINAL CTA ═══════════════ */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="relative rounded-3xl overflow-hidden px-6 sm:px-12 py-12 sm:py-16 text-center"
            style={{
              background:
                'linear-gradient(135deg, #7B2D5F 0%, #9B4578 40%, #8B3A6B 100%)',
            }}
          >
            <div className="absolute -top-8 -left-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-white/5 blur-2xl" />

            <div className="relative z-10">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Limited Seats Available
              </h2>
              <p className="text-white/80 mb-2">
                Selection-Based Enrollment Only
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6 mb-8">
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Phone size={16} />
                  <span className="font-medium">
                    For Inquiry (Call/WhatsApp):{' '}
                    <a
                      href="tel:01626085537"
                      className="underline underline-offset-2 hover:text-white"
                    >
                      01626085537
                    </a>
                  </span>
                </div>
                <div className="rounded-lg bg-white/15 backdrop-blur-sm px-4 py-2 text-sm font-bold text-white">
                  Last Date: 01/03/2026
                </div>
              </div>

              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-10 py-4 text-base sm:text-lg font-bold tracking-wide text-[#7B2D5F] hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-white/30"
                style={{
                  boxShadow: '0 12px 32px -6px rgba(0,0,0,0.25)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                Apply Now
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
