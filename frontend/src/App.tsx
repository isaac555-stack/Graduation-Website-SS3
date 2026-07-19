import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import FeedPage from "@/pages/FeedPage";
import ClassmatesPage from "@/pages/ClassMatePage";
import AboutPage from "@/pages/AboutPage";

export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/profiles" element={<ClassmatesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/messages"
            element={
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-4xl mb-4 animate-bounce">💬</span>
                <h2 className="text-xl font-display font-bold text-slate-800">
                  Class Chat Hub
                </h2>
                <p className="text-slate-500 text-sm max-w-xs mt-1 font-medium">
                  Connect with your classmates and share live updates. Coming
                  soon!
                </p>
              </div>
            }
          />
          {/* Catch-all fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
