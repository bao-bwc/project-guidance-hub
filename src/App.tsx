import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthenticatedLayout } from "@/components/layout/AuthenticatedLayout";
import PublicDashboard from "./pages/PublicDashboard";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PartMaster from "./pages/PartMaster";
import WorkOrder from "./pages/WorkOrder";
import Assembly from "./pages/Assembly";
import Testing from "./pages/Testing";
import Troubleshooting from "./pages/Troubleshooting";
import QualityControl from "./pages/QualityControl";
import Shipping from "./pages/Shipping";
import Administration from "./pages/Administration";
import Stockroom from "./pages/Stockroom";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicDashboard />} />
            <Route path="/login" element={<Login />} />
            
            {/* Authenticated Routes */}
            <Route element={<AuthenticatedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/part-master" element={<PartMaster />} />
              <Route path="/work-order" element={<WorkOrder />} />
              <Route path="/stockroom" element={<Stockroom />} />
              <Route path="/assembly" element={<Assembly />} />
              <Route path="/testing" element={<Testing />} />
              <Route path="/troubleshooting" element={<Troubleshooting />} />
              <Route path="/quality-control" element={<QualityControl />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/administration" element={<Administration />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
