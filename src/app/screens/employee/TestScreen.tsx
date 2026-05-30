import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { tests, testQuestions } from "../../data/mockData";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";

export function TestScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const test = tests.find((t) => t.id === Number(id));
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [timeRemaining, setTimeRemaining] = useState(test?.duration ? test.duration * 60 : 0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Тест не найден</p>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectAnswer = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex,
    });
  };

  const handleSubmit = () => {
    // Calculate score
    let correctCount = 0;
    testQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    const score = Math.round((correctCount / testQuestions.length) * 100);
    
    // Navigate to results
    navigate(`/employee/tests/${id}/results`, {
      state: { score, selectedAnswers }
    });
  };

  const progress = ((currentQuestion + 1) / testQuestions.length) * 100;
  const question = testQuestions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const allAnswered = testQuestions.every((_, index) => selectedAnswers[index] !== undefined);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Выйти</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-lg">
            <Clock className="w-5 h-5 text-red-600" />
            <span className="text-base text-red-600">{formatTime(timeRemaining)}</span>
          </div>
        </div>

        <h1 className="text-lg mb-2" style={{ color: "#1A2B4A" }}>
          {test.title}
        </h1>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Вопрос {currentQuestion + 1} из {testQuestions.length}
            </span>
            <span style={{ color: "#1A2B4A" }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${progress}%`,
                backgroundColor: "#1A2B4A"
              }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="p-4">
        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <p className="text-lg leading-relaxed" style={{ color: "#1A2B4A" }}>
            {question.question}
          </p>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestion] === index;

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(currentQuestion, index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  isSelected ? "shadow-md" : "hover:bg-gray-50"
                }`}
                style={{
                  borderColor: isSelected ? "#1A2B4A" : "#e5e7eb",
                  backgroundColor: isSelected ? "#f0f9ff" : "white"
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{
                      borderColor: isSelected ? "#1A2B4A" : "#d1d5db",
                      backgroundColor: isSelected ? "#1A2B4A" : "white"
                    }}
                  >
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-base" style={{ color: isSelected ? "#1A2B4A" : "#374151" }}>
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {currentQuestion > 0 && (
            <Button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              variant="outline"
              className="flex-1 h-12 text-base rounded-xl"
            >
              Назад
            </Button>
          )}

          {currentQuestion < testQuestions.length - 1 ? (
            <Button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={!isAnswered}
              className="flex-1 h-12 text-base rounded-xl"
              style={{ backgroundColor: "#1A2B4A" }}
            >
              Следующий вопрос
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="flex-1 h-12 text-base rounded-xl"
              style={{ backgroundColor: "#34C759" }}
            >
              Завершить тест
            </Button>
          )}
        </div>

        {/* Question Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {testQuestions.map((_, index) => {
            const isAnsweredDot = selectedAnswers[index] !== undefined;
            const isCurrentDot = index === currentQuestion;

            return (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all"
                style={{
                  backgroundColor: isCurrentDot
                    ? "#1A2B4A"
                    : isAnsweredDot
                    ? "#34C759"
                    : "#e5e7eb",
                  color: isCurrentDot || isAnsweredDot ? "white" : "#6b7280"
                }}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}