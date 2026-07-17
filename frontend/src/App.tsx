import { useState } from "react";
import { DashboardLayout, type TabValue } from "@/components/DashboardLayout";
import FeedPage from "@/pages/FeedPage";
import ClassmatesPage from "@/pages/ClassMatePage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabValue>("feed");

  // This function decides which page to display based on the active tab
  const renderPage = () => {
    switch (currentTab) {
      case "feed":
        return <FeedPage />;
      case "profiles":
        return <ClassmatesPage />;
      case "messages":
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-4xl mb-4">💬</span>
            <h2 className="text-xl font-bold text-slate-800">Class Chat Hub</h2>
            <p className="text-slate-500 text-sm max-w-xs mt-1">
              Connect with your classmates and share live gossip. Coming soon!
            </p>
          </div>
        );
      case "about":
        return <AboutPage />;
      default:
        return <FeedPage />;
    }
  };

  return (
    <DashboardLayout activeTab={currentTab} onTabChange={setCurrentTab}>
      {renderPage()}
    </DashboardLayout>
  );
}
