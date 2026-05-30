import { tests } from "../../data/mockData";
import { ClipboardCheck, Clock, CheckCircle2, XCircle, AlertCircle, ChevronRight } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { useNavigate } from "react-router";

export function Tests() {
  const navigate = useNavigate();

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "passed":
        return {
          icon: CheckCircle2,
          label: "Пройден",
          color: "#34C759",
          bgColor: "#f0fdf4"
        };
      case "failed":
        return {
          icon: XCircle,
          label: "Не пройден",
          color: "#EF4444",
          bgColor: "#fef2f2"
        };
      case "in-progress":
        return {
          icon: Clock,
          label: "В процессе",
          color: "#FF9500",
          bgColor: "#fff7ed"
        };
      default:
        return {
          icon: AlertCircle,
          label: "Не начат",
          color: "#9CA3AF",
          bgColor: "#f9fafb"
        };
    }
  };

  const stats = [
    {
      label: "Пройдено",
      value: tests.filter(t => t.status === "passed").length,
      color: "#34C759"
    },
    {
      label: "Не пройдено",
      value: tests.filter(t => t.status === "failed").length,
      color: "#EF4444"
    },
    {
      label: "Доступно",
      value: tests.filter(t => t.status === "not-started").length,
      color: "#1A2B4A"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl mb-1" style={{ color: "#1A2B4A" }}>
          Тесты
        </h1>
        <p className="text-sm text-gray-600">
          Проверка знаний и сертификация
        </p>
      </div>

      {/* Statistics */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4 text-center">
              <div className="text-2xl mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tests List */}
        <div className="space-y-3">
          {tests.map((test) => {
            const statusInfo = getStatusInfo(test.status);
            const StatusIcon = statusInfo.icon;
            const canRetake = test.status === "failed" && test.attempts < test.maxAttempts;

            return (
              <button
                key={test.id}
                onClick={() => {
                  if (test.status === "passed") {
                    navigate(`/employee/tests/${test.id}/results`);
                  } else {
                    navigate(`/employee/tests/${test.id}`);
                  }
                }}
                className="w-full bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: statusInfo.bgColor }}
                  >
                    <StatusIcon className="w-6 h-6" style={{ color: statusInfo.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="text-base mb-2" style={{ color: "#1A2B4A" }}>
                      {test.title}
                    </h3>

                    <div className="flex items-center gap-3 mb-2 text-sm text-gray-600">
                      <span>{test.questions} вопросов</span>
                      <span>•</span>
                      <span>{test.duration} мин</span>
                      <span>•</span>
                      <span>Мин. балл: {test.passingScore}%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge
                        className="px-3 py-1 text-xs"
                        style={{
                          backgroundColor: statusInfo.bgColor,
                          color: statusInfo.color,
                          border: "none"
                        }}
                      >
                        {statusInfo.label}
                        {test.score !== null && ` - ${test.score}%`}
                      </Badge>

                      {test.attempts > 0 && (
                        <span className="text-xs text-gray-500">
                          Попыток: {test.attempts}/{test.maxAttempts}
                        </span>
                      )}
                    </div>

                    {canRetake && (
                      <p className="text-xs mt-2" style={{ color: "#FF9500" }}>
                        Доступна повторная попытка
                      </p>
                    )}

                    {test.lastAttempt && (
                      <p className="text-xs text-gray-500 mt-1">
                        Последняя попытка: {test.lastAttempt}
                      </p>
                    )}
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
