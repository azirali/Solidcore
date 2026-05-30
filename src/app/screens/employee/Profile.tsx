import { currentUser } from "../../data/mockData";
import { Phone, Mail, Activity, Calendar, AlertTriangle, Clock, FileText, Heart, LogOut } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router";

export function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl" style={{ color: "#1A2B4A" }}>
          Мой профиль
        </h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Personal Info Card */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-start gap-4 mb-4">
            <img
              src={currentUser.photo}
              alt={currentUser.fullName}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-lg mb-1" style={{ color: "#1A2B4A" }}>
                {currentUser.fullName}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{currentUser.position}</p>
              <div className="flex gap-2 flex-wrap">
                <Badge
                  className="px-3 py-1 text-xs"
                  style={{ backgroundColor: "#1A2B4A", color: "white" }}
                >
                  {currentUser.profession}
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-xs">
                  {currentUser.department}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{currentUser.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{currentUser.email}</span>
            </div>
          </div>
        </div>

        {/* Medical Info Card */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5" style={{ color: "#EF4444" }} />
            <h3 className="text-base" style={{ color: "#1A2B4A" }}>
              Медицинская информация
            </h3>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Группа крови</span>
              <span className="text-sm" style={{ color: "#1A2B4A" }}>
                {currentUser.medicalInfo.bloodType}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Среднее АД</span>
              <span className="text-sm" style={{ color: "#1A2B4A" }}>
                {currentUser.medicalInfo.averageBloodPressure}
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Медицинские допуски</p>
            {currentUser.medicalInfo.medicalClearances.map((clearance, index) => {
              const isExpiring = clearance.status === "expiring";
              
              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    isExpiring ? "bg-yellow-50 border-yellow-200" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm" style={{ color: "#1A2B4A" }}>
                      {clearance.name}
                    </span>
                    {isExpiring && (
                      <AlertTriangle className="w-4 h-4" style={{ color: "#FF9500" }} />
                    )}
                  </div>
                  <p className="text-xs text-gray-600">
                    Действителен до: {clearance.expiryDate}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Work Statistics Card */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5" style={{ color: "#1A2B4A" }} />
            <h3 className="text-base" style={{ color: "#1A2B4A" }}>
              Статистика работы
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-600">Отпуск</span>
              </div>
              <p className="text-lg" style={{ color: "#1A2B4A" }}>
                {currentUser.workStats.vacationDaysTaken}/{currentUser.workStats.totalVacationDays}
              </p>
              <p className="text-xs text-gray-500">дней использовано</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-600">Нарушения ТБ</span>
              </div>
              <p
                className="text-lg"
                style={{ color: currentUser.workStats.safetyViolations === 0 ? "#34C759" : "#EF4444" }}
              >
                {currentUser.workStats.safetyViolations}
              </p>
              <p className="text-xs text-gray-500">случаев</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-600">Опоздания</span>
              </div>
              <p className="text-lg" style={{ color: "#1A2B4A" }}>
                {currentUser.workStats.tardinessCount}
              </p>
              <p className="text-xs text-gray-500">в этом месяце</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-600">Замечания</span>
              </div>
              <p className="text-lg" style={{ color: "#1A2B4A" }}>
                {currentUser.workStats.remarks}
              </p>
              <p className="text-xs text-gray-500">за год</p>
            </div>
          </div>
        </div>

        {/* Mood History Button */}
        <Button
          onClick={() => navigate("/employee/mood-history")}
          variant="outline"
          className="w-full h-12 text-base rounded-xl"
        >
          <Activity className="w-5 h-5 mr-2" />
          История настроения
        </Button>

        {/* Logout Button */}
        <Button
          onClick={() => navigate("/login")}
          variant="outline"
          className="w-full h-12 text-base rounded-xl text-red-500 border-red-200 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  );
}
