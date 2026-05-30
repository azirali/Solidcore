import { useState } from "react";
import { useNavigate } from "react-router";
import { moodHistory } from "../../data/mockData";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";

const moodEmojis = ["😞", "😕", "😐", "🙂", "😄"];
const moodLabels = ["Плохо", "Грустно", "Нормально", "Хорошо", "Отлично"];

export function MoodHistory() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Group mood history by month
  const groupedByMonth: { [key: string]: typeof moodHistory } = {};
  moodHistory.forEach((entry) => {
    const date = new Date(entry.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (!groupedByMonth[monthKey]) {
      groupedByMonth[monthKey] = [];
    }
    groupedByMonth[monthKey].push(entry);
  });

  const getMonthName = (monthKey: string) => {
    const [year, month] = monthKey.split("-");
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString("ru-RU", { month: "long", year: "numeric" });
  };

  const calculateAverageMood = (entries: typeof moodHistory) => {
    const sum = entries.reduce((acc, entry) => acc + entry.mood, 0);
    return (sum / entries.length).toFixed(1);
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 4.5) return "#34C759";
    if (mood >= 3.5) return "#FF9500";
    return "#EF4444";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-3 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад</span>
        </button>

        <h1 className="text-xl" style={{ color: "#1A2B4A" }}>
          История настроения
        </h1>
      </div>

      <div className="p-4">
        {/* Overall Statistics */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="w-5 h-5" style={{ color: "#1A2B4A" }} />
            <h2 className="text-base" style={{ color: "#1A2B4A" }}>
              Общая статистика
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-3 text-center">
              <div className="text-2xl mb-1" style={{ color: "#1A2B4A" }}>
                {moodHistory.length}
              </div>
              <div className="text-xs text-gray-600">Дней записано</div>
            </div>
            <div className="bg-white rounded-xl p-3 text-center">
              <div className="text-2xl mb-1" style={{ color: "#34C759" }}>
                {calculateAverageMood(moodHistory)}
              </div>
              <div className="text-xs text-gray-600">Средний балл</div>
            </div>
            <div className="bg-white rounded-xl p-3 text-center">
              <div className="text-2xl">
                {moodEmojis[Math.round(Number(calculateAverageMood(moodHistory))) - 1] || "😐"}
              </div>
              <div className="text-xs text-gray-600">Общее</div>
            </div>
          </div>
        </div>

        {/* Mood Distribution */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
          <h3 className="text-base mb-4" style={{ color: "#1A2B4A" }}>
            Распределение настроения
          </h3>

          <div className="space-y-3">
            {moodEmojis.map((emoji, index) => {
              const moodValue = index + 1;
              const count = moodHistory.filter((entry) => entry.mood === moodValue).length;
              const percentage = Math.round((count / moodHistory.length) * 100);

              return (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{emoji}</span>
                      <span className="text-gray-700">{moodLabels[index]}</span>
                    </div>
                    <span className="text-gray-600">{count} дней</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: getMoodColor(moodValue)
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Calendar View by Month */}
        <div className="space-y-4">
          {Object.entries(groupedByMonth)
            .sort((a, b) => b[0].localeCompare(a[0]))
            .map(([monthKey, entries]) => {
              const avgMood = calculateAverageMood(entries);

              return (
                <div key={monthKey} className="bg-white rounded-2xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base" style={{ color: "#1A2B4A" }}>
                      {getMonthName(monthKey)}
                    </h3>
                    <div
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: `${getMoodColor(Number(avgMood))}15`,
                        color: getMoodColor(Number(avgMood))
                      }}
                    >
                      ø {avgMood}
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {entries
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((entry) => {
                        const date = new Date(entry.date);
                        const dayNumber = date.getDate();
                        const isSelected = selectedDate === entry.date;

                        return (
                          <button
                            key={entry.date}
                            onClick={() => setSelectedDate(isSelected ? null : entry.date)}
                            className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${
                              isSelected ? "shadow-md scale-105" : "hover:bg-gray-50"
                            }`}
                            style={{
                              backgroundColor: isSelected ? `${getMoodColor(entry.mood)}15` : "#f9fafb",
                              borderWidth: isSelected ? "2px" : "1px",
                              borderStyle: "solid",
                              borderColor: isSelected ? getMoodColor(entry.mood) : "#e5e7eb"
                            }}
                          >
                            <span className="text-xs text-gray-500 mb-1">{dayNumber}</span>
                            <span className="text-xl">{moodEmojis[entry.mood - 1]}</span>
                          </button>
                        );
                      })}
                  </div>

                  {selectedDate && entries.some((e) => e.date === selectedDate) && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        {new Date(selectedDate).toLocaleDateString("ru-RU", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </p>
                      <p className="text-base mt-1" style={{ color: "#1A2B4A" }}>
                        Настроение: {moodLabels[entries.find((e) => e.date === selectedDate)!.mood - 1]}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
