import { adminStats, moodAnalyticsData } from "../../data/mockData";
import { Users, TrendingUp, ClipboardCheck, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export function AdminDashboard() {
  const moodColors = ["#EF4444", "#FF9500", "#9CA3AF", "#34C759", "#1A2B4A"];

  const pieData = adminStats.moodDistribution.map((item, index) => ({
    name: item.mood,
    value: item.count,
    color: moodColors[index]
  }));

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl mb-2" style={{ color: "#1A2B4A" }}>
          Панель управления
        </h1>
        <p className="text-gray-600">Обзор системы обучения сотрудников</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#1A2B4A15" }}
            >
              <Users className="w-6 h-6" style={{ color: "#1A2B4A" }} />
            </div>
          </div>
          <div className="text-3xl mb-1" style={{ color: "#1A2B4A" }}>
            {adminStats.totalEmployees}
          </div>
          <div className="text-sm text-gray-600">Всего сотрудников</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#34C75915" }}
            >
              <TrendingUp className="w-6 h-6" style={{ color: "#34C759" }} />
            </div>
          </div>
          <div className="text-3xl mb-1" style={{ color: "#34C759" }}>
            {adminStats.todayMoodAverage.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Средний балл настроения</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#FF950015" }}
            >
              <ClipboardCheck className="w-6 h-6" style={{ color: "#FF9500" }} />
            </div>
          </div>
          <div className="text-3xl mb-1" style={{ color: "#FF9500" }}>
            {adminStats.testsCompletionRate}%
          </div>
          <div className="text-sm text-gray-600">Тесты завершены</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#1A2B4A15" }}
            >
              <FileText className="w-6 h-6" style={{ color: "#1A2B4A" }} />
            </div>
          </div>
          <div className="text-3xl mb-1" style={{ color: "#1A2B4A" }}>
            {adminStats.totalDocuments}
          </div>
          <div className="text-sm text-gray-600">Документов в системе</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Mood Distribution */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg mb-4" style={{ color: "#1A2B4A" }}>
            Распределение настроения сегодня
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Mood Trend */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg mb-4" style={{ color: "#1A2B4A" }}>
            Тренд настроения (последние 10 дней)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={moodAnalyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="average" fill="#1A2B4A" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Most Read Documents */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg mb-4" style={{ color: "#1A2B4A" }}>
          Самые читаемые документы
        </h2>
        <div className="space-y-3">
          {adminStats.mostReadDocuments.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                  style={{
                    backgroundColor: index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : "#CD7F32",
                    color: "white"
                  }}
                >
                  {index + 1}
                </div>
                <span className="text-sm" style={{ color: "#1A2B4A" }}>
                  {doc.title}
                </span>
              </div>
              <div className="text-sm" style={{ color: "#34C759" }}>
                {doc.reads} просмотров
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
