import { useState } from "react";
import { Eye, EyeOff, Globe, Type, Contrast } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import christLogo from "@/assets/christ-special-school-logo.png";

interface LoginCardProps {
  onLogin: (credentials: { email: string; password: string }) => void;
}

export const LoginCard = ({ onLogin }: LoginCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState("en");
  const [highContrast, setHighContrast] = useState(false);
  const [largeFonts, setLargeFonts] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="glass-card w-full max-w-md p-8 space-y-6 fade-in">
      {/* Logo and Header */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-24 h-16 flex items-center justify-center">
          <img 
            src={christLogo} 
            alt="Christ Special School Logo" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">Staff Portal</h1>
          <p className="text-sm text-muted-foreground font-medium">Christ Special School</p>
          <p className="text-xs text-muted-foreground mt-1">
            Use your institutional credentials. Contact admin for access.
          </p>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email / Username
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="glass-input"
            placeholder="your.name@christspecialschool.org"
            required
            aria-describedby="email-help"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input pr-10"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="text-right">
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <Button 
          type="submit" 
          className="w-full btn-institutional"
          size="lg"
        >
          Sign In
        </Button>
      </form>

      {/* Accessibility Options */}
      <div className="pt-4 border-t border-glass-border space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Accessibility Options</h3>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Language Selector */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm">Language</Label>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-24 h-8 glass-input text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="kn">ಕನ್ನಡ</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Accessibility Toggles */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm">Large Fonts</Label>
            </div>
            <button
              type="button"
              onClick={() => setLargeFonts(!largeFonts)}
              className={`w-8 h-4 rounded-full transition-colors ${
                largeFonts ? 'bg-primary' : 'bg-muted'
              }`}
              aria-label="Toggle large fonts"
            >
              <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                largeFonts ? 'translate-x-4' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Contrast className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm">High Contrast</Label>
            </div>
            <button
              type="button"
              onClick={() => setHighContrast(!highContrast)}
              className={`w-8 h-4 rounded-full transition-colors ${
                highContrast ? 'bg-primary' : 'bg-muted'
              }`}
              aria-label="Toggle high contrast"
            >
              <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                highContrast ? 'translate-x-4' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};