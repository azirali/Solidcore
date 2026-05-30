import { useParams, useNavigate } from "react-router";
import { documents } from "../../data/mockData";
import { ArrowLeft, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { useState } from "react";

export function DocumentViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRead, setIsRead] = useState(false);
  
  const document = documents.find((d) => d.id === Number(id));

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Документ не найден</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-3 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад</span>
        </button>

        <h1 className="text-lg mb-2" style={{ color: "#1A2B4A" }}>
          {document.title}
        </h1>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="outline"
            className="text-xs px-2 py-1"
            style={{ borderColor: "#1A2B4A", color: "#1A2B4A" }}
          >
            {document.category}
          </Badge>
          <span className="text-xs text-gray-500">{document.date}</span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">{document.pages} страниц</span>
        </div>
      </div>

      {/* PDF Viewer Mockup */}
      <div className="p-4">
        <div className="bg-gray-100 rounded-2xl p-8 min-h-[600px] mb-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            {/* Mock PDF Content */}
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8" style={{ color: "#1A2B4A" }} />
              <div>
                <h2 className="text-xl mb-1" style={{ color: "#1A2B4A" }}>
                  {document.title}
                </h2>
                <p className="text-sm text-gray-600">Документ для профессии: {document.profession}</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-700">
              <p className="text-base leading-relaxed">
                <strong>1. Общие положения</strong>
              </p>
              <p className="text-sm leading-relaxed">
                Настоящая инструкция устанавливает требования безопасности при выполнении работ на производстве. 
                Все сотрудники обязаны строго соблюдать требования данной инструкции.
              </p>

              <p className="text-base leading-relaxed mt-6">
                <strong>2. Требования безопасности перед началом работы</strong>
              </p>
              <p className="text-sm leading-relaxed">
                2.1. Надеть установленную спецодежду, спецобувь и другие средства индивидуальной защиты.
              </p>
              <p className="text-sm leading-relaxed">
                2.2. Осмотреть рабочее место и убедиться в его готовности и безопасности.
              </p>
              <p className="text-sm leading-relaxed">
                2.3. Проверить исправность оборудования, инструментов и приспособлений.
              </p>

              <p className="text-base leading-relaxed mt-6">
                <strong>3. Требования безопасности во время работы</strong>
              </p>
              <p className="text-sm leading-relaxed">
                3.1. Выполнять только ту работу, которая поручена и по которой прошли инструктаж.
              </p>
              <p className="text-sm leading-relaxed">
                3.2. Не допускать на рабочее место посторонних лиц.
              </p>
              <p className="text-sm leading-relaxed">
                3.3. Содержать рабочее место в чистоте и порядке.
              </p>

              <div className="mt-8 p-4 bg-yellow-50 border-l-4 rounded" style={{ borderColor: "#FF9500" }}>
                <p className="text-sm">
                  <strong style={{ color: "#FF9500" }}>⚠️ Внимание:</strong> Несоблюдение требований 
                  данной инструкции может привести к несчастным случаям на производстве.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mark as Read Button */}
        <Button
          onClick={() => setIsRead(true)}
          disabled={isRead || document.read}
          className="w-full h-12 text-base rounded-xl"
          style={{
            backgroundColor: isRead || document.read ? "#34C759" : "#1A2B4A"
          }}
        >
          {isRead || document.read ? (
            <>
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Документ прочитан
            </>
          ) : (
            "Отметить как прочитанное"
          )}
        </Button>
      </div>
    </div>
  );
}
