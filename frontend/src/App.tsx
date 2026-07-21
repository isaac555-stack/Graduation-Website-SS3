import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

// Lazy load page components to split the JS bundle
const FeedPage = lazy(() => import("@/pages/FeedPage"));
const ClassmatesPage = lazy(() => import("@/pages/ClassMatePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));

// Simple loading UI for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        {/* Suspense handles the loading state while lazy-loaded chunks download */}
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </DashboardLayout>
    </BrowserRouter>
  );
}
