import { useState } from "react";
import { employees } from "../../data/mockData";
import { Search, Filter, User, TrendingUp } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

const moodEmojis = ["😞", "😕", "😐", "🙂", "😄"];

export function EmployeeManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("Все");

  const departments = ["Все", "Цех №3", "Цех №2", "ОТК", "Администрация"];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.profession.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === "Все" || emp.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getMoodEmoji = (average: number) => {
    return moodEmojis[Math.round(average) - 1] || "😐";
  };

  const getPassRate = (passed: number, total: number) => {
    return Math.round((passed / total) * 100);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl mb-2" style={{ color: "#1A2B4A" }}>
          Управление сотрудниками
        </h1>
        <p className="text-gray-600">Просмотр и анализ данных сотрудников</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Поиск по имени или профессии..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl"
            />
          </div>

          {/* Department Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
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

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="text-2xl mb-1" style={{ color: "#1A2B4A" }}>
            {filteredEmployees.length}
          </div>
          <div className="text-sm text-gray-600">Найдено сотрудников</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="text-2xl mb-1" style={{ color: "#34C759" }}>
            {filteredEmployees.filter(e => e.averageMood >= 4).length}
          </div>
          <div className="text-sm text-gray-600">Хорошее настроение</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="text-2xl mb-1" style={{ color: "#FF9500" }}>
            {filteredEmployees.filter(e => e.testsPassed === e.testsCompleted).length}
          </div>
          <div className="text-sm text-gray-600">100% тесты пройдены</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="text-2xl mb-1" style={{ color: "#1A2B4A" }}>
            {Math.round(filteredEmployees.reduce((acc, e) => acc + e.averageMood, 0) / filteredEmployees.length * 10) / 10}
          </div>
          <div className="text-sm text-gray-600">Средний балл настроения</div>
        </div>
      </div>

      {/* Employees List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Сотрудник</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Должность</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Отдел</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Тесты</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Процент прохождения</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Настроение</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Последняя активность</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => {
                const passRate = getPassRate(employee.testsPassed, employee.testsCompleted);
                
                return (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={employee.photo}
                          alt={employee.fullName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-sm" style={{ color: "#1A2B4A" }}>
                            {employee.fullName}
                          </div>
                          <div className="text-xs text-gray-500">{employee.profession}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{employee.position}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="text-xs">
                        {employee.department}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {employee.testsPassed}/{employee.testsCompleted}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-[100px] h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${passRate}%`,
                              backgroundColor: passRate === 100 ? "#34C759" : passRate >= 80 ? "#FF9500" : "#EF4444"
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{passRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getMoodEmoji(employee.averageMood)}</span>
                        <span className="text-sm text-gray-600">{employee.averageMood.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{employee.lastActive}</td>
                    <td className="px-6 py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs rounded-lg"
                      >
                        Подробнее
                      </Button>
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
