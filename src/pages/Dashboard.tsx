import { Users, Calendar, FileText, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "247",
      change: "+12 this month",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Upcoming IEP Reviews",
      value: "23",
      change: "Next 30 days",
      icon: FileText,
      color: "text-orange-600",
    },
    {
      title: "Today's Sessions",
      value: "18",
      change: "8 completed",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Pending Actions",
      value: "7",
      change: "Requires attention",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ];

  const recentActivities = [
    {
      student: "Arjun Kumar",
      admission: "CSS001234",
      action: "IEP Goal achieved - Motor Skills Development",
      time: "2 hours ago",
      type: "success",
    },
    {
      student: "Priya Sharma",
      admission: "CSS001235",
      action: "Speech Therapy session completed",
      time: "4 hours ago",
      type: "info",
    },
    {
      student: "Rahul Patel",
      admission: "CSS001236",
      action: "IEP Review scheduled for next week",
      time: "1 day ago",
      type: "warning",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back to Christ Special School Staff Portal
          </p>
        </div>
        <Button variant="institutional" className="gap-2">
          <Users className="h-4 w-4" />
          New Student
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest updates from your students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.student}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      ({activity.admission})
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Schedule IEP Meeting</div>
                <div className="text-sm text-muted-foreground">Set up parent meetings and reviews</div>
              </div>
            </Button>
            <Button variant="ghost" className="w-full justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Record Therapy Session</div>
                <div className="text-sm text-muted-foreground">Log progress and observations</div>
              </div>
            </Button>
            <Button variant="ghost" className="w-full justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Generate Reports</div>
                <div className="text-sm text-muted-foreground">Progress summaries and analytics</div>
              </div>
            </Button>
            <Button variant="ghost" className="w-full justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Manage Roles</div>
                <div className="text-sm text-muted-foreground">User permissions and access</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Calendar/Schedule Preview */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Today's Schedule
          </CardTitle>
          <CardDescription>Upcoming therapy sessions and meetings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: "09:00", student: "Arjun Kumar", type: "Speech Therapy", therapist: "Ms. Anita" },
              { time: "10:30", student: "Priya Sharma", type: "Occupational Therapy", therapist: "Mr. Rajesh" },
              { time: "14:00", student: "Rahul Patel", type: "IEP Meeting", therapist: "Team Meeting" },
              { time: "15:30", student: "Sneha Gupta", type: "Behavioral Therapy", therapist: "Dr. Kumar" },
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-mono text-primary font-medium">
                    {session.time}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{session.student}</div>
                    <div className="text-xs text-muted-foreground">
                      {session.type} • {session.therapist}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;