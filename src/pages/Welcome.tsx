import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/christ-special-school-logo.png";
import classroomImage from "@/assets/classroom-scene.jpg";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Header */}
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
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Sign In
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
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
                onClick={() => navigate('/login')}
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

          {/* Right Image */}
          <div className="relative">
            <img 
              src={classroomImage} 
              alt="Special education classroom" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Statistics */}
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

        {/* Testimonial */}
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
    </div>
  );
};

export default Welcome;