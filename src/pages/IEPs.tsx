import { useState } from "react";
import { Plus, Search, Target, TrendingUp, Calendar, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { AddIEPDialog } from "@/components/forms/AddIEPDialog";

const mockIEPs = [
  {
    id: "1",
    student: "Sarah Johnson",
    admissionNumber: "CSS2024001",
    goals: 4,
    completedGoals: 2,
    progress: 65,
    lastReview: "2024-01-15",
    nextReview: "2024-03-15",
    status: "active",
    coordinator: "Dr. Smith"
  },
  {
    id: "2",
    student: "Michael Chen", 
    admissionNumber: "CCDC2024025",
    goals: 6,
    completedGoals: 4,
    progress: 78,
    lastReview: "2024-01-10",
    nextReview: "2024-03-10", 
    status: "active",
    coordinator: "Ms. Johnson"
  },
  {
    id: "3",
    student: "Emma Williams",
    admissionNumber: "CSS2024033",
    goals: 3,
    completedGoals: 1,
    progress: 45,
    lastReview: "2024-01-20",
    nextReview: "2024-03-20",
    status: "needs_review",
    coordinator: "Dr. Brown"
  }
];

const upcomingReviews = [
  { student: "Alex Martinez", date: "2024-01-25", type: "Quarterly Review" },
  { student: "Sophie Davis", date: "2024-01-28", type: "Goal Assessment" },
  { student: "Ryan Thompson", date: "2024-02-01", type: "Parent Meeting" },
  { student: "Maya Patel", date: "2024-02-05", type: "Team Meeting" }
];

const recentGoals = [
  {
    student: "Sarah Johnson",
    goal: "Improve verbal communication skills",
    progress: 85,
    status: "on_track",
    dueDate: "2024-02-15"
  },
  {
    student: "Michael Chen", 
    goal: "Develop fine motor skills for writing",
    progress: 92,
    status: "completed",
    dueDate: "2024-01-30"
  },
  {
    student: "Emma Williams",
    goal: "Enhance social interaction abilities",
    progress: 60,
    status: "needs_attention",
    dueDate: "2024-02-20"
  }
];

export default function IEPs() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIEPs = mockIEPs.filter(iep => 
    iep.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    iep.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "needs_review": return "bg-warning text-warning-foreground";
      case "completed": return "bg-primary text-primary-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-success";
      case "on_track": return "text-primary";
      case "needs_attention": return "text-warning";
      default: return "text-muted-foreground";
    }
  };

  const getGoalStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "on_track": return <TrendingUp className="h-4 w-4" />;
      case "needs_attention": return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Individual Education Plans</h1>
          <p className="text-muted-foreground mt-1">Manage and track student IEPs and goals</p>
        </div>
        <AddIEPDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active IEPs</p>
                <p className="text-2xl font-bold text-primary">24</p>
              </div>
              <FileText className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Goals</p>
                <p className="text-2xl font-bold text-accent">127</p>
              </div>
              <Target className="h-8 w-8 text-accent/60" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Goals</p>
                <p className="text-2xl font-bold text-success">89</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Progress</p>
                <p className="text-2xl font-bold text-accent">72%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ieps" className="space-y-4">
        <TabsList className="glass-tabs">
          <TabsTrigger value="ieps">IEP Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals Tracking</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="ieps" className="space-y-4">
          {/* Search */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search IEPs by student name or admission number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="glass-input pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* IEP List */}
          <div className="grid gap-4">
            {filteredIEPs.map((iep) => (
              <Card key={iep.id} className="glass-card hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {iep.student.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{iep.student}</h3>
                        <p className="text-sm text-muted-foreground">
                          Admission: {iep.admissionNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Coordinator: {iep.coordinator}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(iep.status)}>
                      {iep.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Overall Progress</span>
                        <span className="font-medium">{iep.progress}%</span>
                      </div>
                      <Progress value={iep.progress} className="h-2" />
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Goals Progress</p>
                      <p className="text-lg font-semibold">
                        {iep.completedGoals}/{iep.goals} completed
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Next Review</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {new Date(iep.nextReview).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="glass-button-outline">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="glass-button-outline">
                      Edit Goals
                    </Button>
                    <Button variant="outline" size="sm" className="glass-button-outline">
                      Progress Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid gap-4">
            {recentGoals.map((goal, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={getGoalStatusColor(goal.status)}>
                          {getGoalStatusIcon(goal.status)}
                        </div>
                        <h3 className="font-semibold text-foreground">{goal.goal}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Student: {goal.student} • Due: {new Date(goal.dueDate).toLocaleDateString()}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Upcoming Reviews</CardTitle>
              <CardDescription>
                Scheduled IEP reviews and meetings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingReviews.map((review, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-glass-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{review.student}</p>
                    <p className="text-sm text-muted-foreground">{review.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground">IEP Reports</h3>
                <p className="text-muted-foreground">
                  Generate and view comprehensive IEP progress reports
                </p>
                <Button className="glass-button-primary mt-4">
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}