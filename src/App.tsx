import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Problems from "./pages/Problems";
import Schedule from "./pages/Schedule";
import Team from "./pages/Team";
import Authentication from "./pages/Authentication";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import VideoIntro from "./components/VideoIntro";
import InitialRouteHandler from "./components/InitialRouteHandler";
import { AudioProvider } from "./contexts/AudioContext";

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
        <Route path="/auth" element={<Authentication />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
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
          <AppContent />
        </AudioProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
