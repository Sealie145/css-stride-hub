import { useState } from "react";
import { BarChart, Calendar, Download, FileText, TrendingUp, Users, Target, Clock, Filter, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const reportTemplates = [
  {
    id: "iep-progress",
    name: "IEP Progress Report",
    description: "Comprehensive progress tracking across all active IEPs",
    category: "Academic",
    frequency: "Monthly",
    lastGenerated: "2024-01-15",
    status: "ready"
  },
  {
    id: "therapy-sessions",
    name: "Therapy Session Summary",
    description: "Overview of therapy sessions by type and attendance",
    category: "Therapy",
    frequency: "Weekly", 
    lastGenerated: "2024-01-20",
    status: "ready"
  },
  {
    id: "enrollment-trends",
    name: "Enrollment Trends Analysis",
    description: "Student enrollment patterns and demographic analysis",
    category: "Administrative",
    frequency: "Quarterly",
    lastGenerated: "2024-01-01",
    status: "scheduled"
  },
  {
    id: "teacher-workload",
    name: "Teacher Workload Report",
    description: "Distribution of students and IEPs across educators",
    category: "Administrative", 
    frequency: "Monthly",
    lastGenerated: "2024-01-10",
    status: "ready"
  },
  {
    id: "audit-log",
    name: "System Audit Log",
    description: "Detailed log of all system activities and changes",
    category: "Security",
    frequency: "Weekly",
    lastGenerated: "2024-01-22",
    status: "ready"
  },
  {
    id: "parent-engagement",
    name: "Parent Engagement Metrics",
    description: "Parent meeting attendance and communication tracking",
    category: "Communication",
    frequency: "Monthly",
    lastGenerated: "2024-01-18",
    status: "processing"
  }
];

const quickStats = [
  { label: "Total Reports Generated", value: "156", change: "+12%", trend: "up" },
  { label: "Scheduled Reports", value: "8", change: "0%", trend: "stable" },
  { label: "Active IEPs Tracked", value: "24", change: "+3", trend: "up" },
  { label: "Therapy Sessions (Month)", value: "342", change: "+15%", trend: "up" }
];

const scheduledReports = [
  { name: "Weekly Therapy Summary", nextRun: "2024-01-25", recipient: "therapy@css.edu" },
  { name: "Monthly IEP Progress", nextRun: "2024-02-01", recipient: "director@css.edu" },
  { name: "Quarterly Enrollment", nextRun: "2024-03-01", recipient: "admin@css.edu" },
  { name: "Weekly Audit Log", nextRun: "2024-01-29", recipient: "security@css.edu" }
];

export default function Reports() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const filteredReports = reportTemplates.filter(report => 
    selectedCategory === "all" || report.category.toLowerCase() === selectedCategory
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-success text-success-foreground";
      case "processing": return "bg-warning text-warning-foreground";
      case "scheduled": return "bg-primary text-primary-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready": return <FileText className="h-4 w-4" />;
      case "processing": return <Clock className="h-4 w-4" />;
      case "scheduled": return <Calendar className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-success" />;
      case "down": return <TrendingUp className="h-4 w-4 text-destructive rotate-180" />;
      default: return <div className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Generate insights and track institutional metrics</p>
        </div>
        <Button className="glass-button-primary">
          <FileText className="h-4 w-4 mr-2" />
          Create Custom Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    {stat.change !== "0%" && (
                      <div className="flex items-center gap-1">
                        {getTrendIcon(stat.trend)}
                        <span className={`text-sm ${
                          stat.trend === "up" ? "text-success" : 
                          stat.trend === "down" ? "text-destructive" : "text-muted-foreground"
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <BarChart className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList className="glass-tabs">
          <TabsTrigger value="reports">Report Library</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="analytics">Real-time Analytics</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          {/* Filters */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 glass-input">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="therapy">Therapy</SelectItem>
                    <SelectItem value="administrative">Administrative</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-40 glass-input">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="glass-button-outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="glass-card hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {report.description}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(report.status)}>
                      {getStatusIcon(report.status)}
                      <span className="ml-1">{report.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Category:</span>
                      <Badge variant="outline" className="text-xs">{report.category}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frequency:</span>
                      <span className="font-medium">{report.frequency}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Generated:</span>
                      <span className="font-medium">{new Date(report.lastGenerated).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="glass-button-outline flex-1"
                      disabled={report.status === "processing"}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      className="glass-button-primary flex-1"
                      disabled={report.status === "processing"}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Automated Report Schedule</CardTitle>
              <CardDescription>
                Manage automated report generation and distribution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {scheduledReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-glass-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{report.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Recipient: {report.recipient}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Next Run</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(report.nextRun).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Student Enrollment Trends</CardTitle>
                <CardDescription>Monthly enrollment patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart className="h-12 w-12 mx-auto mb-4" />
                    <p>Interactive charts coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>IEP Goal Completion Rate</CardTitle>
                <CardDescription>Progress across all active IEPs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Target className="h-12 w-12 mx-auto mb-4" />
                    <p>Goal tracking visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Therapy Session Attendance</CardTitle>
                <CardDescription>Weekly attendance by therapy type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Users className="h-12 w-12 mx-auto mb-4" />
                    <p>Attendance metrics dashboard</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Staff Workload Distribution</CardTitle>
                <CardDescription>Caseload balance across team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                    <p>Workload analytics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground">Custom Report Builder</h3>
                <p className="text-muted-foreground mb-4">
                  Create custom reports with drag-and-drop interface
                </p>
                <Button className="glass-button-primary">
                  Launch Report Builder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}