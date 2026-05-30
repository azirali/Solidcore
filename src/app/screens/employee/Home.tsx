import { useState } from "react";
import { currentUser, notifications } from "../../data/mockData";
import { Badge } from "../../components/ui/badge";
import { Bell, Calendar, CheckCircle2, Clock } from "lucide-react";
import { useNavigate } from "react-router";

const moodEmojis = ["😞", "😕", "😐", "🙂", "😄"];
const moodLabels = ["Плохо", "Грустно", "Нормально", "Хорошо", "Отлично"];

export function EmployeeHome() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodSaved, setMoodSaved] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMoodSelect = (moodValue: number) => {
    setSelectedMood(moodValue);
    setMoodSaved(true);
  };

  const stats = [
    {
      icon: CheckCircle2,
      label: "Тесты пройдено",
      value: "12",
      color: "#34C759",
      onClick: () => navigate("/employee/tests")
    },
    {
      icon: Bell,
      label: "Непрочитанные",
      value: unreadCount.toString(),
      color: "#FF9500",
      badge: true
    },
    {
      icon: Clock,
      label: "До дедлайна",
      value: "3 дня",
      color: "#1A2B4A"
    },
  ];

  return (
    <div className="min-h-screen p-4 pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl mb-1" style={{ color: "#1A2B4A" }}>
          Добрый день, {currentUser.fullName.split(" ")[1]}!
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <Badge
            className="px-3 py-1 text-sm"
            style={{ backgroundColor: "#1A2B4A", color: "white" }}
          >
            {currentUser.profession}
          </Badge>
          <span className="text-sm text-gray-600">{currentUser.department}</span>
        </div>
      </div>

      {/* Mood Selector */}
      {!moodSaved && (
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
          <h2 className="text-base mb-3" style={{ color: "#1A2B4A" }}>
            Как ваше настроение сегодня?
          </h2>
          <div className="flex justify-between gap-2 overflow-x-auto">
            {moodEmojis.map((emoji, index) => {
              const moodValue = index + 1;
              const isSelected = selectedMood === moodValue;
              
              return (
                <button
                  key={index}
                  onClick={() => handleMoodSelect(moodValue)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all flex-shrink-0 ${
                    isSelected ? "shadow-md scale-105" : "hover:bg-gray-50"
                  }`}
                  style={{
                    backgroundColor: isSelected ? "#f0f9ff" : "transparent",
                    borderWidth: isSelected ? "2px" : "1px",
                    borderStyle: "solid",
                    borderColor: isSelected ? "#1A2B4A" : "#e5e7eb",
                    minWidth: "60px"
                  }}
                >
                  <span className="text-2xl leading-none">{emoji}</span>
                  <span className="text-xs text-gray-600 whitespace-nowrap">{moodLabels[index]}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      {moodSaved && (
        <p className="text-sm text-center mt-3" style={{ color: "#34C759" }}>
          ✓ Настроение сохранено
        </p>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <button
              key={index}
              onClick={stat.onClick}
              className="bg-white rounded-2xl shadow-sm p-4 flex flex-col items-center text-center hover:shadow-md transition-all"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <Icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <div className="text-2xl mb-1" style={{ color: "#1A2B4A" }}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-600 leading-tight">
                {stat.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Recent Notifications */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base" style={{ color: "#1A2B4A" }}>
            Последние уведомления
          </h2>
          {unreadCount > 0 && (
            <Badge
              className="px-2 py-1 text-xs"
              style={{ backgroundColor: "#FF9500", color: "white" }}
            >
              {unreadCount} новых
            </Badge>
          )}
        </div>
        
        <div className="space-y-3">
          {notifications.slice(0, 4).map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-xl border transition-all ${
                !notification.read ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: notification.read ? "#9CA3AF" : "#1A2B4A" }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm mb-1" style={{ color: "#1A2B4A" }}>
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}