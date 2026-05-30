import { testResultsData } from "../../data/mockData";
import { ClipboardCheck, TrendingUp, Award, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

export function TestResultsAdmin() {
  const totalTests = testResultsData.reduce((acc, item) => acc + item.total, 0);
  const totalPassed = testResultsData.reduce((acc, item) => acc + item.passed, 0);
  const totalFailed = testResultsData.reduce((acc, item) => acc + item.failed, 0);
  const overallPassRate = Math.round((totalPassed / totalTests) * 100);

  const pieData = [
    { name: "Пройдено", value: totalPassed, color: "#34C759" },
    { name: "Не пройдено", value: totalFailed, color: "#EF4444" },
  ];

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl mb-2" style={{ color: "#1A2B4A" }}>
          Результаты тестирования
        </h1>
        <p className="text-gray-600">Анализ прохождения тестов по профессиям</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#1A2B4A15" }}
            >
              <ClipboardCheck className="w-6 h-6" style={{ color: "#1A2B4A" }} />
            </div>
          </div>
          <div className="text-3xl mb-1" style={{ color: "#1A2B4A" }}>
            {totalTests}
          </div>
          <div className="text-sm text-gray-600">Всего попыток</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#34C75915" }}
            >
              <Award className="w-6 h-6" style={{ color: "#34C759" }} />
            </div>
          </div>
          <div className="text-3xl mb-1" style={{ color: "#34C759" }}>
            {totalPassed}
          </div>
          <div className="text-sm text-gray-600">Успешно пройдено</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#EF444415" }}
            >
              <AlertCircle className="w-6 h-6" style={{ color: "#EF4444" }} />
            </div>
          </div>
          <div className="text-3xl mb-1" style={{ color: "#EF4444" }}>
            {totalFailed}
          </div>
          <div className="text-sm text-gray-600">Не пройдено</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#FF950015" }}
            >
              <TrendingUp className="w-6 h-6" style={{ color: "#FF9500" }} />
            </div>
          </div>
          <div className="text-3xl mb-1" style={{ color: "#FF9500" }}>
            {overallPassRate}%
          </div>
          <div className="text-sm text-gray-600">Общий процент прохождения</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pass Rate by Profession */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg mb-4" style={{ color: "#1A2B4A" }}>
            Процент прохождения по профессиям
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={testResultsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="profession" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="passRate" fill="#1A2B4A" name="Процент прохождения (%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Overall Distribution */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg mb-4" style={{ color: "#1A2B4A" }}>
            Общее распределение результатов
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
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
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg" style={{ color: "#1A2B4A" }}>
            Детализация по профессиям
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Профессия</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Всего попыток</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Пройдено</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Не пройдено</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Процент прохождения</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {testResultsData.map((item, index) => {
                const statusColor = item.passRate >= 90
                  ? "#34C759"
                  : item.passRate >= 80
                  ? "#FF9500"
                  : "#EF4444";
                
                const statusText = item.passRate >= 90
                  ? "Отлично"
                  : item.passRate >= 80
                  ? "Хорошо"
                  : "Требует внимания";

                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="text-sm" style={{ color: "#1A2B4A" }}>
                        {item.profession}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.total}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: "#34C759" }}>
                      {item.passed}
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: "#EF4444" }}>
                      {item.failed}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-[150px] h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${item.passRate}%`,
                              backgroundColor: statusColor
                            }}
                          />
                        </div>
                        <span className="text-sm" style={{ color: statusColor }}>
                          {item.passRate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs"
                        style={{
                          backgroundColor: `${statusColor}15`,
                          color: statusColor
                        }}
                      >
                        {statusText}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
