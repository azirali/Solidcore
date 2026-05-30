import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, FileEdit, Users, TrendingUp, ClipboardList, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import logo from "figma:asset/75f4a380686ced8781dad611a9814fa31c254317.png";
import vtsLogo from "figma:asset/91c3dd93a2106205496ec9f6c5247d263cb80c55.png";

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/admin/dashboard", icon: LayoutDashboard, label: "Панель", shortLabel: "Панель" },
    { path: "/admin/content", icon: FileEdit, label: "Контент", shortLabel: "Контент" },
    { path: "/admin/employees", icon: Users, label: "Сотрудники", shortLabel: "Люди" },
    { path: "/admin/mood-analytics", icon: TrendingUp, label: "Анализ настроения", shortLabel: "Анализ" },
    { path: "/admin/test-results", icon: ClipboardList, label: "Результаты тестов", shortLabel: "Тесты" },
    { path: "/admin/profile", icon: UserIcon, label: "Профиль", shortLabel: "Профиль" },
  ];

  const activeItem = menuItems.find(
    (m) => location.pathname === m.path || location.pathname.startsWith(m.path + "/")
  );

  const handleLogout = () => navigate("/login");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ backgroundColor: "#f5f5f5" }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:block lg:sticky top-0 h-screen bg-white shadow-lg"
        style={{ width: "260px" }}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-5 border-b border-gray-200">
            <img src={logo} alt="Work Helper" className="w-36 h-auto mb-3" />
            <div className="flex items-center gap-2 mb-2">
              <img src={vtsLogo} alt="ВТС" className="h-7 w-auto" />
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">При поддержке</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Администратор</p>
          </div>

          {/* Sidebar Nav */}
          <nav className="flex-1 overflow-y-auto p-3">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive ? "shadow-sm" : "hover:bg-gray-50"
                    }`}
                    style={{
                      backgroundColor: isActive ? "#1A2B4A" : "transparent",
                      color: isActive ? "white" : "#374151",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start gap-3"
            >
              <LogOut className="w-5 h-5" />
              Выйти
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg" style={{ color: "#1A2B4A", fontWeight: 700 }}>
              {activeItem?.label || "Панель администратора"}
            </h1>
            <div className="flex items-center gap-2">
              <img src={vtsLogo} alt="ВТС" className="h-8 w-auto" />
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto pb-20 lg:pb-0">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex items-center justify-around px-2 py-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-all"
              >
                <Icon
                  className="w-6 h-6 mb-1"
                  style={{
                    color: isActive ? "#1A2B4A" : "#9CA3AF",
                    strokeWidth: isActive ? 2.5 : 2,
                  }}
                />
                <span
                  className="text-xs truncate max-w-full"
                  style={{
                    color: isActive ? "#1A2B4A" : "#9CA3AF",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {item.shortLabel}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}