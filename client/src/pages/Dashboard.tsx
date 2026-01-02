import { useAuth } from "@/hooks/use-auth";
import { useApplications } from "@/hooks/use-applications";
import { useCourses } from "@/hooks/use-courses";
import { Loader2, BookOpen, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: applications, isLoading } = useApplications();
  
  if (isLoading) {
    return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;
  }

  // Filter only user's applications
  const myApplications = applications?.filter(app => app.userId === user?.id) || [];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-display font-bold text-slate-900 mb-8">
          Welcome back, {user?.fullName}!
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{myApplications.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {myApplications.filter(a => a.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {myApplications.filter(a => a.status === 'approved').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-bold mb-6">Your Applications</h2>
        
        {myApplications.length === 0 ? (
          <div className="bg-white p-12 rounded-xl text-center border border-dashed text-slate-500">
            No applications found. <a href="/courses" className="text-primary hover:underline">Browse courses</a> to apply.
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
             <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="p-4 font-semibold text-slate-700">Course</th>
                    <th className="p-4 font-semibold text-slate-700">Category</th>
                    <th className="p-4 font-semibold text-slate-700">Applied Date</th>
                    <th className="p-4 font-semibold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {myApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="p-4 font-medium">{app.course.title}</td>
                      <td className="p-4"><Badge variant="outline">{app.course.category}</Badge></td>
                      <td className="p-4 text-slate-500">
                        {new Date(app.appliedAt || "").toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        {app.status === "pending" && <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-none">Pending</Badge>}
                        {app.status === "approved" && <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-none">Approved</Badge>}
                        {app.status === "rejected" && <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-none">Rejected</Badge>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
