import { useState } from "react";
import { moodAnalyticsData, employees } from "../../data/mockData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

const moodEmojis = ["😞", "😕", "😐", "🙂", "😄"];

export function MoodAnalytics() {
  const [timeRange, setTimeRange] = useState("week");
  const [selectedDepartment, setSelectedDepartment] = useState("Все");

  const departments = ["Все", "Цех №3", "Цех №2", "ОТК", "Администрация"];

  // Calculate statistics
  const currentAverage = 4.2;
  const previousAverage = 4.0;
  const trend = currentAverage - previousAverage;

  const departmentData = [
    { department: "Цех №3", average: 4.2, count: 85 },
    { department: "Цех №2", average: 3.9, count: 68 },
    { department: "ОТК", average: 4.5, count: 42 },
    { department: "Администрация", average: 4.3, count: 28 },
  ];

  const getTrendIcon = (value: number) => {
    if (value > 0) return TrendingUp;
    if (value < 0) return TrendingDown;
    return Minus;
  };

  const getTrendColor = (value: number) => {
    if (value > 0) return "#34C759";
    if (value < 0) return "#EF4444";
    return "#9CA3AF";
  };

  const TrendIcon = getTrendIcon(trend);
  const trendColor = getTrendColor(trend);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl mb-2" style={{ color: "#1A2B4A" }}>
          Анализ настроения сотрудников
        </h1>
        <p className="text-gray-600">Мониторинг морального состояния команды</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="text-sm text-gray-600 mb-2">Средний балл сегодня</div>
          <div className="flex items-end gap-2">
            <div className="text-3xl" style={{ color: "#1A2B4A" }}>
              {currentAverage.toFixed(1)}
            </div>
            <div className="text-2xl mb-1">
              {moodEmojis[Math.round(currentAverage) - 1]}
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm" style={{ color: trendColor }}>
            <TrendIcon className="w-4 h-4" />
            <span>{Math.abs(trend).toFixed(1)} за неделю</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="text-sm text-gray-600 mb-2">Очень хорошее</div>
          <div className="text-3xl mb-1" style={{ color: "#34C759" }}>
            {employees.filter(e => e.averageMood >= 4.5).length}
          </div>
          <div className="text-xs text-gray-500">сотрудников</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="text-sm text-gray-600 mb-2">Нормальное</div>
          <div className="text-3xl mb-1" style={{ color: "#FF9500" }}>
            {employees.filter(e => e.averageMood >= 3.5 && e.averageMood < 4.5).length}
          </div>
          <div className="text-xs text-gray-500">сотрудников</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="text-sm text-gray-600 mb-2">Требует внимания</div>
          <div className="text-3xl mb-1" style={{ color: "#EF4444" }}>
            {employees.filter(e => e.averageMood < 3.5).length}
          </div>
          <div className="text-xs text-gray-500">сотрудников</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Time Range */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Период</label>
            <div className="flex gap-2">
              {["Неделя", "Месяц", "Квартал"].map((range, index) => {
                const value = ["week", "month", "quarter"][index];
                return (
                  <button
                    key={value}
                    onClick={() => setTimeRange(value)}
                    className={`px-4 py-2 rounded-xl text-sm transition-all ${
                      timeRange === value ? "shadow-sm" : ""
                    }`}
                    style={{
                      backgroundColor: timeRange === value ? "#1A2B4A" : "#f3f4f6",
                      color: timeRange === value ? "white" : "#6b7280"
                    }}
                  >
                    {range}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Department Filter */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Отдел</label>
            <div className="flex gap-2 flex-wrap">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-xl text-sm transition-all ${
                    selectedDepartment === dept ? "shadow-sm" : ""
                  }`}
                  style={{
                    backgroundColor: selectedDepartment === dept ? "#1A2B4A" : "#f3f4f6",
                    color: selectedDepartment === dept ? "white" : "#6b7280"
                  }}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Trend Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg mb-4" style={{ color: "#1A2B4A" }}>
            Динамика изменения настроения
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={moodAnalyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[0, 5]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="average"
                stroke="#1A2B4A"
                strokeWidth={3}
                dot={{ fill: "#1A2B4A", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Comparison */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg mb-4" style={{ color: "#1A2B4A" }}>
            Сравнение по отделам
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="department" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="average" fill="#1A2B4A" name="Средний балл" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Details */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg mb-4" style={{ color: "#1A2B4A" }}>
          Детализация по отделам
        </h2>
        <div className="space-y-4">
          {departmentData.map((dept, index) => {
            const emoji = moodEmojis[Math.round(dept.average) - 1];
            const color = dept.average >= 4.5 ? "#34C759" : dept.average >= 3.5 ? "#FF9500" : "#EF4444";
            
            return (
              <div key={index} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{emoji}</span>
                    <div>
                      <div className="text-sm" style={{ color: "#1A2B4A" }}>
                        {dept.department}
                      </div>
                      <div className="text-xs text-gray-500">{dept.count} сотрудников</div>
                    </div>
                  </div>
                  <div className="text-2xl" style={{ color }}>
                    {dept.average.toFixed(1)}
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(dept.average / 5) * 100}%`,
                      backgroundColor: color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
