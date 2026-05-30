import { adminUser } from "../../data/mockData";
import { Phone, Mail, Briefcase, Building2, Calendar, Users, FileText, Clock, LogOut } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router";

export function AdminProfile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="p-4 space-y-4">
        {/* Personal Info Card */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-start gap-4 mb-4">
            <img
              src={adminUser.photo}
              alt={adminUser.fullName}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-lg mb-1" style={{ color: "#1A2B4A" }}>
                {adminUser.fullName}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{adminUser.position}</p>
              <div className="flex gap-2 flex-wrap">
                <Badge
                  className="px-3 py-1 text-xs"
                  style={{ backgroundColor: "#F05A22", color: "white" }}
                >
                  Администратор
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-xs">
                  {adminUser.department}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{adminUser.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{adminUser.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Briefcase className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{adminUser.profession}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Building2 className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{adminUser.department}</span>
            </div>
          </div>
        </div>

        {/* Work Statistics Card */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-base mb-4" style={{ color: "#1A2B4A" }}>
            Рабочая статистика
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-600">Стаж</span>
              </div>
              <p className="text-lg" style={{ color: "#1A2B4A" }}>8 лет</p>
              <p className="text-xs text-gray-500">с {adminUser.hireDate}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-600">Сотрудники</span>
              </div>
              <p className="text-lg" style={{ color: "#1A2B4A" }}>
                {adminUser.employeesManaged}
              </p>
              <p className="text-xs text-gray-500">в управлении</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-600">Смены</span>
              </div>
              <p className="text-lg" style={{ color: "#1A2B4A" }}>
                {adminUser.shiftsThisMonth}
              </p>
              <p className="text-xs text-gray-500">в этом месяце</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-600">Отчёты</span>
              </div>
              <p className="text-lg" style={{ color: "#1A2B4A" }}>
                {adminUser.reportsCreated}
              </p>
              <p className="text-xs text-gray-500">создано всего</p>
            </div>
          </div>
        </div>

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
