import { useCreateContact } from "@/hooks/use-contacts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from 'react-i18next';
import { SEO } from '@/components/SEO';

export default function Contact() {
  const createContact = useCreateContact();
  const { t, i18n } = useTranslation(['pages', 'forms', 'common']);
  const isBangla = i18n.language === 'bn';

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertContact) => {
    createContact.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20">
      <SEO titleKey="contact.seo.title" descriptionKey="contact.seo.description" />
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className={`text-4xl font-display font-bold text-slate-900 mb-4 ${isBangla ? 'font-bangla' : ''}`}>{t('pages:contact.title')}</h1>
          <p className={`text-slate-600 text-lg ${isBangla ? 'font-bangla' : ''}`}>
            {t('pages:contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid gap-6">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 bg-orange-100 rounded-lg text-primary shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg mb-1 ${isBangla ? 'font-bangla' : ''}`}>{t('pages:contact.visitUs')}</h3>
                    <p className={`text-slate-600 ${isBangla ? 'font-bangla' : ''}`}>UCEP Khulna Region, <br/>7 Joynal Road, Boyra, Khulna</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-600 shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg mb-1 ${isBangla ? 'font-bangla' : ''}`}>{t('pages:contact.callUs')}</h3>
                    <p className="text-slate-600">+880 1234 567890</p>
                    <p className={`text-slate-500 text-sm ${isBangla ? 'font-bangla' : ''}`}>Mon-Fri from 9am to 5pm</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600 shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg mb-1 ${isBangla ? 'font-bangla' : ''}`}>{t('pages:contact.emailUs')}</h3>
                    <p className="text-slate-600">info@beprotraining.com</p>
                    <p className="text-slate-600">support@beprotraining.com</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Map Placeholder - can be replaced with real Google Maps iframe */}
            <div className="h-64 bg-slate-200 rounded-2xl w-full overflow-hidden shadow-inner">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.676644487747!2d89.5375!3d22.8135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQ4JzQ4LjYiTiA4OcKwMzInMTUuMCJF!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-2xl border-slate-100">
            <CardContent className="p-8">
              <h3 className={`text-2xl font-bold font-display mb-6 ${isBangla ? 'font-bangla' : ''}`}>{t('pages:contact.sendMessage')}</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={isBangla ? 'font-bangla' : ''}>{t('forms:labels.fullName')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('forms:placeholders.enterFullName')} className={`h-11 ${isBangla ? 'font-bangla' : ''}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={isBangla ? 'font-bangla' : ''}>{t('forms:labels.email')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('forms:placeholders.enterEmail')} className="h-11" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={isBangla ? 'font-bangla' : ''}>{t('forms:labels.phone')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('forms:placeholders.enterPhone')} className={`h-11 ${isBangla ? 'font-bangla' : ''}`} {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={isBangla ? 'font-bangla' : ''}>{t('forms:labels.message')}</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How can we help you?" className="min-h-[150px] resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 text-white" disabled={createContact.isPending}>
                    {createContact.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
