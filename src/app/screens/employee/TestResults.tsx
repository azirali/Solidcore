import { useParams, useNavigate, useLocation } from "react-router";
import { tests, testQuestions } from "../../data/mockData";
import { ArrowLeft, CheckCircle2, XCircle, Award, TrendingUp } from "lucide-react";
import { Button } from "../../components/ui/button";

export function TestResults() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const test = tests.find((t) => t.id === Number(id));
  const score = location.state?.score ?? test?.score ?? 0;
  const selectedAnswers = location.state?.selectedAnswers ?? {};

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Тест не найден</p>
      </div>
    );
  }

  const passed = score >= test.passingScore;
  const correctCount = testQuestions.filter((q, index) => selectedAnswers[index] === q.correctAnswer).length;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <button
          onClick={() => navigate("/employee/tests")}
          className="flex items-center gap-2 mb-3 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>К списку тестов</span>
        </button>

        <h1 className="text-lg" style={{ color: "#1A2B4A" }}>
          Результаты теста
        </h1>
      </div>

      {/* Result Summary */}
      <div className="p-4">
        <div
          className="rounded-2xl p-6 mb-6 text-center"
          style={{
            backgroundColor: passed ? "#f0fdf4" : "#fef2f2"
          }}
        >
          <div
            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{
              backgroundColor: passed ? "#34C759" : "#EF4444"
            }}
          >
            {passed ? (
              <Award className="w-10 h-10 text-white" />
            ) : (
              <XCircle className="w-10 h-10 text-white" />
            )}
          </div>

          <h2 className="text-2xl mb-2" style={{ color: passed ? "#34C759" : "#EF4444" }}>
            {passed ? "Тест пройден!" : "Тест не пройден"}
          </h2>

          <p className="text-gray-600 mb-4">
            {test.title}
          </p>

          <div className="text-5xl mb-2" style={{ color: passed ? "#34C759" : "#EF4444" }}>
            {score}%
          </div>

          <p className="text-sm text-gray-600">
            Минимальный балл: {test.passingScore}%
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1" style={{ color: "#1A2B4A" }}>
              {testQuestions.length}
            </div>
            <div className="text-xs text-gray-600">Всего вопросов</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1" style={{ color: "#34C759" }}>
              {correctCount}
            </div>
            <div className="text-xs text-gray-600">Правильных</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1" style={{ color: "#EF4444" }}>
              {testQuestions.length - correctCount}
            </div>
            <div className="text-xs text-gray-600">Неправильных</div>
          </div>
        </div>

        {/* Review Answers */}
        <div className="mb-6">
          <h3 className="text-base mb-4" style={{ color: "#1A2B4A" }}>
            Обзор ответов
          </h3>

          <div className="space-y-4">
            {testQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{
                        backgroundColor: isCorrect ? "#34C759" : "#EF4444"
                      }}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <XCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-2" style={{ color: "#1A2B4A" }}>
                        <strong>Вопрос {index + 1}:</strong> {question.question}
                      </p>

                      {userAnswer !== undefined && (
                        <div className="space-y-1 text-sm">
                          <p style={{ color: isCorrect ? "#34C759" : "#EF4444" }}>
                            Ваш ответ: {question.options[userAnswer]}
                          </p>
                          {!isCorrect && (
                            <p style={{ color: "#34C759" }}>
                              Правильный ответ: {question.options[question.correctAnswer]}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {!passed && test.attempts < test.maxAttempts && (
            <Button
              onClick={() => navigate(`/employee/tests/${id}`)}
              className="w-full h-12 text-base rounded-xl"
              style={{ backgroundColor: "#FF9500" }}
            >
              Попробовать снова ({test.maxAttempts - test.attempts} попыток осталось)
            </Button>
          )}

          <Button
            onClick={() => navigate("/employee/tests")}
            variant="outline"
            className="w-full h-12 text-base rounded-xl"
          >
            Вернуться к тестам
          </Button>
        </div>
      </div>
    </div>
  );
}
