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
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation('pages');
  const isBangla = i18n.language === 'bn';

  return (
    <div className="min-h-screen ">
      {/* Hero */}
      <section className="mx-auto px-6 lg:px-20  py-16 bg-[#c27acf] text-primary-foreground">
        <div className="container ">
          <div>
            <Badge variant="secondary" className={`mb-4 ${isBangla ? 'font-bangla' : ''}`}>
              <Briefcase className="h-3 w-3 mr-1" />
              {t('corporateServicesPage.hero.badge')}
            </Badge>
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isBangla ? 'font-bangla' : ''}`}>
              {t('corporateServicesPage.hero.title')} <span className="text-accent">{t('corporateServicesPage.hero.titleHighlight')}</span>
            </h1>
            <p className={`text-lg opacity-90 ${isBangla ? 'font-bangla' : ''}`}>
              {t('corporateServicesPage.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <Helmet>
        <title>{t('corporateServicesPage.seo.title')}</title>
        <meta name="description" content={t('corporateServicesPage.seo.description')} />
      </Helmet>

      <div className=" px-6 lg:px-20 bg-[#F7F7F5] ">

        {/* Corporate Training */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className={`mb-4 ${isBangla ? 'font-bangla' : ''}`}>
                  {t('corporateServicesPage.corporateTraining.badge')}
                </Badge>
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isBangla ? 'font-bangla' : ''}`}>
                  {t('corporateServicesPage.corporateTraining.title')} <span className="text-gradient">{t('corporateServicesPage.corporateTraining.titleHighlight')}</span>
                </h2>
                <p className={`text-muted-foreground mb-8 ${isBangla ? 'font-bangla' : ''}`}>
                  {t('corporateServicesPage.corporateTraining.description')}
                </p>
                <Button asChild variant="default" size="lg" className={isBangla ? 'font-bangla' : ''}>
                  <Link to="/contact">
                    {t('corporateServicesPage.corporateTraining.button')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {corporateServices.map((service, index) => (
                  <Card key={service.name} className="p-4">
                    <div className="text-2xl mb-2">
                      {typeof service.icon === 'string' ? (
                        service.icon
                      ) : (
                        <service.icon className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <h3 className={`font-medium text-sm ${isBangla ? 'font-bangla' : ''}`}>
                      {t(`corporateServicesPage.corporateTraining.services.${
                        ['officeEtiquette', 'professionalCommunication', 'emotionalIntelligence',
                         'teamBuilding', 'workplaceCommunication', 'leadershipDevelopment'][index]
                      }`)}
                    </h3>
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
              <Badge variant="secondary" className={`mb-4 ${isBangla ? 'font-bangla' : ''}`}>
                <Plane className="h-3 w-3 mr-1" />
                {t('corporateServicesPage.foreignJob.badge')}
              </Badge>
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isBangla ? 'font-bangla' : ''}`}>
                {t('corporateServicesPage.foreignJob.title')} <span className="text-gradient">{t('corporateServicesPage.foreignJob.titleHighlight')}</span>
              </h2>
              <p className={`text-muted-foreground max-w-2xl mx-auto ${isBangla ? 'font-bangla' : ''}`}>
                {t('corporateServicesPage.foreignJob.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {foreignJobServices.map((service, index) => {
                const serviceKeys = ['cvWriting', 'interviewSkills', 'basicEnglish', 'culturalOrientation'];
                return (
                  <Card key={service.name} className="p-6">
                    <h3 className={`font-semibold mb-2 ${isBangla ? 'font-bangla' : ''}`}>
                      {t(`corporateServicesPage.foreignJob.services.${serviceKeys[index]}.title`)}
                    </h3>
                    <p className={`text-sm text-muted-foreground ${isBangla ? 'font-bangla' : ''}`}>
                      {t(`corporateServicesPage.foreignJob.services.${serviceKeys[index]}.description`)}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Other Services */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <Badge variant="secondary" className={`mb-4 ${isBangla ? 'font-bangla' : ''}`}>
                {t('corporateServicesPage.otherServices.badge')}
              </Badge>
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isBangla ? 'font-bangla' : ''}`}>
                {t('corporateServicesPage.otherServices.title')} <span className="text-gradient">{t('corporateServicesPage.otherServices.titleHighlight')}</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.map((service, index) => {
                const serviceKeys = ['englishLanguage', 'germanLanguage', 'internship', 'higherStudy', 'linkedinBranding', 'certificationPlacement'];
                return (
                  <Card key={service.title} className="h-full">
                    <CardHeader>
                      <div className="text-3xl mb-2">{service.icon}</div>
                      <CardTitle className={`text-lg ${isBangla ? 'font-bangla' : ''}`}>
                        {t(`corporateServicesPage.otherServices.services.${serviceKeys[index]}.title`)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-sm text-muted-foreground mb-4 ${isBangla ? 'font-bangla' : ''}`}>
                        {t(`corporateServicesPage.otherServices.services.${serviceKeys[index]}.description`)}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className={`font-semibold text-primary ${isBangla ? 'font-bangla' : ''}`}>
                          {t(`corporateServicesPage.otherServices.services.${serviceKeys[index]}.fee`)}
                        </span>
                        <Button asChild variant="outline" size="sm" className={isBangla ? 'font-bangla' : ''}>
                          <Link to="/contact">{t('corporateServicesPage.otherServices.learnMore')}</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      {/* CTA */}
      <section className="py-16 bg-secondary text-primary-foreground ">
        <div className="container text-center">
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isBangla ? 'font-bangla' : ''}`}>
            {t('corporateServicesPage.cta.title')}
          </h2>

          <p className={`text-lg opacity-90 mb-6 ${isBangla ? 'font-bangla' : ''}`}>
            {t('corporateServicesPage.cta.subtitle')}
          </p>

          <Button asChild variant="default" size="lg" className={isBangla ? 'font-bangla' : ''}>
            <Link to="/contact">
              {t('corporateServicesPage.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CorporateServicesPage;
