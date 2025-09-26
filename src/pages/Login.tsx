import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginCard } from "@/components/auth/LoginCard";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any credentials
      if (credentials.email && credentials.password) {
        // Store user session (in real app, this would be JWT or similar)
        localStorage.setItem('user', JSON.stringify({
          name: 'Dr. Sarah Johnson',
          email: credentials.email,
          role: 'IEP Coordinator',
          avatar: null
        }));
        
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to Staff Portal.",
        });
        
        // Dispatch custom event to notify app of login
        window.dispatchEvent(new Event('userLoggedIn'));
        
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-primary/5 p-4">
      <div className="w-full max-w-md">
        <LoginCard onLogin={handleLogin} />
        {isLoading && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              Signing you in...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;