import { Link } from 'wouter';
import { Facebook, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t, i18n } = useTranslation('common');
  const isBangla = i18n.language === 'bn';

  return (
    <footer className="bg-foreground text-white border-t border-white/15 px-16">
      <div className="container mx-auto px-4 lg:px-12 py-8">
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 mb-10">
          {/* Brand Section */}
          <div className="space-y-5 lg:col-span-2">
            <p
              className={`text-[11px] uppercase tracking-[0.18em] text-white/45 
              ${isBangla ? 'font-bangla' : ''}`}
            >
              {t('footer.platform')}
            </p>

            <h2
              className={`text-4xl md:text-4xl text-white/55 font-semibold leading-snug 
              ${isBangla ? 'font-bangla' : ''}`}
            >
              {t('footer.tagline')}
            </h2>

            <p
              className={`max-w-md text-base text-white/55 leading-relaxed 
              ${isBangla ? 'font-bangla' : ''}`}
            >
              {t('footer.description')}
            </p>
          </div>

          {/* CTA */}
          <div className="lg:flex lg:justify-end lg:items-end">
            <Link
              href="/courses"
              className={`group inline-flex items-center gap-4 text-lg font-medium 
              ${isBangla ? 'font-bangla' : ''}`}
            >
              <span className="group-hover:text-primary transition-colors">
                {t('nav.courses')}
              </span>

              <span
                className="h-11 w-11 rounded-full border border-white/25 
                flex items-center justify-center 
                transition-colors group-hover:bg-primary group-hover:border-primary"
              >
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          </div>
        </div>

        {/* Newsletter Signup Line */}
        <div className="mb-14 p-8 border border-white/10 rounded-xl">
          <div className="flex flex-col lg:flex-row lg:items-center gap-7">
            {/* Text */}
            <div className="flex-1 space-y-2">
              <h3
                className={`text-xl font-semibold text-white/90 
                ${isBangla ? 'font-bangla' : ''}`}
              >
                {t('footer.newsletterTitle', {
                  defaultValue: 'Stay updated with our latest content',
                })}
              </h3>

              <p
                className={`text-white/55 text-sm max-w-md leading-relaxed 
                ${isBangla ? 'font-bangla' : ''}`}
              >
                {t('footer.newsletterSubtitle', {
                  defaultValue:
                    'Subscribe to receive new course releases, insights, and updates.',
                })}
              </p>
            </div>

            {/* Input Field */}
            <form className="flex flex-col sm:flex-row items-start gap-4 w-full lg:w-auto">
              <input
                type="email"
                placeholder={t('footer.newsletterPlaceholder', {
                  defaultValue: 'Enter your email',
                })}
                className="w-full sm:w-72 px-4 py-3 rounded-md bg-white/5 border border-white/15 
                text-white focus:outline-none focus:border-white/30 transition placeholder-white/35"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-primary text-foreground font-medium rounded-md 
                hover:opacity-90 transition"
              >
                {t('footer.subscribe', { defaultValue: 'Subscribe' })}
              </button>
            </form>
          </div>
        </div>

        {/* Multi-Column Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-14">
          {/* Column 1 */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white/75 uppercase tracking-wider">
              {t('nav.home')}
            </h4>
            <ul className="space-y-2 text-sm text-white/55">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition">
                  {t('nav.courses')}
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-white transition">
                  {t('nav.skillsBoost')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white/75 uppercase tracking-wider">
              {t('nav.services')}
            </h4>
            <ul className="space-y-2 text-sm text-white/55">
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  href="/consulting"
                  className="hover:text-white transition"
                >
                  Consulting
                </Link>
              </li>
              <li>
                <Link href="/training" className="hover:text-white transition">
                  Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white/75 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-white/55">
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white transition">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white/75 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-white/55">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5 - Social */}
          <div className="space-y-5">
            <h4 className="text-sm font-medium text-white/75 uppercase tracking-wider">
              Social
            </h4>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-md border border-white/20 
                  flex items-center justify-center 
                  hover:border-white/40 hover:bg-white/5 transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Divider */}
        <div className="mt-16 border-t border-white/10" />

        {/* Bottom Legal */}
        <div
          className={`pt-6 text-xs text-white/45 flex flex-col md:flex-row justify-between gap-4 
          ${isBangla ? 'font-bangla' : ''}`}
        >
          <span>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </span>
          <span>{t('footer.builtFor')}</span>
        </div>
      </div>
    </footer>
  );
}
