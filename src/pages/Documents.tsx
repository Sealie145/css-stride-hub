import { useState } from "react";
import { Upload, Search, Filter, FolderOpen, FileText, Download, Eye, Trash2, Share, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const documentFolders = [
  { id: "student-files", name: "Student Files", count: 127, description: "Individual student documentation" },
  { id: "iep-documents", name: "IEP Documents", count: 45, description: "IEP plans and assessments" },
  { id: "therapy-records", name: "Therapy Records", count: 89, description: "Therapy session notes and progress" },
  { id: "administrative", name: "Administrative", count: 23, description: "Administrative forms and policies" },
  { id: "templates", name: "Form Templates", count: 15, description: "Reusable form templates" },
  { id: "reports", name: "Generated Reports", count: 34, description: "System generated reports and analytics" }
];

const recentDocuments = [
  {
    id: "1",
    name: "IEP_Progress_Report_Sarah_Johnson_Q1_2024.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedBy: "Dr. Smith",
    uploadedDate: "2024-01-20",
    student: "Sarah Johnson",
    admissionNumber: "CSS2024001",
    category: "IEP Documents",
    shared: true,
    starred: false
  },
  {
    id: "2", 
    name: "Speech_Therapy_Assessment_Michael_Chen.docx",
    type: "Word Document",
    size: "1.8 MB",
    uploadedBy: "Dr. Parker",
    uploadedDate: "2024-01-18",
    student: "Michael Chen",
    admissionNumber: "CCDC2024025",
    category: "Therapy Records",
    shared: false,
    starred: true
  },
  {
    id: "3",
    name: "Home_Visit_Report_Emma_Williams.pdf", 
    type: "PDF",
    size: "956 KB",
    uploadedBy: "Ms. Thompson",
    uploadedDate: "2024-01-15",
    student: "Emma Williams",
    admissionNumber: "CSS2024033",
    category: "Student Files",
    shared: false,
    starred: false
  },
  {
    id: "4",
    name: "Behavioral_Intervention_Plan_Template.docx",
    type: "Word Document",
    size: "524 KB",
    uploadedBy: "System Admin",
    uploadedDate: "2024-01-10",
    student: null,
    admissionNumber: null,
    category: "Templates",
    shared: true,
    starred: true
  }
];

const sharedDocuments = [
  {
    id: "s1",
    name: "Monthly_Progress_Summary_January_2024.pdf",
    sharedWith: "All Staff",
    sharedBy: "Dr. Johnson",
    sharedDate: "2024-01-22",
    permissions: "View Only"
  },
  {
    id: "s2",
    name: "IEP_Meeting_Schedule_February.xlsx",
    sharedWith: "IEP Team",
    sharedBy: "Ms. Anderson",
    sharedDate: "2024-01-20",
    permissions: "Edit"
  },
  {
    id: "s3",
    name: "Therapy_Guidelines_Update_2024.pdf",
    sharedWith: "Therapy Staff",
    sharedBy: "Director",
    sharedDate: "2024-01-18",
    permissions: "View Only"
  }
];

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const filteredDocuments = recentDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (doc.student && doc.student.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (doc.admissionNumber && doc.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    const matchesType = selectedType === "all" || doc.type.toLowerCase().includes(selectedType.toLowerCase());
    return matchesSearch && matchesCategory && matchesType;
  });

  const getFileIcon = (type: string) => {
    if (type.toLowerCase().includes("pdf")) return "🗂️";
    if (type.toLowerCase().includes("word")) return "📝";
    if (type.toLowerCase().includes("excel")) return "📊";
    if (type.toLowerCase().includes("image")) return "🖼️";
    return "📄";
  };

  const getFileTypeColor = (type: string) => {
    if (type.toLowerCase().includes("pdf")) return "bg-red-100 text-red-800";
    if (type.toLowerCase().includes("word")) return "bg-blue-100 text-blue-800";
    if (type.toLowerCase().includes("excel")) return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Document Management</h1>
          <p className="text-muted-foreground mt-1">Organize, share, and manage institutional documents</p>
        </div>
        <Button className="glass-button-primary">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                <p className="text-2xl font-bold text-primary">333</p>
              </div>
              <FileText className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold text-accent">2.4 GB</p>
              </div>
              <FolderOpen className="h-8 w-8 text-accent/60" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Shared Files</p>
                <p className="text-2xl font-bold text-success">24</p>
              </div>
              <Share className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recent Uploads</p>
                <p className="text-2xl font-bold text-warning">12</p>
              </div>
              <Clock className="h-8 w-8 text-warning/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="browse" className="space-y-4">
        <TabsList className="glass-tabs">
          <TabsTrigger value="browse">Browse Documents</TabsTrigger>
          <TabsTrigger value="folders">Folders</TabsTrigger>
          <TabsTrigger value="shared">Shared Files</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          {/* Search and Filters */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents by name, student, or admission number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="glass-input pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 glass-input">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Student Files">Student Files</SelectItem>
                    <SelectItem value="IEP Documents">IEP Documents</SelectItem>
                    <SelectItem value="Therapy Records">Therapy Records</SelectItem>
                    <SelectItem value="Templates">Templates</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40 glass-input">
                    <SelectValue placeholder="File Type" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="word">Word Document</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="glass-button-outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Documents Table */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Document Library</CardTitle>
              <CardDescription>
                {filteredDocuments.length} of {recentDocuments.length} documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id} className="hover:bg-glass-hover">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{getFileIcon(doc.type)}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{doc.name}</span>
                            {doc.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                            {doc.shared && <Share className="h-4 w-4 text-blue-500" />}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {doc.student ? (
                          <div>
                            <p className="font-medium">{doc.student}</p>
                            <p className="text-sm text-muted-foreground">{doc.admissionNumber}</p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getFileTypeColor(doc.type)}>{doc.type}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{doc.size}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {doc.uploadedBy.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{doc.uploadedBy}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(doc.uploadedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Share className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
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

        <TabsContent value="folders" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentFolders.map((folder) => (
              <Card key={folder.id} className="glass-card hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FolderOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{folder.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{folder.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{folder.count} files</span>
                    <Button variant="ghost" size="sm">
                      Open Folder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shared" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Shared Documents</CardTitle>
              <CardDescription>
                Files shared with teams and individuals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sharedDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border border-glass-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Share className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Shared with {doc.sharedWith} by {doc.sharedBy}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">{doc.permissions}</Badge>
                      <p className="text-sm text-muted-foreground">
                        {new Date(doc.sharedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
                <p className="text-muted-foreground">
                  Track document uploads, edits, and sharing activity
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}