import { useState } from "react";
import { Calendar, Clock, User, Plus, Filter, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddTherapyDialog } from "@/components/forms/AddTherapyDialog";

const therapyTypes = [
  { id: "speech", name: "Speech Therapy", color: "bg-blue-500" },
  { id: "occupational", name: "Occupational Therapy", color: "bg-green-500" },
  { id: "physiotherapy", name: "Physiotherapy", color: "bg-purple-500" },
  { id: "behavioral", name: "Behavioral Therapy", color: "bg-orange-500" }
];

const mockSessions = [
  {
    id: "1",
    student: "Sarah Johnson",
    admissionNumber: "CSS2024001",
    therapyType: "speech",
    therapist: "Dr. Emily Parker",
    date: "2024-01-20",
    time: "10:00 AM",
    duration: 45,
    status: "completed",
    notes: "Good progress with articulation exercises"
  },
  {
    id: "2", 
    student: "Michael Chen",
    admissionNumber: "CCDC2024025",
    therapyType: "physiotherapy",
    therapist: "James Wilson",
    date: "2024-01-20",
    time: "2:00 PM", 
    duration: 60,
    status: "scheduled",
    notes: ""
  },
  {
    id: "3",
    student: "Emma Williams",
    admissionNumber: "CSS2024033", 
    therapyType: "behavioral",
    therapist: "Dr. Maria Santos",
    date: "2024-01-21",
    time: "9:30 AM",
    duration: 30,
    status: "scheduled",
    notes: ""
  }
];

const therapists = [
  { name: "Dr. Emily Parker", specialty: "Speech Therapy", sessions: 12 },
  { name: "James Wilson", specialty: "Physiotherapy", sessions: 8 },
  { name: "Dr. Maria Santos", specialty: "Behavioral Therapy", sessions: 15 },
  { name: "Lisa Thompson", specialty: "Occupational Therapy", sessions: 10 }
];

export default function Therapies() {
  const [selectedTherapy, setSelectedTherapy] = useState("all");
  const [selectedDate, setSelectedDate] = useState("today");

  const filteredSessions = mockSessions.filter(session => {
    if (selectedTherapy === "all") return true;
    return session.therapyType === selectedTherapy;
  });

  const getTherapyColor = (type: string) => {
    const therapy = therapyTypes.find(t => t.id === type);
    return therapy?.color || "bg-gray-500";
  };

  const getTherapyName = (type: string) => {
    const therapy = therapyTypes.find(t => t.id === type);
    return therapy?.name || type;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Therapy Management</h1>
          <p className="text-muted-foreground mt-1">Schedule and track therapy sessions</p>
        </div>
        <div className="flex gap-2">
          <AddTherapyDialog />
        </div>
      </div>

      {/* Therapy Type Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {therapyTypes.map((therapy) => {
          const sessionCount = mockSessions.filter(s => s.therapyType === therapy.id).length;
          return (
            <Card key={therapy.id} className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{therapy.name}</p>
                    <p className="text-2xl font-bold text-foreground">{sessionCount}</p>
                  </div>
                  <div className={`h-10 w-10 rounded-full ${therapy.color} opacity-20`}></div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="sessions" className="space-y-4">
        <TabsList className="glass-tabs">
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="therapists">Therapists</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="space-y-4">
          {/* Filters */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={selectedTherapy} onValueChange={setSelectedTherapy}>
                  <SelectTrigger className="w-48 glass-input">
                    <SelectValue placeholder="Therapy Type" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    <SelectItem value="all">All Therapies</SelectItem>
                    {therapyTypes.map((therapy) => (
                      <SelectItem key={therapy.id} value={therapy.id}>
                        {therapy.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger className="w-40 glass-input">
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="glass-button-outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sessions List */}
          <div className="grid gap-4">
            {filteredSessions.map((session) => (
              <Card key={session.id} className="glass-card hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`h-4 w-4 rounded-full ${getTherapyColor(session.therapyType)}`}></div>
                      <div>
                        <h3 className="font-semibold text-foreground">{session.student}</h3>
                        <p className="text-sm text-muted-foreground">
                          Admission: {session.admissionNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-medium">{getTherapyName(session.therapyType)}</p>
                        <p className="text-sm text-muted-foreground">{session.therapist}</p>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{new Date(session.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{session.time} ({session.duration}min)</span>
                      </div>
                      <Badge 
                        variant={session.status === "completed" ? "default" : "secondary"}
                        className={session.status === "completed" ? "bg-success text-success-foreground" : ""}
                      >
                        {session.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {session.status}
                      </Badge>
                    </div>
                  </div>
                  {session.notes && (
                    <div className="mt-3 pt-3 border-t border-glass-border">
                      <p className="text-sm text-muted-foreground">{session.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="therapists" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {therapists.map((therapist, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {therapist.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{therapist.name}</h3>
                      <p className="text-sm text-muted-foreground">{therapist.specialty}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {therapist.sessions} sessions this month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground">Calendar View</h3>
                <p className="text-muted-foreground">
                  Interactive calendar for therapy session scheduling coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}