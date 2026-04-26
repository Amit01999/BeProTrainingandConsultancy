import { Switch, Route } from 'wouter';
import { queryClient } from './lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HelmetProvider } from 'react-helmet-async';
import EventPopupModal from '@/components/EventPopupModal';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';

// Pages
import Home from '@/pages/Home';
import SkillsBoost from '@/pages/SkillsBoost';
import Contact from '@/pages/Contact';
import AuthPage from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import AdminPage from '@/pages/Admin';
import NotFound from '@/pages/not-found';
import SkillsBoostPage from './pages/SkillsBoostPage';
import CorporateServicesPage from './pages/CorporateServicesPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetail from './pages/CourseDetail';
import BootcampPage from './pages/BootcampPage';
import WhyBepro from './pages/WhyBepro';

// ── Public layout: Navbar + Footer wrap all non-admin routes ──────────────────
function PublicLayout() {
  useScrollToTop();
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
      <Navbar />
      <main className="flex-grow w-full overflow-x-hidden">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/courses" component={CoursesPage} />
          <Route path="/courses/:slug" component={CourseDetail} />
          <Route path="/skills" component={SkillsBoost} />
          <Route path="/services" component={CorporateServicesPage} />
          <Route path="/skillsboost" component={SkillsBoostPage} />
          <Route path="/contact" component={Contact} />
          <Route path="/bootcamp" component={BootcampPage} />
          <Route path="/why-bepro" component={WhyBepro} />
          <Route path="/login" component={AuthPage} />
          <Route path="/register" component={AuthPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

// ── Root router: admin routes bypass public layout ────────────────────────────
function Router() {
  return (
    <Switch>
      {/* Admin panel — no Navbar/Footer, sidebar handles navigation */}
      <Route path="/admin" component={AdminPage} />
      <Route path="/admin/:section" component={AdminPage} />

      {/* All other routes get the public Navbar + Footer layout */}
      <Route component={PublicLayout} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
          <Toaster />
          {/* <EventPopupModal /> */}
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
