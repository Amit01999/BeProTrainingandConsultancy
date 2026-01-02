import { Link } from 'wouter';
import { Facebook, Twitter, Linkedin, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 lg:px-12 py-24">
        {/* Editorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-end">
          {/* Left — Brand Voice */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Education platform
            </p>

            <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
              Stop learning
              <span className="block text-primary">for certificates.</span>
            </h2>

            <p className="mt-6 max-w-md text-base text-white/60">
              Learnify focuses on applied skills, real practice, and outcomes
              that translate directly into jobs and careers.
            </p>
          </div>

          {/* Right — Primary Action */}
          <div className="flex lg:justify-end">
            <Link
              href="/courses"
              className="group inline-flex items-center gap-4 text-lg font-semibold"
            >
              Explore programs
              <span className="h-12 w-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition">
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          </div>
        </div>

        {/* Micro Navigation */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-8 text-sm text-white/50">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <Link href="/courses" className="hover:text-white transition">
              Courses
            </Link>
            <Link href="/skills" className="hover:text-white transition">
              SkillsBoost
            </Link>
            <Link href="/services" className="hover:text-white transition">
              Services
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/40 flex flex-col md:flex-row justify-between gap-4">
          <span>© {new Date().getFullYear()} BePro Training & Consultancy</span>
          <span>Built for outcomes, not applause</span>
        </div>
      </div>
    </footer>
  );
}
