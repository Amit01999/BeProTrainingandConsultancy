import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Users, Phone } from 'lucide-react';
import womenImage from '../asset/woman.png';

/**
 * EventPopupModal — Women Entrepreneurs Leadership Bootcamp 2026
 *
 * Layout: wider card with text on the left ~60% and the woman image
 * as a background positioned on the right ~40%.
 */

const ease = [0.22, 1, 0.36, 1] as const;

export default function EventPopupModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsOpen(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const close = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="event-popup-overlay"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          aria-label="Women Entrepreneurs Leadership Bootcamp 2026"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={close}
          />

          {/* Card — wider to fit image on right */}
          <motion.div
            key="event-popup-card"
            className="relative z-10 w-full max-w-[740px] rounded-3xl overflow-hidden will-change-transform"
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.55, ease }}
            onClick={e => e.stopPropagation()}
            style={{
              boxShadow:
                '0 32px 80px -16px rgba(120, 40, 100, 0.35), 0 12px 32px -8px rgba(0,0,0,0.18)',
            }}
          >
            {/* ══════════ TOP BANNER ══════════ */}
            <div
              className="relative text-center py-2.5 px-4 overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, #8B3A6B 0%, #A0527D 50%, #7B2D5F 100%)',
              }}
            >
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white/95">
                🌸 International Women's Day Special 🌸
              </span>
            </div>

            {/* ══════════ MAIN BODY — woman image as full background ══════════ */}
            <div
              className="relative overflow-hidden"
              style={{
                background:
                  'linear-gradient(170deg, #F9EEF5 0%, #F3E4EE 40%, #EDE0EB 100%)',
              }}
            >
              {/* Full background image — women appear on the right naturally */}
              <div
                className="absolute inset-0 bg-no-repeat bg-right-bottom bg-cover pointer-events-none"
                style={{
                  backgroundImage: `url(${womenImage})`,
                  backgroundPosition: '60% bottom',
                }}
              />

              {/* Close button */}
              <button
                onClick={close}
                className="absolute top-3 right-3 z-20 rounded-full p-1.5 bg-white/60 text-gray-500 hover:text-gray-800 hover:bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                style={{ transition: 'background 0.2s, color 0.2s' }}
                aria-label="Close popup"
              >
                <X size={18} strokeWidth={2.5} />
              </button>

              {/* Content on the LEFT — with right padding gap so text doesn't touch the women */}
              <div className="relative z-10 w-full sm:w-[70%] px-6 sm:pl-8 sm:pr-6 py-6 sm:py-7">
                {/* Title block */}
                <h2
                  className="text-[20px] sm:text-[24px] font-extrabold leading-[1.15] text-gray-900 tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Women Entrepreneurs{' '}
                  <span className="text-base sm:text-lg">🚀</span>
                  <br />
                  <span
                    style={{
                      background: 'linear-gradient(90deg, #7B2D5F, #A0527D)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Leadership Bootcamp 2026
                  </span>
                </h2>

                <p
                  className="mt-1 text-sm font-semibold tracking-wide"
                  style={{ color: '#B8860B' }}
                >
                  Build. Lead. Scale.
                </p>

                {/* Event meta */}
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] sm:text-[13px] text-gray-600">
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} className="text-[#8B3A6B]" />{' '}
                    <b>Khulna</b>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={12} className="text-[#8B3A6B]" /> March 7–8,
                    2026
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users size={12} className="text-[#8B3A6B]" /> Age: 17–35
                    Years
                  </span>
                </div>

                {/* Free Training badge */}
                <div
                  className="mt-4 mb-3 inline-block rounded-md px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase"
                  style={{
                    background: 'linear-gradient(90deg, #B8860B, #D4A843)',
                  }}
                >
                  Free Training Program
                </div>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-4">
                  {[
                    'Entrepreneurial Thinking & Growth Strategy',
                    'Branding & Digital Marketing',
                    'Business Model Canvas Workshop',
                    'Finance Basics for Women-Led Businesses',
                    'Pitching Skills & Investor Communication',
                    'Leadership & Networking',
                  ].map(item => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[12px] sm:text-[13px] text-gray-700 leading-snug"
                    >
                      <span
                        className="mt-0.5 shrink-0 flex items-center justify-center h-4 w-4 rounded-full text-white text-[9px] font-bold"
                        style={{
                          background:
                            'linear-gradient(135deg, #8B3A6B, #A0527D)',
                        }}
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Bottom info row */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pt-3 border-t border-black">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">
                      Limited Seats Available
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Selection-Based Enrollment Only
                    </p>
                    <p className="inline-flex items-center gap-1 text-[11px] text-gray-600">
                      <Phone size={10} className="text-[#8B3A6B]" />
                      <span className="font-medium">01626085837</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-100 mb-0.5">
                      Last Date
                    </p>
                    <span
                      className="inline-block rounded-md px-2.5 py-0.5 text-[11px] font-bold text-white"
                      style={{
                        background: 'linear-gradient(135deg, #8B3A6B, #A0527D)',
                      }}
                    >
                      01 / 03 / 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ══════════ FOOTER — enhanced CTA ══════════ */}
            <div
              className="relative overflow-hidden px-6 sm:px-8 py-4"
              style={{
                background:
                  'linear-gradient(135deg, #8B3A6B 0%, #7B2D5F 50%, #6B2450 100%)',
              }}
            >
              {/* Subtle decorative glow */}
              <div className="absolute top-0 right-1/4 h-16 w-32 rounded-full bg-white/5 blur-2xl" />

              <div className="relative z-10 flex items-center gap-3">
                <a
                  href="https://forms.gle/83vpwRVTC5E8Ygza6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl py-3 text-center text-sm font-bold tracking-wide text-[#7B2D5F] bg-white hover:bg-gray-50 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white/50"
                  style={{
                    boxShadow: '0 4px 16px -2px rgba(0,0,0,0.15)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  Apply Now →
                </a>
                <button
                  onClick={close}
                  className="flex-1 rounded-xl border border-white/25 py-3 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  style={{ transition: 'all 0.2s ease' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
