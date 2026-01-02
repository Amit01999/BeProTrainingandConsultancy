import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Award, Handshake, CheckCircle } from 'lucide-react';
import { Link } from 'wouter';

const UCEPPreview = () => {
  const benefits = [
    'Job Placement Cell Support',
    'UCEP Certification',
    'LinkedIn & CV Training',
    'Corporate-standard Curriculum',
  ];

  return (
    <section className="py-20 px-6 lg:px-20 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
          {/* Visual Card */}
          <div className="relative">
            {/* ambient accent */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full" />

            <div className="relative bg-white/95 backdrop-blur-lg border-2 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center border-2 border-black">
                  <Handshake className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1">
                    Strategic Partner
                  </Badge>
                  <h3 className="text-xl font-semibold tracking-tight">
                    UCEP Bangladesh
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-4 border-2 border-black rounded-xl text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    850+
                  </div>
                  <p className="text-sm text-foreground/60">
                    Professionals Trained
                  </p>
                </div>
                <div className="p-4 border-2 border-black rounded-xl text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">
                    2014–15
                  </div>
                  <p className="text-sm text-foreground/60">Khulna Region</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <Users className="h-4 w-4 text-primary" />
                  Soft Skills Modules
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <Award className="h-4 w-4 text-secondary" />
                  Mock Interviews
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <Badge className="mb-4">Collaboration</Badge>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Transforming Youth Through <br />
              <span className="text-primary">UCEP Partnership</span>
            </h2>

            <p className="text-foreground/70 mb-8 max-w-xl leading-relaxed">
              Our strategic collaboration with UCEP Bangladesh has empowered
              over 850 participants in the Khulna region with essential career
              skills, professional grooming and direct job readiness training.
            </p>

            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
              {benefits.map(benefit => (
                <div key={benefit} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="bg-primary text-white border-2 border-black px-8 h-14 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <Link to="/ucep-partnership">
                Explore Partnership
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UCEPPreview;
