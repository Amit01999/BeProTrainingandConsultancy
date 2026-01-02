import type { Express } from 'express';
import { createServer, type Server } from 'http';
import { storage } from './storage';
import { api } from '@shared/routes';
import { setupAuth } from './auth';
import { z } from 'zod';

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const crypto = setupAuth(app);

  // Auth Routes
  app.post(api.auth.register.path, async (req, res, next) => {
    try {
      const existing = await storage.getUserByUsername(req.body.username);
      if (existing) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const hashedPassword = await crypto.hash(req.body.password);
      const user = await storage.createUser({
        ...req.body,
        password: hashedPassword,
      });

      req.login(user, err => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        next(err);
      }
    }
  });

  app.post(api.auth.login.path, (req, res, next) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user)
        return res.status(401).json({ message: 'Invalid credentials' });
      req.login(user, (err: any) => {
        if (err) return next(err);
        res.status(200).json(user);
      });
    })(req, res, next);
  });

  app.post(api.auth.logout.path, (req, res) => {
    req.logout(() => {
      res.status(200).send();
    });
  });

  app.get(api.auth.me.path, (req, res) => {
    if (!req.user) return res.status(401).send();
    res.json(req.user);
  });

  // Middleware to require login
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) return res.status(401).send();
    next();
  };

  const requireAdmin = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin')
      return res.status(401).send();
    next();
  };

  // Course Routes
  app.get(api.courses.list.path, async (req, res) => {
    const category = req.query.category as string | undefined;
    const courses = await storage.getCourses(category);
    res.json(courses);
  });

  app.get(api.courses.get.path, async (req, res) => {
    const course = await storage.getCourse(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  });

  app.post(api.courses.create.path, requireAdmin, async (req, res) => {
    try {
      const input = api.courses.create.input.parse(req.body);
      const course = await storage.createCourse(input);
      res.status(201).json(course);
    } catch (err) {
      if (err instanceof z.ZodError)
        res.status(400).json({ message: err.errors[0].message });
      else throw err;
    }
  });

  app.put(api.courses.update.path, requireAdmin, async (req, res) => {
    const course = await storage.updateCourse(req.params.id, req.body);
    res.json(course);
  });

  app.delete(api.courses.delete.path, requireAdmin, async (req, res) => {
    await storage.deleteCourse(req.params.id);
    res.status(204).send();
  });

  // Application Routes
  app.post(api.applications.create.path, async (req, res) => {
    try {
      const input = api.applications.create.input.parse({
        ...req.body,
        userId: req.user?.id || null,
        email: req.body.email || req.user?.email || null,
      });
      const app = await storage.createApplication(input);
      res.status(201).json(app);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        throw err;
      }
    }
  });

  app.get(api.applications.list.path, requireAdmin, async (req, res) => {
    const apps = await storage.getApplications();
    res.json(apps);
  });

  app.patch(
    api.applications.updateStatus.path,
    requireAdmin,
    async (req, res) => {
      const app = await storage.updateApplicationStatus(
        req.params.id,
        req.body.status
      );
      res.json(app);
    }
  );

  // Contact Routes
  app.post(api.contacts.create.path, async (req, res) => {
    const input = api.contacts.create.input.parse(req.body);
    const contact = await storage.createContact(input);
    res.status(201).json(contact);
  });

  // SEED DATA
  if (process.env.NODE_ENV !== 'production') {
    const existingCourses = await storage.getCourses();
    if (existingCourses.length === 0) {
      console.log('Seeding database...');

      // Admin User
      const adminPassword = await crypto.hash('admin123');
      await storage.createUser({
        username: 'admin',
        password: adminPassword,
        role: 'admin',
        fullName: 'System Admin',
        email: 'admin@bepro.com',
        phone: '01995-555588',
      });

      // Government Courses (NSDA)
      await storage.createCourse({
        title: 'Graphic Design',
        titleBn: 'গ্রাফিক ডিজাইন',
        category: 'NSDA',
        level: 'L-2',
        duration: '২৪ দিন',
        fee: 'Free',
        description: 'Professional graphic design training with industry-standard tools including Adobe Photoshop, Illustrator, and InDesign. NSDA certified course with job placement support.',
        descriptionBn: 'অ্যাডোবি ফটোশপ, ইলাস্ট্রেটর এবং ইনডিজাইন সহ শিল্প-মানের সরঞ্জাম দিয়ে পেশাদার গ্রাফিক ডিজাইন প্রশিক্ষণ।',
        features: ['Adobe Suite Training', 'Portfolio Development', 'NSDA Certificate', 'Job Placement Support'],
        isFeatured: true,
      });
      await storage.createCourse({
        title: 'Graphic Design Soft Training',
        titleBn: 'গ্রাফিক ডিজাইন সফট ট্রেনিং',
        category: 'NSDA',
        level: 'L-3',
        duration: '২৪ দিন',
        fee: 'Free',
        description: 'Advanced graphic design skills combined with soft skills integration for enhanced career success. Includes advanced typography, branding, and client communication.',
        descriptionBn: 'উন্নত টাইপোগ্রাফি, ব্র্যান্ডিং এবং ক্লায়েন্ট যোগাযোগ সহ উন্নত গ্রাফিক ডিজাইন দক্ষতা।',
        features: ['Advanced Design Techniques', 'Branding & Identity', 'Client Communication', 'Soft Skills Integration'],
      });
      await storage.createCourse({
        title: 'Digital Marketing Soft Training',
        titleBn: 'ডিজিটাল মার্কেটিং সফট ট্রেনিং',
        category: 'NSDA',
        level: 'L-3',
        duration: '২৪ দিন',
        fee: 'Free',
        description: 'Complete digital marketing training covering SEO, social media marketing, Google Ads, content marketing, and analytics with soft skills development.',
        descriptionBn: 'এসইও, সোশ্যাল মিডিয়া মার্কেটিং, গুগল অ্যাডস, কন্টেন্ট মার্কেটিং এবং অ্যানালিটিক্স সম্পূর্ণ ডিজিটাল মার্কেটিং প্রশিক্ষণ।',
        features: ['SEO & SEM', 'Social Media Marketing', 'Google Analytics', 'Content Strategy'],
        isFeatured: true,
      });

      // Private Courses
      await storage.createCourse({
        title: 'Entrepreneurship Development Training',
        titleBn: 'উদ্যোক্তা উন্নয়ন প্রশিক্ষণ',
        category: 'Professional',
        duration: '৭ দিন',
        fee: '৳২,০০০',
        description: 'Learn to start and grow your own business with practical entrepreneurship skills. Covers business planning, financial management, marketing, and legal requirements.',
        descriptionBn: 'ব্যবসা পরিকল্পনা, আর্থিক ব্যবস্থাপনা, মার্কেটিং এবং আইনি প্রয়োজনীয়তা সহ নিজের ব্যবসা শুরু করুন।',
        features: ['Business Planning', 'Financial Management', 'Marketing Strategy', 'Legal Compliance'],
      });
      await storage.createCourse({
        title: 'Corporate Training',
        titleBn: 'কর্পোরেট ট্রেনিং',
        category: 'Corporate',
        duration: 'Custom',
        fee: 'Contact Us',
        description: 'Tailored training programs for NGOs, banks, hospitals, and corporate organizations. Includes office etiquette, communication, and emotional intelligence.',
        descriptionBn: 'এনজিও, ব্যাংক, হাসপাতাল এবং কর্পোরেট সংস্থাগুলির জন্য কাস্টমাইজড প্রশিক্ষণ প্রোগ্রাম।',
        features: ['Office Etiquette', 'Professional Communication', 'Team Building', 'Leadership Skills'],
      });
      await storage.createCourse({
        title: 'Foreign Job Orientation',
        titleBn: 'বিদেশ চাকরি ওরিয়েন্টেশন',
        category: 'Professional',
        duration: '৭ দিন',
        fee: '৳২,০০০',
        description: 'Comprehensive preparation for overseas job seekers including CV writing, interview skills, basic English, and cultural orientation.',
        descriptionBn: 'সিভি লেখা, ইন্টারভিউ দক্ষতা, বেসিক ইংরেজি এবং সাংস্কৃতিক ওরিয়েন্টেশন সহ বিদেশী চাকরি প্রস্তুতি।',
        features: ['CV Writing', 'Interview Preparation', 'Basic English', 'Cultural Training'],
      });
      await storage.createCourse({
        title: 'Language Training',
        titleBn: 'ভাষা প্রশিক্ষণ',
        category: 'Language',
        duration: '৩০ দিন',
        fee: '৳৫,০০০ (German)',
        description: 'Professional English and German language training for career advancement and overseas opportunities.',
        descriptionBn: 'ক্যারিয়ার উন্নতি এবং বিদেশী সুযোগের জন্য পেশাদার ইংরেজি এবং জার্মান ভাষা প্রশিক্ষণ।',
        features: ['Conversational Skills', 'Business Language', 'Grammar & Writing', 'Cultural Context'],
        isFeatured: true,
      });
      await storage.createCourse({
        title: 'Higher Study Guidelines',
        titleBn: 'উচ্চশিক্ষা গাইডলাইন',
        category: 'Professional',
        duration: 'Consultation',
        fee: 'Contact Us',
        description: 'Expert guidance for students planning to pursue higher education abroad. Includes university selection, application process, and visa guidance.',
        descriptionBn: 'বিদেশে উচ্চশিক্ষার জন্য পরিকল্পনাকারী শিক্ষার্থীদের জন্য বিশেষজ্ঞ গাইডেন্স।',
        features: ['University Selection', 'Application Assistance', 'Visa Guidance', 'Scholarship Info'],
      });

      console.log('Seeding complete!');
    }
  }

  return httpServer;
}

import passport from 'passport';
