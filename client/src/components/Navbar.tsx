import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Menu, LogOut, User, X } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '@/components/LanguageToggle';
import logo from '../asset/logo1.png';

export function Navbar() {
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation('common');
  const isBangla = i18n.language === 'bn';

  const links = [
    { href: '/', label: t('nav.home') },
    { href: '/courses', label: t('nav.courses') },
    { href: '/skills', label: t('nav.skillsBoost') },
    { href: '/services', label: t('nav.services') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
    setIsOpen(false);
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => mobile && setIsOpen(false)}
          className={`
            ${
              mobile
                ? 'text-lg py-3 px-4 rounded-lg hover:bg-gray-50'
                : 'text-[15px]'
            }
            font-semibold tracking-wide
            ${isBangla ? 'font-bangla' : ''}
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
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 lg:px-24 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src={logo} className="w-16 h-auto" alt="Logo" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <NavLinks />
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle />
          {user ? (
            <>
              <Link href={user.role === 'admin' ? '/admin' : '/dashboard'}>
                <span className="text-base font-semibold cursor-pointer hover:text-primary">
                  {user.fullName}
                </span>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logoutMutation.mutate()}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t('nav.logout')}
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">{t('nav.register')}</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-white w-[320px] p-0 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b sticky top-0 bg-white z-20 shadow-sm">
              <img src={logo} className="w-12" />
              <div className="flex items-center gap-3">
                <LanguageToggle />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-1 px-6 py-6 flex-1 overflow-y-auto">
              <NavLinks mobile />
            </nav>

            {/* Auth */}
            <div className="border-t px-6 py-5">
              {user ? (
                <>
                  <Link
                    href={user.role === 'admin' ? '/admin' : '/dashboard'}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant="outline"
                      className="w-full h-12 mb-3 justify-start"
                    >
                      <User className="mr-2 h-5 w-5" />
                      {t('nav.dashboard')}
                    </Button>
                  </Link>

                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="w-full h-12 justify-start"
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    {t('nav.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full h-12 mb-3">
                      {t('nav.login')}
                    </Button>
                  </Link>

                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full h-12 bg-primary">
                      {t('nav.register')}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
