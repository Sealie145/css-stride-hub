import { useState } from "react";
import { Search, BookOpen, MessageCircle, Video, FileText, Mail, Phone, ExternalLink, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const helpTopics = [
  {
    title: "Getting Started",
    icon: "🚀",
    articles: [
      "Setting up your first IEP",
      "Adding student records", 
      "Understanding user roles",
      "Navigation overview"
    ]
  },
  {
    title: "Student Management",
    icon: "👥",
    articles: [
      "Creating student profiles",
      "Admission number system",
      "Managing student documents",
      "Tracking therapy assignments"
    ]
  },
  {
    title: "IEP Management",
    icon: "📋",
    articles: [
      "Creating instructional plans",
      "Progress tracking methods",
      "Team meeting coordination",
      "Parent communication"
    ]
  },
  {
    title: "Therapy Services",
    icon: "🎯",
    articles: [
      "Scheduling therapy sessions",
      "Recording session notes",
      "Progress documentation",
      "Multi-disciplinary coordination"
    ]
  },
  {
    title: "Reports & Analytics",
    icon: "📊",
    articles: [
      "Generating progress reports",
      "Custom report creation",
      "Data export options",
      "Scheduling automated reports"
    ]
  },
  {
    title: "Security & Permissions",
    icon: "🔒",
    articles: [
      "Role-based access control",
      "Data privacy compliance",
      "Audit trail management",
      "Backup procedures"
    ]
  }
];

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "How do I reset my password?",
        a: "You can reset your password by clicking the 'Forgot Password' link on the login page, or contact your system administrator for assistance."
      },
      {
        q: "What browsers are supported?",
        a: "The system works best with modern browsers including Chrome, Firefox, Safari, and Edge. Make sure your browser is up to date for the best experience."
      },
      {
        q: "How do I update my profile information?",
        a: "Go to Settings > Profile to update your personal information, contact details, and preferences."
      }
    ]
  },
  {
    category: "Students",
    questions: [
      {
        q: "How do I add a new student to the system?",
        a: "Navigate to Students > Add New Student. Fill in the required information including admission number, personal details, and initial assessment data."
      },
      {
        q: "Can I transfer a student between centers?",
        a: "Yes, students can be transferred between CSS and CCDC centers. Contact your administrator to process the transfer and update records."
      },
      {
        q: "What documents are required for student enrollment?",
        a: "Required documents include medical reports, previous educational records, family information, and any relevant assessments or diagnoses."
      }
    ]
  },
  {
    category: "IEPs",
    questions: [
      {
        q: "How often should IEPs be reviewed?",
        a: "IEPs should be reviewed quarterly (June, August, December, March) or as needed based on student progress and team recommendations."
      },
      {
        q: "Who can edit IEP goals?",
        a: "IEP goals can be edited by assigned teachers, coordinators, and authorized team members based on their role permissions."
      },
      {
        q: "How do I schedule an IEP team meeting?",
        a: "Use the Calendar feature to schedule meetings and automatically notify all team members including parents, teachers, and therapists."
      }
    ]
  },
  {
    category: "Technical",
    questions: [
      {
        q: "Why am I getting permission denied errors?",
        a: "This indicates your user role doesn't have access to that feature. Contact your administrator to review your permissions."
      },
      {
        q: "How do I export student data?",
        a: "Use the Reports section to generate and export student data. Ensure you have appropriate permissions for data export."
      },
      {
        q: "Is my data automatically backed up?",
        a: "Yes, the system performs automatic daily backups. For additional security, you can also manually export important data."
      }
    ]
  }
];

const contactOptions = [
  {
    type: "Technical Support",
    description: "Get help with system issues and technical problems",
    icon: <MessageCircle className="h-5 w-5" />,
    contact: "support@css.edu",
    hours: "Mon-Fri 8AM-6PM"
  },
  {
    type: "Training & Guidance", 
    description: "Learn how to use features and best practices",
    icon: <Video className="h-5 w-5" />,
    contact: "training@css.edu",
    hours: "Mon-Fri 9AM-5PM"
  },
  {
    type: "Administrative Support",
    description: "Account setup, permissions, and policy questions",
    icon: <Phone className="h-5 w-5" />,
    contact: "+1 (555) 123-4567",
    hours: "Mon-Fri 8AM-5PM"
  },
  {
    type: "Emergency Support",
    description: "Urgent issues affecting student care or safety",
    icon: <Mail className="h-5 w-5" />,
    contact: "emergency@css.edu",
    hours: "24/7 Response"
  }
];

export default function Help() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      item => 
        item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
        <p className="text-muted-foreground mt-2">
          Find answers, get guidance, and connect with our support team
        </p>
      </div>

      {/* Search */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search help articles, FAQs, and documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input pl-12 text-center"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="documentation" className="space-y-4">
        <TabsList className="glass-tabs grid w-full grid-cols-4">
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="videos">Video Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="documentation" className="space-y-6">
          {/* Quick Start */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Quick Start Guide
              </CardTitle>
              <CardDescription>
                Essential steps to get started with the Christ Special School system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 border border-glass-border rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <span className="text-sm">Set up your profile and preferences</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-glass-border rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span className="text-sm">Learn about user roles and permissions</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 border border-glass-border rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <span className="text-sm">Add your first student record</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-glass-border rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <span className="text-sm">Create and manage IEPs</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Topics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {helpTopics.map((topic, index) => (
              <Card key={index} className="glass-card hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">{topic.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">{topic.title}</h3>
                      <div className="space-y-2">
                        {topic.articles.map((article, articleIndex) => (
                          <div key={articleIndex} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary cursor-pointer">
                            <ChevronRight className="h-3 w-3" />
                            {article}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faqs" className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline">{category.category}</Badge>
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, index) => (
                      <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))
          ) : searchTerm ? (
            <Card className="glass-card">
              <CardContent className="p-6 text-center">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try different keywords or browse our documentation section
                </p>
              </CardContent>
            </Card>
          ) : null}
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Getting Started Tutorial",
              "Student Management Walkthrough", 
              "IEP Creation Guide",
              "Therapy Session Tracking",
              "Reports and Analytics",
              "User Roles & Permissions"
            ].map((title, index) => (
              <Card key={index} className="glass-card hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Step-by-step video guide covering key features and workflows
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">5-10 min</Badge>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Watch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactOptions.map((option, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{option.type}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{option.contact}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{option.hours}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="glass-button-outline mt-4">
                        Contact Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* System Information */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>
                Information to help support diagnose issues faster
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>System Version:</strong> v2024.1.0</p>
                  <p><strong>Last Update:</strong> January 15, 2024</p>
                  <p><strong>Browser:</strong> Chrome 120.0.0.0</p>
                </div>
                <div>
                  <p><strong>User Role:</strong> Director</p>
                  <p><strong>Institution:</strong> Christ Special School</p>
                  <p><strong>Session ID:</strong> css-session-2024-001</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}