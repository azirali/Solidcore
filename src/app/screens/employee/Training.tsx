import { trainingMaterials } from "../../data/mockData";
import { GraduationCap, Play, FileText, BookOpen } from "lucide-react";
import { Badge } from "../../components/ui/badge";

export function Training() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "course":
        return BookOpen;
      case "video":
        return Play;
      case "article":
        return FileText;
      default:
        return GraduationCap;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "course":
        return "Курс";
      case "video":
        return "Видео";
      case "article":
        return "Статья";
      default:
        return "Материал";
    }
  };

  const getStatusColor = (progress: number) => {
    if (progress === 100) return "#34C759";
    if (progress > 0) return "#FF9500";
    return "#9CA3AF";
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl mb-1" style={{ color: "#1A2B4A" }}>
          Обучающие материалы
        </h1>
        <p className="text-sm text-gray-600">
          Курсы, видеоуроки и статьи
        </p>
      </div>

      {/* Statistics */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-2xl mb-1" style={{ color: "#1A2B4A" }}>
              {trainingMaterials.length}
            </div>
            <div className="text-xs text-gray-600">Всего курсов</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-2xl mb-1" style={{ color: "#34C759" }}>
              {trainingMaterials.filter(m => m.progress === 100).length}
            </div>
            <div className="text-xs text-gray-600">Завершено</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-2xl mb-1" style={{ color: "#FF9500" }}>
              {trainingMaterials.filter(m => m.progress > 0 && m.progress < 100).length}
            </div>
            <div className="text-xs text-gray-600">В процессе</div>
          </div>
        </div>

        {/* Materials List */}
        <div className="space-y-4">
          {trainingMaterials.map((material) => {
            const TypeIcon = getTypeIcon(material.type);
            const statusColor = getStatusColor(material.progress);

            return (
              <div
                key={material.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all"
              >
                {/* Thumbnail */}
                <div className="relative h-40 bg-gray-200">
                  <img
                    src={material.thumbnail}
                    alt={material.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Type Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge
                      className="px-3 py-1 text-xs"
                      style={{ backgroundColor: "white", color: "#1A2B4A" }}
                    >
                      <TypeIcon className="w-3 h-3 mr-1" />
                      {getTypeLabel(material.type)}
                    </Badge>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-3 right-3">
                    <div className="bg-black/70 px-2 py-1 rounded text-xs text-white">
                      {material.duration}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-base mb-2" style={{ color: "#1A2B4A" }}>
                    {material.title}
                  </h3>

                  {material.type === "course" && material.lessons && (
                    <p className="text-sm text-gray-600 mb-3">
                      {material.completedLessons}/{material.lessons} уроков завершено
                    </p>
                  )}

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${material.progress}%`,
                          backgroundColor: statusColor
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: statusColor }}>
                        {material.progress === 100
                          ? "✓ Завершено"
                          : material.progress > 0
                          ? `${material.progress}% выполнено`
                          : "Не начато"}
                      </span>
                      <button
                        className="text-sm px-4 py-2 rounded-lg transition-all"
                        style={{
                          backgroundColor: material.progress === 100 ? "#f3f4f6" : "#1A2B4A",
                          color: material.progress === 100 ? "#6b7280" : "white"
                        }}
                      >
                        {material.progress === 100
                          ? "Повторить"
                          : material.progress > 0
                          ? "Продолжить"
                          : "Начать"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}