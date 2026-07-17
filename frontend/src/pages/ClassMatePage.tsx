import { useState } from "react";
import { Search } from "lucide-react";
import { classmatesData, type Classmate } from "../data/classmates";
import { ClassmateCard } from "@/components/ClassmateCard";
import { ProfileModal } from "@/components/ProfileModal";

export default function ClassmatesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // States to handle modal view
  const [selectedClassmate, setSelectedClassmate] = useState<Classmate | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Safely searches through names, nicknames, and school positions
  const filteredClassmates = classmatesData.filter((c) => {
    const query = searchQuery.toLowerCase();
    const matchesName = c.name.toLowerCase().includes(query);
    const matchesNickname = c.nickname
      ? c.nickname.toLowerCase().includes(query)
      : false;
    const matchesPosition = c.positionHeld
      ? c.positionHeld.toLowerCase().includes(query)
      : false;

    return matchesName || matchesNickname || matchesPosition;
  });

  const handleClassmateClick = (id: string) => {
    // Find classmate data by ID
    const found = classmatesData.find((c) => c.id === id);
    if (found) {
      setSelectedClassmate(found);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4  border-b border-slate-100 pb-6">
        <div>
          {/* Main heading updated with Display Font */}
          <h1 className="text-2xl md:text-4xl font-display font-black text-slate-900">
            Meet the SS3 Graduates
          </h1>
          <p className="text-sm text-slate-500 mt-1.5">
            Browse profiles, read quotes, and celebrate our journey.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="w-full md:w-80 flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2.5 text-slate-500 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-200">
          <Search className="size-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search classmate, nickname or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Grid Layout */}
      {filteredClassmates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredClassmates.map((classmate) => (
            <ClassmateCard
              key={classmate.id}
              classmate={classmate}
              onClick={handleClassmateClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-500 text-sm font-medium">
            No classmates found matching your search.
          </p>
        </div>
      )}

      {/* Render the Profile Modal */}
      <ProfileModal
        classmate={selectedClassmate}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedClassmate(null);
        }}
      />
    </div>
  );
}
