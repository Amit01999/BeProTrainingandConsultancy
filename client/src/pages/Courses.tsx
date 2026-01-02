import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Award, Briefcase, ArrowRight, Loader2, CheckCircle2, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useCourses } from "@/hooks/use-courses";
import { ApplicationModal } from "@/components/ApplicationModal";
import type { Course } from "@shared/schema";

const CoursesPage = () => {
  const { data: allCourses, isLoading } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const governmentCourses = allCourses?.filter((c) => c.category === "NSDA") || [];
  const privateCourses = allCourses?.filter((c) => c.category !== "NSDA") || [];

  const handleApplyNow = (course: Course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Courses | BePro Training & Consultancy</title>
        <meta name="description" content="Explore NSDA-approved government courses and private training programs. Graphic Design, Digital Marketing, Entrepreneurship, and more. কোর্সসমূহ দেখুন।" />
      </Helmet>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm font-medium shadow-lg">
              Skill Development Programs
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your <span className="text-accent bg-white/10 px-4 py-1 rounded-lg inline-block">Career</span>
            </h1>
            <p className="text-xl opacity-95 leading-relaxed font-bangla">
              এনএসডিএ অনুমোদিত সরকারি কোর্স এবং প্রাইভেট প্রশিক্ষণ প্রোগ্রাম
            </p>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <Tabs defaultValue="government" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-16 h-14 bg-white shadow-lg border-2 border-gray-100">
                <TabsTrigger
                  value="government"
                  className="flex items-center gap-2 text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <Award className="h-5 w-5" />
                  Government (NSDA)
                </TabsTrigger>
                <TabsTrigger
                  value="private"
                  className="flex items-center gap-2 text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <Briefcase className="h-5 w-5" />
                  Private
                </TabsTrigger>
              </TabsList>

              <TabsContent value="government">
                <div className="mb-12 text-center">
                  <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    NSDA Approved Courses
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Government-certified skill development programs with job placement support and industry recognition.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {governmentCourses.map((course) => (
                    <CourseCard key={course._id} course={course} onApplyNow={handleApplyNow} />
                  ))}
                  {governmentCourses.length === 0 && (
                    <div className="col-span-full text-center py-20">
                      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12">
                        <p className="text-muted-foreground text-lg">No government courses available at the moment.</p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="private">
                <div className="mb-12 text-center">
                  <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Private Training Programs
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Specialized courses for career advancement, entrepreneurship, and professional development.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {privateCourses.map((course) => (
                    <CourseCard key={course._id} course={course} onApplyNow={handleApplyNow} />
                  ))}
                  {privateCourses.length === 0 && (
                    <div className="col-span-full text-center py-20">
                      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12">
                        <p className="text-muted-foreground text-lg">No private courses available at the moment.</p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="container text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-lg mb-8 font-bangla opacity-95 max-w-2xl mx-auto">
            আপনার জন্য সঠিক কোর্স বেছে নিতে আমাদের সাথে যোগাযোগ করুন
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-xl text-lg px-8 py-6 h-auto">
            <a href="/contact">
              Contact Us
              <ArrowRight className="ml-2 h-6 w-6" />
            </a>
          </Button>
        </div>
      </section>

      <ApplicationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        course={selectedCourse}
      />
    </>
  );
};

interface CourseCardProps {
  course: Course;
  onApplyNow: (course: Course) => void;
}

const CourseCard = ({ course, onApplyNow }: CourseCardProps) => {
  const isGovernment = course.category === "NSDA";
  const features = course.features && course.features.length > 0
    ? course.features
    : (isGovernment
      ? ["NSDA Certified", "Job Placement Support", "Industry Standard Tools", "Expert Instructors"]
      : ["Professional Training", "Flexible Schedule", "Expert Guidance", "Practical Skills"]);

  return (
    <Card className="h-full flex flex-col group hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden relative">
      {/* Accent bar on top */}
      <div className={`h-2 ${isGovernment ? 'bg-gradient-to-r from-primary to-primary/70' : 'bg-gradient-to-r from-secondary to-secondary/70'}`} />

      {/* Featured badge */}
      {course.isFeatured && (
        <div className="absolute top-6 right-6 z-10">
          <Badge className="bg-accent text-white shadow-lg px-3 py-1.5 flex items-center gap-1">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </Badge>
        </div>
      )}

      <CardHeader className="pb-4 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <Badge
            variant={isGovernment ? "default" : "secondary"}
            className="px-4 py-1.5 text-sm font-semibold"
          >
            {isGovernment ? "NSDA" : course.category}
            {course.level && ` • ${course.level}`}
          </Badge>
          {course.fee && (
            <span className="text-xl font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg">
              {course.fee}
            </span>
          )}
        </div>

        <div>
          <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors leading-tight">
            {course.title}
          </CardTitle>
          <CardDescription className="font-bangla text-base leading-relaxed">
            {course.titleBn}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {course.description}
        </p>

        {course.duration && (
          <div className="flex items-center gap-3 text-sm bg-gray-50 rounded-lg p-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Duration</p>
              <p className="font-bangla font-semibold text-foreground">{course.duration}</p>
            </div>
          </div>
        )}

        <div className="space-y-2.5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">What You'll Learn</p>
          <div className="space-y-2">
            {features.slice(0, 4).map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground leading-tight">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-6 mt-auto">
        <Button
          variant="default"
          className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg text-base py-6 font-semibold group-hover:shadow-xl transition-all"
          onClick={() => onApplyNow(course)}
        >
          Apply Now
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CoursesPage;
