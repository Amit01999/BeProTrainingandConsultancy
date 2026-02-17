import { Switch, Route } from 'wouter';
import { queryClient } from './lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HelmetProvider } from 'react-helmet-async';
import EventPopupModal from '@/components/EventPopupModal';

// Pages
import Home from '@/pages/Home';
import Courses from '@/pages/Courses';
import CourseDetails from '@/pages/CourseDetails';
import SkillsBoost from '@/pages/SkillsBoost';
import Contact from '@/pages/Contact';
import AuthPage from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import AdminDashboard from '@/pages/Admin';
import NotFound from '@/pages/not-found';
import SkillsBoostPage from './pages/SkillsBoostPage';
import CorporateServicesPage from './pages/CorporateServicesPage';
// import Courses2 from './pages/Courses2';
import CoursesPage from './pages/Courses';
import CoursesPage1 from './pages/CoursesPage1';
import CourseDetail1 from './pages/CourseDetail1';
import Courses2 from './pages/Courses2';
import BootcampPage from './pages/BootcampPage';

function Router() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
      <Navbar />
      <main className="flex-grow w-full overflow-x-hidden">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/courses" component={CoursesPage1} />
          {/* <Route path="/courses-page" component={CoursesPage} /> */}
          <Route path="/courses-page" component={Courses2} />
          <Route path="/courses1/:id" component={CourseDetail1} />
          <Route path="/courses/:id" component={CourseDetails} />
          <Route path="/skills" component={SkillsBoost} />
          <Route path="/services" component={CorporateServicesPage} />
          <Route path="/skillsboost" component={SkillsBoostPage} />
          <Route path="/contact" component={Contact} />
          <Route path="/bootcamp" component={BootcampPage} />
          <Route path="/login" component={AuthPage} />
          <Route path="/register" component={AuthPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/admin" component={AdminDashboard} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
          <Toaster />
          <EventPopupModal />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
