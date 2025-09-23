import { useState } from "react";
import { Search, Filter, Plus, Eye, Edit, FileText, Printer, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockStudents = [
  {
    id: "1",
    admissionNumber: "CSS2024001",
    name: "Sarah Johnson",
    age: 8,
    class: "Grade 3A",
    diagnosis: "Autism Spectrum Disorder",
    therapists: ["Speech", "Occupational"],
    lastIEP: "2024-01-15",
    status: "Active",
    center: "CSS"
  },
  {
    id: "2", 
    admissionNumber: "CCDC2024025",
    name: "Michael Chen",
    age: 6,
    class: "Early Intervention",
    diagnosis: "Developmental Delay",
    therapists: ["Physiotherapy", "Speech"],
    lastIEP: "2024-02-20",
    status: "Active",
    center: "CCDC"
  },
  {
    id: "3",
    admissionNumber: "CSS2024033",
    name: "Emma Williams", 
    age: 10,
    class: "Grade 5B",
    diagnosis: "Learning Disability",
    therapists: ["Behavioral"],
    lastIEP: "2024-01-30",
    status: "Active",
    center: "CSS"
  }
];

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [centerFilter, setCenterFilter] = useState("all");

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCenter = centerFilter === "all" || student.center === centerFilter;
    return matchesSearch && matchesCenter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students Directory</h1>
          <p className="text-muted-foreground mt-1">Manage student records and information</p>
        </div>
        <Button className="glass-button-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add New Student
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-primary">127</p>
              </div>
              <Users className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">CSS Center</p>
                <p className="text-2xl font-bold text-accent">84</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-xs font-bold text-accent">CSS</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">CCDC Center</p>
                <p className="text-2xl font-bold text-accent">43</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-xs font-bold text-accent">CCDC</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active IEPs</p>
                <p className="text-2xl font-bold text-success">98</p>
              </div>
              <FileText className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by Admission Number or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input pl-10"
              />
            </div>
            <Select value={centerFilter} onValueChange={setCenterFilter}>
              <SelectTrigger className="w-40 glass-input">
                <SelectValue placeholder="Center" />
              </SelectTrigger>
              <SelectContent className="glass-card">
                <SelectItem value="all">All Centers</SelectItem>
                <SelectItem value="CSS">CSS</SelectItem>
                <SelectItem value="CCDC">CCDC</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="glass-button-outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Student Records</CardTitle>
          <CardDescription>
            {filteredStudents.length} of {mockStudents.length} students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Admission #</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Class/Unit</TableHead>
                <TableHead>Primary Diagnosis</TableHead>
                <TableHead>Therapies</TableHead>
                <TableHead>Last IEP</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-glass-hover">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.center}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{student.admissionNumber}</TableCell>
                  <TableCell>{student.age} years</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.diagnosis}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {student.therapists.map((therapy) => (
                        <Badge key={therapy} variant="secondary" className="text-xs">
                          {therapy}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(student.lastIEP).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}