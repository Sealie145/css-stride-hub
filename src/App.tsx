import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Therapies from "./pages/Therapies";
import IEPs from "./pages/IEPs";
import Forms from "./pages/Forms";
import Roles from "./pages/Roles";
import Reports from "./pages/Reports";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
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
              path="/" 
              element={user ? <Navigate to="/dashboard" replace /> : <Welcome />} 
            />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
            />
            
            {user ? (
              <Route element={<DashboardLayout user={user} onLogout={handleLogout} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Placeholder routes for future pages */}
                <Route path="/students" element={<Students />} />
                <Route path="/therapies" element={<Therapies />} />
                <Route path="/ieps" element={<IEPs />} />
                <Route path="/forms" element={<Forms />} />
                <Route path="/roles" element={<Roles />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />
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
