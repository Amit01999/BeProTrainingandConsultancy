import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  Building2,
  Plane,
  BookOpen,
  Briefcase,
  MessageSquare,
  Award,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';

const corporateServices = [
  { name: 'Office Etiquette Training', icon: Building2 },
  { name: 'Professional Communication', icon: MessageSquare },
  { name: 'Emotional Intelligence', icon: '❤️' },
  { name: 'Team Building', icon: '🤝' },
  { name: 'Day-to-day Workplace Communication', icon: '💬' },
  { name: 'Leadership Development', icon: '👑' },
];

const foreignJobServices = [
  {
    name: 'CV Writing',
    description: 'Professional resume crafting for international opportunities',
  },
  {
    name: 'Interview Skills',
    description: 'Mock interviews and preparation techniques',
  },
  {
    name: 'Basic English',
    description: 'Essential English communication for overseas work',
  },
  {
    name: 'Cultural Orientation',
    description: 'Understanding workplace culture abroad',
  },
];

const otherServices = [
  {
    title: 'English Language Training',
    titleBn: 'ইংরেজি ভাষা প্রশিক্ষণ',
    description: 'Professional English courses for career advancement',
    icon: '🇬🇧',
    fee: '৳২,০০০',
  },
  {
    title: 'German Language Training',
    titleBn: 'জার্মান ভাষা প্রশিক্ষণ',
    description: 'German language for work and study opportunities in Germany',
    icon: '🇩🇪',
    fee: '৳৫,০০০',
  },
  {
    title: 'Internship Program',
    titleBn: 'ইন্টার্নশিপ প্রোগ্রাম',
    description: 'Hands-on experience with partner organizations',
    icon: '💼',
    fee: 'Contact',
  },
  {
    title: 'Higher Study Guidance',
    titleBn: 'উচ্চশিক্ষা গাইডেন্স',
    description: 'Complete guidance for studying abroad',
    icon: '🎓',
    fee: 'Consultation',
  },
  {
    title: 'LinkedIn Personal Branding',
    titleBn: 'লিংকডইন পার্সোনাল ব্র্যান্ডিং',
    description: 'Build your professional online presence',
    icon: '💼',
    fee: '৳১,৫০০',
  },
  {
    title: 'Certification & Job Placement',
    titleBn: 'সার্টিফিকেশন ও চাকরি প্লেসমেন্ট',
    description: 'Industry-recognized certification with job support',
    icon: '🏆',
    fee: 'Included',
  },
];

const CorporateServicesPage = () => {
  return (
    <div className="min-h-screen ">
      {/* Hero */}
      <section className="mx-auto px-6 lg:px-20  py-16 bg-[#c27acf] text-primary-foreground">
        <div className="container ">
          <div>
            <Badge variant="secondary" className="mb-4">
              <Briefcase className="h-3 w-3 mr-1" />
              Professional Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Corporate & Foreign <span className="text-accent">Services</span>
            </h1>
            <p className="text-lg opacity-90 font-bangla">
              কর্পোরেট প্রশিক্ষণ এবং বিদেশ চাকরি ওরিয়েন্টেশন সেবা
            </p>
          </div>
        </div>
      </section>

      <div className=" px-6 lg:px-20 bg-[#F7F7F5] ">
        {/* <Helmet>
        <title>Corporate & Foreign Services | BePro Training</title>
        <meta name="description" content="Corporate training for banks, NGOs, hospitals. Foreign job orientation, language training, higher study guidance. কর্পোরেট ও বিদেশ সেবা।" />
      </Helmet> */}

        {/* Corporate Training */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  For Organizations
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Corporate <span className="text-gradient">Training</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  Tailored training programs for banks, hospitals, NGOs, and
                  corporate organizations. We help your team develop essential
                  professional skills.
                </p>
                <p className="text-muted-foreground mb-8 font-bangla">
                  ব্যাংক, হাসপাতাল, এনজিও এবং কর্পোরেট সংস্থাগুলির জন্য
                  কাস্টমাইজড প্রশিক্ষণ প্রোগ্রাম।
                </p>
                <Button asChild variant="default" size="lg">
                  <Link to="/contact">
                    Request Training
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {corporateServices.map(service => (
                  <Card key={service.name} className="p-4">
                    <div className="text-2xl mb-2">
                      {typeof service.icon === 'string' ? (
                        service.icon
                      ) : (
                        <service.icon className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <h3 className="font-medium text-sm">{service.name}</h3>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Foreign Job Orientation */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <Plane className="h-3 w-3 mr-1" />
                For Overseas Workers
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Foreign Job <span className="text-gradient">Orientation</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto font-bangla">
                বিদেশে চাকরির জন্য সম্পূর্ণ প্রস্তুতি - সিভি রাইটিং থেকে
                ইন্টারভিউ প্রস্তুতি পর্যন্ত
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {foreignJobServices.map(service => (
                <Card key={service.name} className="p-6">
                  <h3 className="font-semibold mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Other Services */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Additional Programs
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Other <span className="text-gradient">Services</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.map(service => (
                <Card key={service.title} className="h-full">
                  <CardHeader>
                    <div className="text-3xl mb-2">{service.icon}</div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <p className="text-sm text-muted-foreground font-bangla">
                      {service.titleBn}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-primary">
                        {service.fee}
                      </span>
                      <Button asChild variant="outline" size="sm">
                        <Link to="/contact">Learn More</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* CTA */}
      <section className="py-16 bg-secondary text-primary-foreground ">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need a Custom Solution?
          </h2>

          <p className="text-lg opacity-90 mb-6 font-bangla">
            আপনার প্রতিষ্ঠানের জন্য কাস্টম প্রশিক্ষণ প্রোগ্রাম তৈরি করতে আমাদের
            সাথে যোগাযোগ করুন
          </p>

          <Button asChild variant="default" size="lg">
            <Link to="/contact">
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CorporateServicesPage;
