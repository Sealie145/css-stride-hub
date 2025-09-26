import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/christ-special-school-logo.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header with Sign In */}
      <header className="w-full p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src={logoImage} 
            alt="Christ Special School Logo" 
            className="h-12 w-12 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold text-primary">Christ Special School</h1>
            <p className="text-sm text-muted-foreground">Excellence in Special Education</p>
          </div>
        </div>
        <Button 
          onClick={() => navigate('/login')}
          variant="institutional"
          className="gap-2"
        >
          Sign In
        </Button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-6">
            Welcome to Christ Special School
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Empowering individuals with special needs through comprehensive education, 
            therapy services, and individualized care. Our dedicated staff portal 
            streamlines student management and therapeutic interventions.
          </p>
          <Button 
            onClick={() => navigate('/login')}
            variant="institutional"
            size="lg"
            className="gap-2"
          >
            Access Staff Portal
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="glass-card text-center">
            <CardHeader>
              <CardTitle className="text-primary">Student Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Comprehensive student profiles, admission tracking, and progress monitoring 
                for personalized care and education.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardHeader>
              <CardTitle className="text-primary">Therapy Services</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Integrated therapy management including speech, occupational, 
                physiotherapy, and behavioral interventions.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardHeader>
              <CardTitle className="text-primary">IEP Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Digital Individual Education Plan creation, tracking, and progress 
                reporting with collaborative team features.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <div className="text-center">
          <Card className="glass-card max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">About Our Institution</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p className="text-muted-foreground">
                Christ Special School is dedicated to providing exceptional education and support 
                services for individuals with special needs. Our comprehensive approach combines 
                academic learning with therapeutic interventions to ensure holistic development.
              </p>
              <p className="text-muted-foreground">
                Our multidisciplinary team of educators, therapists, and support staff work 
                collaboratively to create individualized programs that address each student's 
                unique needs and potential. Through evidence-based practices and compassionate 
                care, we strive to empower our students to achieve their maximum potential.
              </p>
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={() => navigate('/login')}
                  variant="outline"
                >
                  Learn More About Our Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-glass-border bg-muted/20 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 Christ Special School. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;