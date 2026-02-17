import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import {
  Menu,
  LogOut,
  User,
  X,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Clock,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '@/components/LanguageToggle';
import logo from '../asset/logo1.png';

export function Navbar() {
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const subHeaderRef = useRef<HTMLDivElement>(null);
  const [subHeaderHeight, setSubHeaderHeight] = useState(40);
  const { t, i18n } = useTranslation('common');
  const isBangla = i18n.language === 'bn';

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (subHeaderRef.current) {
      setSubHeaderHeight(subHeaderRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // const links = [
  //   { href: '/', label: t('nav.home') },
  //   { href: '/courses', label: t('nav.courses') },
  //   { href: '/skills', label: t('nav.skillsBoost') },
  //   { href: '/services', label: t('nav.services') },
  //   { href: '/contact', label: t('nav.contact') },
  // ];

  const links = [
    { href: '/', label: t('nav.home') },
    { href: '/courses', label: t('nav.courses') },
    { href: '/skills', label: t('nav.skillsBoost') },
    { href: '/services', label: t('nav.services') },
    { href: '/contact', label: t('nav.contact') },
    { href: '/bootcamp', label: t('nav.bootcamp'), special: true },
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
    setIsOpen(false);
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {links.map(link =>
        link.special ? (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => mobile && setIsOpen(false)}
            className={`
              relative group
              ${mobile ? 'text-lg py-3 px-4 rounded-lg' : 'text-[15px]'}
              font-bold tracking-wide ${isBangla ? 'font-bangla' : ''}
              ${
                mobile
                  ? 'bg-gradient-to-r from-[#8B3A6B] to-[#A0527D] text-white rounded-xl px-5 py-2.5 shadow-md'
                  : `rounded-full px-4 py-1.5 text-white ${
                      location === link.href
                        ? 'shadow-lg shadow-purple-300/40'
                        : 'hover:shadow-lg hover:shadow-purple-300/40 hover:-translate-y-0.5'
                    }`
              }
              transition-all duration-200
            `}
            style={
              !mobile
                ? {
                    background:
                      'linear-gradient(135deg, #8B3A6B 0%, #A0527D 100%)',
                  }
                : undefined
            }
          >
            {!mobile && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-400" />
              </span>
            )}
            {link.label}
          </Link>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => mobile && setIsOpen(false)}
            className={`
              ${
                mobile
                  ? 'text-lg py-3 px-4 rounded-lg hover:bg-gray-50'
                  : 'text-[17px] font-bold'
              }
              font-semibold tracking-wide ${isBangla ? 'font-bangla' : ''}
              ${
                location === link.href
                  ? mobile
                    ? 'text-primary bg-primary/5'
                    : 'text-primary'
                  : 'text-[#2E251F] hover:text-primary'
              }
              transition-all duration-200
            `}
          >
            {link.label}
          </Link>
        ),
      )}
    </>
  );

  return (
    <>
      {/* Fixed header wrapper */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Sub Header - slides up on scroll */}
        <div
          ref={subHeaderRef}
          className="bg-gradient-to-r from-orange-600 to-orange-500 text-white transition-all duration-300 ease-in-out"
          style={{ marginTop: isScrolled ? -subHeaderHeight : 0 }}
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-20">
            <div className="flex justify-between items-center py-2.5">
              {/* Left side - Contact Info */}
              <div className="flex items-center gap-4 lg:gap-6 text-xs lg:text-sm">
                <div className="flex items-center gap-1.5 lg:gap-2">
                  <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  <span className="font-medium">9:00am - 6:00pm</span>
                </div>

                <div className="flex items-center gap-1.5 lg:gap-2">
                  <Phone className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  <a
                    href="tel:+8801626085837"
                    className="font-medium transition-opacity duration-200 hover:underline hover:opacity-80"
                  >
                    +8801626085837
                  </a>
                </div>

                <div className="hidden xl:flex items-center gap-1.5 lg:gap-2">
                  <Mail className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  <a
                    href="mailto:info@bepro.com.bd"
                    className="font-medium transition-opacity duration-200 hover:underline hover:opacity-80"
                  >
                    info@bepro.com.bd
                  </a>
                </div>
              </div>

              {/* Right side - Social Icons */}
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="flex items-center gap-2 lg:gap-3">
                  <a
                    href="#"
                    className="hover:text-orange-100 transition-colors p-1 rounded-full hover:bg-white/10"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  </a>
                  <a
                    href="#"
                    className="hover:text-orange-100 transition-colors p-1 rounded-full hover:bg-white/10"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  </a>
                  <a
                    href="#"
                    className="hover:text-orange-100 transition-colors p-1 rounded-full hover:bg-white/10"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  </a>
                  <a
                    href="#"
                    className="hover:text-orange-100 transition-colors p-1 rounded-full hover:bg-white/10"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav
          className={`bg-white transition-all duration-300 ease-in-out ${
            isScrolled ? 'shadow-lg backdrop-blur-sm bg-white/95' : 'shadow-md'
          }`}
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-20">
            <div
              className={`flex justify-between items-center transition-all duration-500 ease-in-out ${
                isScrolled ? 'h-16 lg:h-16' : 'h-20 '
              }`}
            >
              {/* Logo */}
              <Link
                href="/"
                className="flex-shrink-0 transition-all duration-500 ease-in-out"
              >
                <img
                  src={logo}
                  alt="PencilBox"
                  className={`w-auto transition-all duration-500 ease-in-out ${
                    isScrolled ? 'h-10 lg:h-14' : 'h-14 lg:h-16'
                  }`}
                />
              </Link>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                <NavLinks />
              </div>

              {/* Desktop Auth */}
              <div className="hidden lg:flex items-center gap-3 xl:gap-4">
                <LanguageToggle />
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span
                        className={`transition-all duration-500 ${isScrolled ? 'text-xs' : 'text-sm'}`}
                      >
                        {user.fullName}
                      </span>
                    </Link>
                    <Button
                      variant="outline"
                      size={isScrolled ? 'sm' : 'default'}
                      onClick={() => logoutMutation.mutate()}
                      className="transition-all duration-500"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {t('nav.logout')}
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button
                        variant="outline"
                        size={isScrolled ? 'sm' : 'default'}
                        className="transition-all duration-500"
                      >
                        {t('nav.login')}
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button
                        size={isScrolled ? 'sm' : 'default'}
                        className="transition-all duration-500 bg-orange-500 hover:bg-orange-600"
                      >
                        {t('nav.register')}
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu */}
              <div className="lg:hidden flex items-center gap-2">
                <LanguageToggle />
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="transition-all duration-500"
                    >
                      <Menu
                        className={`transition-all duration-500 ${isScrolled ? 'h-5 w-5' : 'h-6 w-6'}`}
                      />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[85vw] max-w-sm p-0 bg-white [&>button]:hidden"
                  >
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-orange-50 to-orange-100">
                        <img src={logo} alt="PencilBox" className="h-14 w-14" />
                        <button
                          onClick={() => setIsOpen(false)}
                          className="p-2 rounded-full hover:bg-orange-200 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Links */}
                      <div className="flex flex-col p-4 space-y-1 flex-1 overflow-y-auto">
                        <NavLinks mobile />
                      </div>

                      {/* Contact info (visible only on mobile drawer) */}

                      {/* Auth */}
                      <div className="p-5 border-t bg-gray-50 space-y-4">
                        {user ? (
                          <>
                            <Link
                              href="/dashboard"
                              onClick={() => setIsOpen(false)}
                            >
                              <Button
                                variant="outline"
                                className="w-full justify-start hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 transition-colors"
                              >
                                <User className="w-4 h-4 mr-2" />
                                {t('nav.dashboard')}
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              className="w-full justify-start hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 transition-colors"
                              onClick={handleLogout}
                            >
                              <LogOut className="w-4 h-4 mr-2" />
                              {t('nav.logout')}
                            </Button>
                          </>
                        ) : (
                          <>
                            <Link
                              href="/login"
                              onClick={() => setIsOpen(false)}
                              className="block"
                            >
                              <Button
                                variant="outline"
                                className="w-full h-11 text-base hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 transition-colors"
                              >
                                {t('nav.login')}
                              </Button>
                            </Link>
                            <Link
                              href="/register"
                              onClick={() => setIsOpen(false)}
                              className="block"
                            >
                              <Button className="w-full h-11 text-base bg-orange-500 hover:bg-orange-600 transition-colors">
                                {t('nav.register')}
                              </Button>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Spacer to push content below the fixed header */}
      <div
        style={{
          height: (isMobile ? 0 : subHeaderHeight) + (isScrolled ? 64 : 80),
        }}
        className="transition-all duration-300"
      />
    </>
  );
}
