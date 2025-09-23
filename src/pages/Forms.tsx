import { useState } from "react";
import { FileText, Plus, Search, Download, Eye, Edit, Calendar, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const formTemplates = [
  { 
    id: "instructional-plan", 
    name: "Instructional Plan", 
    description: "Individual goal-based instructional planning",
    category: "IEP",
    fields: 8
  },
  { 
    id: "instruction-progression", 
    name: "Instruction Progression Format", 
    description: "Step-by-step skill progression tracking",
    category: "IEP", 
    fields: 12
  },
  { 
    id: "steps-data-collection", 
    name: "Instructional Steps Data Collection", 
    description: "Data collection for instructional steps",
    category: "Assessment",
    fields: 15
  },
  { 
    id: "trial-data-collection", 
    name: "Instructional Trial Data Collection", 
    description: "Trial-based data collection with T1-T10 format",
    category: "Assessment",
    fields: 20
  },
  { 
    id: "team-meeting-report", 
    name: "IEP Team Meeting Student Report", 
    description: "Therapist input for team meetings",
    category: "Reports",
    fields: 10
  },
  { 
    id: "parent-meeting", 
    name: "IEP Parent Meeting Form", 
    description: "Parent meeting documentation and sign-off",
    category: "Communication",
    fields: 6
  },
  { 
    id: "progress-report", 
    name: "IEP Progress Report", 
    description: "Comprehensive progress tracking and analysis",
    category: "Reports",
    fields: 25
  },
  { 
    id: "home-visit", 
    name: "Home Visit Form", 
    description: "Home visit documentation for teachers and social workers",
    category: "Field Work",
    fields: 18
  }
];

const mockFormSubmissions = [
  {
    id: "1",
    formName: "Instructional Plan",
    student: "Sarah Johnson", 
    admissionNumber: "CSS2024001",
    submittedBy: "Ms. Anderson",
    submittedDate: "2024-01-20",
    status: "completed",
    reviewDate: "2024-01-22"
  },
  {
    id: "2",
    formName: "Trial Data Collection",
    student: "Michael Chen",
    admissionNumber: "CCDC2024025", 
    submittedBy: "Dr. Parker",
    submittedDate: "2024-01-18",
    status: "pending_review",
    reviewDate: null
  },
  {
    id: "3",
    formName: "Home Visit Form",
    student: "Emma Williams",
    admissionNumber: "CSS2024033",
    submittedBy: "Ms. Thompson",
    submittedDate: "2024-01-15",
    status: "in_progress", 
    reviewDate: null
  }
];

export default function Forms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const categories = ["all", "IEP", "Assessment", "Reports", "Communication", "Field Work"];
  
  const filteredForms = mockFormSubmissions.filter(form => {
    const matchesSearch = form.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.formName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || form.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success text-success-foreground";
      case "pending_review": return "bg-warning text-warning-foreground";
      case "in_progress": return "bg-primary text-primary-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "pending_review": return <AlertTriangle className="h-4 w-4" />;
      case "in_progress": return <Clock className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Forms Management</h1>
          <p className="text-muted-foreground mt-1">Create, manage, and track institutional forms</p>
        </div>
        <Button className="glass-button-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create New Form
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Forms</p>
                <p className="text-2xl font-bold text-primary">45</p>
              </div>
              <FileText className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-success">32</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-warning">8</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning/60" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-accent">5</p>
              </div>
              <Clock className="h-8 w-8 text-accent/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="submissions" className="space-y-4">
        <TabsList className="glass-tabs">
          <TabsTrigger value="submissions">Form Submissions</TabsTrigger>
          <TabsTrigger value="templates">Form Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="submissions" className="space-y-4">
          {/* Filters */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search forms by student, admission number, or form name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="glass-input pl-10"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48 glass-input">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending_review">Pending Review</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Forms Table */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>
                {filteredForms.length} of {mockFormSubmissions.length} forms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Form Type</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Admission #</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredForms.map((form) => (
                    <TableRow key={form.id} className="hover:bg-glass-hover">
                      <TableCell className="font-medium">{form.formName}</TableCell>
                      <TableCell>{form.student}</TableCell>
                      <TableCell className="font-mono text-sm">{form.admissionNumber}</TableCell>
                      <TableCell>{form.submittedBy}</TableCell>
                      <TableCell>{new Date(form.submittedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(form.status)}>
                          {getStatusIcon(form.status)}
                          <span className="ml-1">{form.status.replace('_', ' ')}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formTemplates.map((template) => (
              <Card key={template.id} className="glass-card hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {template.description}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{template.fields} fields</span>
                    <span>Template</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="glass-button-outline flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" className="glass-button-primary flex-1">
                      <Plus className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground">Form Analytics</h3>
                <p className="text-muted-foreground">
                  Detailed analytics and reporting for form submissions and completion rates
                </p>
                <Button className="glass-button-primary mt-4">
                  Generate Analytics Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}