import { useState } from "react";
import { documents, trainingMaterials, tests } from "../../data/mockData";
import { FileText, GraduationCap, ClipboardCheck, Plus, Edit, Trash2, Upload } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

export function ContentManagement() {
  const [activeTab, setActiveTab] = useState("documents");

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl mb-2" style={{ color: "#1A2B4A" }}>
          Управление контентом
        </h1>
        <p className="text-gray-600">Создание и редактирование учебных материалов</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="documents">Документы</TabsTrigger>
          <TabsTrigger value="training">Обучение</TabsTrigger>
          <TabsTrigger value="tests">Тесты</TabsTrigger>
        </TabsList>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg" style={{ color: "#1A2B4A" }}>
              Инструкции и регламенты ({documents.length})
            </h2>
            <Button
              className="rounded-xl"
              style={{ backgroundColor: "#1A2B4A" }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Добавить документ
            </Button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Название</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Категория</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Профессия</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Дата</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Страницы</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <span className="text-sm" style={{ color: "#1A2B4A" }}>
                            {doc.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="text-xs">
                          {doc.category}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{doc.profession}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{doc.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{doc.pages}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Training Materials Tab */}
        <TabsContent value="training" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg" style={{ color: "#1A2B4A" }}>
              Обучающие материалы ({trainingMaterials.length})
            </h2>
            <Button
              className="rounded-xl"
              style={{ backgroundColor: "#1A2B4A" }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Добавить материал
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trainingMaterials.map((material) => (
              <div key={material.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="relative h-40">
                  <img
                    src={material.thumbnail}
                    alt={material.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge
                    className="absolute top-3 left-3 text-xs"
                    style={{ backgroundColor: "white", color: "#1A2B4A" }}
                  >
                    {material.type === "course" ? "Курс" : material.type === "video" ? "Видео" : "Статья"}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="text-sm mb-2" style={{ color: "#1A2B4A" }}>
                    {material.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">{material.duration}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 h-9 text-xs">
                      <Edit className="w-3 h-3 mr-1" />
                      Изменить
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                      <Trash2 className="w-3 h-3 text-red-600" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Tests Tab */}
        <TabsContent value="tests" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg" style={{ color: "#1A2B4A" }}>
              Тесты ({tests.length})
            </h2>
            <Button
              className="rounded-xl"
              style={{ backgroundColor: "#1A2B4A" }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Создать тест
            </Button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Название</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Вопросов</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Время</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Мин. балл</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Попытки</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tests.map((test) => (
                    <tr key={test.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <ClipboardCheck className="w-5 h-5 text-gray-400" />
                          <span className="text-sm" style={{ color: "#1A2B4A" }}>
                            {test.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{test.questions}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{test.duration} мин</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{test.passingScore}%</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{test.maxAttempts}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
