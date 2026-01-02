import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white mt-auto">
      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">

          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-display text-white">
              Learn<span className="text-primary">ify</span>
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Empowering youth through skill development and professional training.
              Unlock your potential with our industry-leading courses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 font-display">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="text-white/70 hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/courses" className="text-white/70 hover:text-primary transition-colors">All Courses</Link></li>
              <li><Link href="/skills" className="text-white/70 hover:text-primary transition-colors">SkillsBoost</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-4 font-display">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>UCEP Khulna Region,<br/>7 Joynal Road, Boyra, Khulna</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>info@beprotraining.com</span>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-bold text-white mb-4 font-display">Follow Us</h4>
            <div className="flex space-x-3">
              <a href="#" className="p-3 rounded-xl bg-white/10 hover:bg-primary hover:scale-110 transition-all duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-3 rounded-xl bg-white/10 hover:bg-primary hover:scale-110 transition-all duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-3 rounded-xl bg-white/10 hover:bg-primary hover:scale-110 transition-all duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/50">
          © {new Date().getFullYear()} BePro Training & Consultancy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
