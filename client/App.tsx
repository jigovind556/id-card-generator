import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { DataProvider } from "./context/DataContext";
import PlaceholderPage from "./pages/PlaceholderPage";
import StudentForm from "./pages/StudentForm";
import StudentUpload from "./pages/StudentUpload";
import StudentPreview from "./pages/StudentPreview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DataProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students/add" element={<StudentForm />} />
              <Route path="/students/upload" element={<StudentUpload />} />
              <Route path="/students/preview" element={<StudentPreview />} />
              <Route path="/teachers/add" element={<PlaceholderPage title="Add Single Teacher" />} />
              <Route path="/teachers/upload" element={<PlaceholderPage title="Upload Teachers Excel" />} />
              <Route path="/teachers/preview" element={<PlaceholderPage title="Preview Teacher Cards" />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </DataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
