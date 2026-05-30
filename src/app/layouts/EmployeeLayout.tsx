import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Home, FileText, GraduationCap, ClipboardCheck, User, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import logo from "figma:asset/75f4a380686ced8781dad611a9814fa31c254317.png";
import vtsLogo from "figma:asset/91c3dd93a2106205496ec9f6c5247d263cb80c55.png";

export function EmployeeLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { path: "/employee/home", icon: Home, label: "Главная", shortLabel: "Главная" },
    { path: "/employee/documents", icon: FileText, label: "Документы", shortLabel: "Документы" },
    { path: "/employee/training", icon: GraduationCap, label: "Обучение", shortLabel: "Обучение" },
    { path: "/employee/tests", icon: ClipboardCheck, label: "Тесты", shortLabel: "Тесты" },
    { path: "/employee/profile", icon: User, label: "Профиль", shortLabel: "Профиль" },
  ];

  const activeTab = tabs.find(
    (t) => location.pathname === t.path || location.pathname.startsWith(t.path + "/")
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
            <p className="text-sm text-gray-500 mt-1">Сотрудник</p>
          </div>

          {/* Sidebar Nav */}
          <nav className="flex-1 overflow-y-auto p-3">
            <div className="space-y-1">
              {tabs.map((tab) => {
                const isActive = location.pathname === tab.path || location.pathname.startsWith(tab.path + "/");
                const Icon = tab.icon;
                return (
                  <Link
                    key={tab.path}
                    to={tab.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive ? "shadow-sm" : "hover:bg-gray-50"
                    }`}
                    style={{
                      backgroundColor: isActive ? "#1A2B4A" : "transparent",
                      color: isActive ? "white" : "#374151",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{tab.label}</span>
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
              {activeTab?.label || "Work Helper"}
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
        <div className="flex items-center justify-around px-2 py-2 max-w-2xl mx-auto">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path || location.pathname.startsWith(tab.path + "/");
            const Icon = tab.icon;
            return (
              <Link
                key={tab.path}
                to={tab.path}
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
                  {tab.shortLabel}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
