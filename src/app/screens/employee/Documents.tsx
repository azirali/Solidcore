import { useState } from "react";
import { documents } from "../../data/mockData";
import { Search, FileText, CheckCircle2, ChevronRight, Filter } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { useNavigate } from "react-router";

export function Documents() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");

  const categories = ["Все", "Безопасность", "СОП", "Охрана труда"];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Все" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl mb-3" style={{ color: "#1A2B4A" }}>
          Инструкции и регламенты
        </h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Поиск документов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "shadow-sm"
                  : ""
              }`}
              style={{
                backgroundColor: selectedCategory === category ? "#1A2B4A" : "#f3f4f6",
                color: selectedCategory === category ? "white" : "#6b7280"
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Documents List */}
      <div className="p-4 space-y-3">
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-gray-600">Документы не найдены</p>
          </div>
        ) : (
          filteredDocuments.map((doc) => (
            <button
              key={doc.id}
              onClick={() => navigate(`/employee/documents/${doc.id}`)}
              className="w-full bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#f0f9ff" }}
                >
                  <FileText className="w-6 h-6" style={{ color: "#1A2B4A" }} />
                </div>

                {/* Content */}
                <div className="flex-1 text-left min-w-0">
                  <h3 className="text-base mb-1" style={{ color: "#1A2B4A" }}>
                    {doc.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge
                      variant="outline"
                      className="text-xs px-2 py-0.5"
                      style={{ borderColor: "#1A2B4A", color: "#1A2B4A" }}
                    >
                      {doc.category}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {doc.pages} стр.
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{doc.date}</span>
                    {doc.read && (
                      <div className="flex items-center gap-1 text-xs" style={{ color: "#34C759" }}>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Прочитано</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
            </button>
          ))
        )}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
