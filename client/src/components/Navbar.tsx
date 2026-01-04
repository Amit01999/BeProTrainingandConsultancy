import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Menu, LogOut, User } from 'lucide-react';
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
            ${mobile ? 'text-xl py-3' : 'text-[15px]'}
            font-semibold tracking-wide
            ${isBangla ? 'font-bangla' : ''}
            ${
              location === link.href
                ? 'text-primary'
                : 'text-[#2E251F] hover:text-foreground'
            }
            transition-colors
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <NavLinks />
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle />
          {user ? (
            <>
              <Link href={user.role === 'admin' ? '/admin' : '/dashboard'}>
                <span className={`text-base font-semibold text-foreground hover:text-primary transition-colors cursor-pointer ${isBangla ? 'font-bangla' : ''}`}>
                  {user.fullName}
                </span>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className={`rounded-md px-4 ${isBangla ? 'font-bangla' : ''}`}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t('nav.logout')}
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-[15px] font-semibold text-[#2E251F] hover:text-primary rounded-md ${isBangla ? 'font-bangla' : ''}`}
                >
                  {t('nav.login')}
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className={`text-[15px] font-semibold rounded-md bg-primary text-white border border-black/50 hover:border-black ${isBangla ? 'font-bangla' : ''}`}
                >
                  {t('nav.register')}
                </Button>
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

          <SheetContent side="right" className="pt-10 flex flex-col gap-8">
            <div className="flex justify-end mb-4">
              <LanguageToggle />
            </div>
            <NavLinks mobile />

            <div className="border-t pt-6 flex flex-col gap-4">
              {user ? (
                <>
                  <Link
                    href={user.role === 'admin' ? '/admin' : '/dashboard'}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-base ${isBangla ? 'font-bangla' : ''}`}
                    >
                      <User className="mr-2 h-4 w-4" />
                      {t('nav.dashboard')}
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    className={`w-full justify-start text-base ${isBangla ? 'font-bangla' : ''}`}
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('nav.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className={`w-full text-base ${isBangla ? 'font-bangla' : ''}`}>
                      {t('nav.login')}
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className={`w-full text-base bg-primary ${isBangla ? 'font-bangla' : ''}`}>
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
