import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import logoImage from "@/assets/christ-special-school-logo.png";
import classroomImage from "@/assets/classroom-scene.jpg";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(true);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any credentials
      if (email && password) {
        // Store user session (in real app, this would be JWT or similar)
        localStorage.setItem('user', JSON.stringify({
          name: 'Dr. Sarah Johnson',
          email: email,
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

  const handleBackToWelcome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Background Welcome Page Content */}
      <header className="w-full px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src={logoImage} 
            alt="Christ Special School Logo" 
            className="h-12 w-12 object-contain"
          />
          <h1 className="text-xl font-semibold text-blue-600">Knowledge Pro Portal</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            onClick={() => setShowLoginDialog(true)}
          >
            Sign In
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                Empowering Special Education with{" "}
                <span className="text-blue-600">Knowledge Pro Portal</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                A comprehensive management system designed specifically for Christ 
                Special School, enabling seamless collaboration between educators, 
                therapists, and families to support every student's unique learning 
                journey.
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button 
                onClick={() => setShowLoginDialog(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg"
              >
                Get Started
              </Button>
              <Button 
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="relative">
            <img 
              src={classroomImage} 
              alt="Special education classroom" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Students Supported</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Expert Therapists</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm border border-blue-100 rounded-2xl p-8 shadow-lg">
            <blockquote className="text-lg text-blue-800 italic leading-relaxed">
              "The Knowledge Pro Portal has transformed how we manage our special 
              education programs, making collaboration seamless and progress tracking 
              more effective."
            </blockquote>
            <cite className="block mt-4 text-blue-600 font-semibold">
              - Dr. Sarah Johnson, Director
            </cite>
          </div>
        </div>
      </main>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl">
          <DialogHeader className="text-center space-y-4">
            <div className="mx-auto">
              <img 
                src={logoImage} 
                alt="Christ Special School Logo" 
                className="h-16 w-16 object-contain mx-auto mb-3"
              />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-800">Welcome Back</DialogTitle>
              <p className="text-gray-600 mt-1">Sign in to your account</p>
            </div>
          </DialogHeader>

          <form onSubmit={handleLogin} className="space-y-5 mt-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/20 backdrop-blur-sm placeholder:text-gray-500 text-gray-800 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-white/20 rounded-xl bg-white/20 backdrop-blur-sm placeholder:text-gray-500 text-gray-800 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600/90 hover:bg-blue-700/90 backdrop-blur-sm text-white py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl border border-blue-500/20"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;