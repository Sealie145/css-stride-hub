import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Search, Bell, Menu, User, LogOut } from "lucide-react";
import logoImage from "@/assets/christ-special-school-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/AppSidebar";

interface DashboardLayoutProps {
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  onLogout: () => void;
}

export const DashboardLayout = ({ user, onLogout }: DashboardLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle global search by admission number or name
    console.log("Searching for:", searchQuery);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-glass-border glass-card flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />
              
              {/* Logo */}
              <div className="flex items-center gap-3">
                <img 
                  src={logoImage} 
                  alt="Christ Special School Logo" 
                  className="h-8 w-8 object-contain"
                />
                <div className="hidden md:block">
                  <h2 className="text-lg font-semibold text-primary">Christ Special School</h2>
                  <p className="text-xs text-muted-foreground">Staff Portal</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-1 max-w-md mx-4">
              {/* Global Search */}
              <form onSubmit={handleSearch} className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by Admission Number or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input pl-10"
                />
              </form>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs"></span>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 h-10">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">{user?.name || 'User'}</p>
                      <p className="text-xs text-muted-foreground">{user?.role || 'Staff'}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 glass-card">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-gradient-to-br from-background to-muted/20">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};