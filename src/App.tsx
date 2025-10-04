import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Problems from "./pages/Problems";
import Schedule from "./pages/Schedule";
import Team from "./pages/Team";
import Gallery from "./pages/Gallery";
import Authentication from "./pages/Authentication";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import VideoIntro from "./components/VideoIntro";
import InitialRouteHandler from "./components/InitialRouteHandler";
import { AudioProvider } from "./contexts/AudioContext";
import { AdminProvider } from "./contexts/AdminContext";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRegistrations from "./pages/admin/AdminRegistrations";
import RegistrationDetail from "./pages/admin/RegistrationDetail";
import SendBulkEmail from "./pages/admin/SendBulkEmail";
import AddTeam from "./pages/admin/AddTeam";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <>
      <InitialRouteHandler />
      <Routes>
        <Route path="/intro" element={<VideoIntro />} />
        <Route path="/" element={<Index />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/team" element={<Team />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/registrations" element={
          <AdminProtectedRoute>
            <AdminRegistrations />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/registration/:id" element={
          <AdminProtectedRoute>
            <RegistrationDetail />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/send-email" element={
          <AdminProtectedRoute>
            <SendBulkEmail />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/add-team" element={
          <AdminProtectedRoute>
            <AddTeam />
          </AdminProtectedRoute>
        } />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AudioProvider>
          <AdminProvider>
            <AppContent />
          </AdminProvider>
        </AudioProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
