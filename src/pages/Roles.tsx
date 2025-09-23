import { useState } from "react";
import { Shield, Users, Plus, Search, Edit, Trash2, Copy, Settings, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const predefinedRoles = [
  { 
    id: "social-worker", 
    name: "Social Worker", 
    description: "CCDC assessment and family coordination",
    color: "bg-blue-500",
    users: 3,
    permissions: { 
      students: { view: true, edit: true, create: true, delete: false },
      therapy: { view: true, edit: false, create: false, delete: false },
      ieps: { view: true, edit: false, create: false, delete: false }
    }
  },
  { 
    id: "speech-therapist", 
    name: "Speech Therapist", 
    description: "Speech and language therapy services",
    color: "bg-green-500",
    users: 4,
    permissions: { 
      students: { view: true, edit: false, create: false, delete: false },
      therapy: { view: true, edit: true, create: true, delete: false },
      ieps: { view: true, edit: true, create: false, delete: false }
    }
  },
  { 
    id: "psychologist", 
    name: "Psychologist (Behavioral)", 
    description: "Behavioral assessment and intervention",
    color: "bg-purple-500",
    users: 2,
    permissions: { 
      students: { view: true, edit: false, create: false, delete: false },
      therapy: { view: true, edit: true, create: true, delete: false },
      ieps: { view: true, edit: true, create: false, delete: false }
    }
  },
  { 
    id: "occupational-therapist", 
    name: "Occupational Therapist", 
    description: "Occupational therapy and life skills",
    color: "bg-orange-500",
    users: 3,
    permissions: { 
      students: { view: true, edit: false, create: false, delete: false },
      therapy: { view: true, edit: true, create: true, delete: false },
      ieps: { view: true, edit: true, create: false, delete: false }
    }
  },
  { 
    id: "physiotherapist", 
    name: "Physiotherapist", 
    description: "Physical therapy and motor development",
    color: "bg-red-500",
    users: 2,
    permissions: { 
      students: { view: true, edit: false, create: false, delete: false },
      therapy: { view: true, edit: true, create: true, delete: false },
      ieps: { view: true, edit: true, create: false, delete: false }
    }
  },
  { 
    id: "special-educator", 
    name: "Special Educator / Class Teacher", 
    description: "Educational planning and classroom management",
    color: "bg-indigo-500",
    users: 8,
    permissions: { 
      students: { view: true, edit: true, create: false, delete: false },
      therapy: { view: true, edit: false, create: false, delete: false },
      ieps: { view: true, edit: true, create: true, delete: false }
    }
  },
  { 
    id: "iep-coordinator", 
    name: "IEP Coordinator", 
    description: "IEP process coordination and oversight",
    color: "bg-teal-500",
    users: 2,
    permissions: { 
      students: { view: true, edit: false, create: false, delete: false },
      therapy: { view: true, edit: false, create: false, delete: false },
      ieps: { view: true, edit: true, create: true, delete: true }
    }
  },
  { 
    id: "ccdc-coordinator", 
    name: "CCDC Coordinator", 
    description: "CCDC program management and oversight",
    color: "bg-cyan-500",
    users: 1,
    permissions: { 
      students: { view: true, edit: true, create: true, delete: false },
      therapy: { view: true, edit: false, create: false, delete: false },
      ieps: { view: true, edit: false, create: false, delete: false }
    }
  },
  { 
    id: "office-executive", 
    name: "Office Executive", 
    description: "Administrative and office management",
    color: "bg-gray-500",
    users: 2,
    permissions: { 
      students: { view: true, edit: true, create: false, delete: false },
      therapy: { view: false, edit: false, create: false, delete: false },
      ieps: { view: false, edit: false, create: false, delete: false }
    }
  },
  { 
    id: "director", 
    name: "Director", 
    description: "Full administrative access and oversight",
    color: "bg-gold-500",
    users: 1,
    permissions: { 
      students: { view: true, edit: true, create: true, delete: true },
      therapy: { view: true, edit: true, create: true, delete: true },
      ieps: { view: true, edit: true, create: true, delete: true }
    }
  },
  { 
    id: "admin", 
    name: "System Administrator", 
    description: "Complete system access and user management",
    color: "bg-black",
    users: 1,
    permissions: { 
      students: { view: true, edit: true, create: true, delete: true },
      therapy: { view: true, edit: true, create: true, delete: true },
      ieps: { view: true, edit: true, create: true, delete: true }
    }
  }
];

const mockUsers = [
  { id: "1", name: "Dr. Sarah Johnson", email: "sarah.johnson@css.edu", role: "Director", status: "active" },
  { id: "2", name: "Michael Chen", email: "michael.chen@css.edu", role: "Speech Therapist", status: "active" },
  { id: "3", name: "Emma Williams", email: "emma.williams@css.edu", role: "Social Worker", status: "active" },
  { id: "4", name: "James Wilson", email: "james.wilson@css.edu", role: "Physiotherapist", status: "active" },
  { id: "5", name: "Dr. Maria Santos", email: "maria.santos@css.edu", role: "Psychologist (Behavioral)", status: "inactive" }
];

const modules = [
  { id: "students", name: "Students Management", description: "Student records and profiles" },
  { id: "therapy", name: "Therapy Services", description: "Therapy sessions and records" },
  { id: "ieps", name: "IEP Management", description: "Individual Education Plans" },
  { id: "forms", name: "Forms & Documentation", description: "Form templates and submissions" },
  { id: "reports", name: "Reports & Analytics", description: "Reporting and data analysis" },
  { id: "settings", name: "System Settings", description: "Application configuration" }
];

export default function Roles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const filteredRoles = predefinedRoles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Roles & Permissions</h1>
          <p className="text-muted-foreground mt-1">Manage user roles and access permissions</p>
        </div>
        <Button className="glass-button-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create Custom Role
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Roles</p>
                <p className="text-2xl font-bold text-primary">{predefinedRoles.length}</p>
              </div>
              <Shield className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-success">{mockUsers.filter(u => u.status === 'active').length}</p>
              </div>
              <Users className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Modules</p>
                <p className="text-2xl font-bold text-accent">{modules.length}</p>
              </div>
              <Settings className="h-8 w-8 text-accent/60" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Custom Roles</p>
                <p className="text-2xl font-bold text-muted-foreground">0</p>
              </div>
              <Plus className="h-8 w-8 text-muted-foreground/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList className="glass-tabs">
          <TabsTrigger value="roles">Role Management</TabsTrigger>
          <TabsTrigger value="users">User Assignment</TabsTrigger>
          <TabsTrigger value="permissions">Permission Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          {/* Search */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search roles by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="glass-input pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRoles.map((role) => (
              <Card key={role.id} className="glass-card hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-4 w-4 rounded-full ${role.color}`}></div>
                      <div>
                        <CardTitle className="text-lg">{role.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {role.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{role.users} users assigned</span>
                    <Badge variant="outline" className="text-xs">
                      Predefined
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="glass-button-outline flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="glass-button-outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>User Role Assignments</CardTitle>
              <CardDescription>
                Manage user role assignments and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Current Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-glass-hover">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={user.status === "active" 
                            ? "bg-success text-success-foreground" 
                            : "bg-secondary text-secondary-foreground"
                          }
                        >
                          {user.status === "active" ? <CheckCircle className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
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

        <TabsContent value="permissions" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>
                Configure module permissions for each role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Module</TableHead>
                      {predefinedRoles.slice(0, 6).map((role) => (
                        <TableHead key={role.id} className="text-center min-w-[120px]">
                          <div className="flex items-center justify-center gap-2">
                            <div className={`h-3 w-3 rounded-full ${role.color}`}></div>
                            <span className="text-xs">{role.name.split(' ')[0]}</span>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modules.map((module) => (
                      <TableRow key={module.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{module.name}</p>
                            <p className="text-sm text-muted-foreground">{module.description}</p>
                          </div>
                        </TableCell>
                        {predefinedRoles.slice(0, 6).map((role) => (
                          <TableCell key={`${module.id}-${role.id}`} className="text-center">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center justify-center gap-1">
                                <span className="text-xs text-muted-foreground">V</span>
                                <Switch 
                                  checked={role.permissions[module.id as keyof typeof role.permissions]?.view}
                                />
                              </div>
                              <div className="flex items-center justify-center gap-1">
                                <span className="text-xs text-muted-foreground">E</span>
                                <Switch 
                                  checked={role.permissions[module.id as keyof typeof role.permissions]?.edit}
                                />
                              </div>
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                V = View Permission, E = Edit Permission
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}