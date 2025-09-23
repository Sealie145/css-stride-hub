import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
            />
            
            {/* Protected routes */}
            <Route 
              path="/" 
              element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
            />
            
            {user ? (
              <Route element={<DashboardLayout user={user} onLogout={handleLogout} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Placeholder routes for future pages */}
                <Route path="/students" element={<div className="p-6"><h1 className="text-2xl font-bold">Students Directory</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
                <Route path="/therapies" element={<div className="p-6"><h1 className="text-2xl font-bold">Therapies</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
                <Route path="/ieps" element={<div className="p-6"><h1 className="text-2xl font-bold">IEPs</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
                <Route path="/forms" element={<div className="p-6"><h1 className="text-2xl font-bold">Forms</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
                <Route path="/roles" element={<div className="p-6"><h1 className="text-2xl font-bold">Roles & Permissions</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
                <Route path="/reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Reports</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
                <Route path="/documents" element={<div className="p-6"><h1 className="text-2xl font-bold">Documents</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
                <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
                <Route path="/help" element={<div className="p-6"><h1 className="text-2xl font-bold">Help & Support</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
              </Route>
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
            
            {/* Catch-all 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
