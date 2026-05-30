// Mock data for Work Helper app

export const currentUser = {
  id: 1,
  fullName: "Иванов Алексей Петрович",
  position: "Оператор станков",
  profession: "Станочник",
  department: "Цех №3",
  photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  phone: "+7 (707) 123-45-67",
  email: "ivanov@factory.kz",
  role: "employee", // or "admin"
  medicalInfo: {
    bloodType: "A(II) Rh+",
    averageBloodPressure: "120/80",
    medicalClearances: [
      { name: "Медосмотр", expiryDate: "2026-06-15", status: "active" },
      { name: "Флюорография", expiryDate: "2026-12-20", status: "active" },
      { name: "Психиатр", expiryDate: "2026-03-10", status: "expiring" }
    ]
  },
  workStats: {
    vacationDaysTaken: 14,
    totalVacationDays: 28,
    safetyViolations: 0,
    tardinessCount: 2,
    remarks: 1
  }
};

export const adminUser = {
  id: 100,
  fullName: "Петров Дмитрий Сергеевич",
  position: "Мастер участка",
  profession: "Инженер-технолог",
  department: "Управление производством",
  photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
  phone: "+7 (707) 987-65-43",
  email: "petrov@factory.kz",
  role: "admin",
  hireDate: "2018-03-15",
  employeesManaged: 24,
  shiftsThisMonth: 22,
  reportsCreated: 156,
};

export const moodHistory = [
  { date: "2026-02-19", mood: 5 },
  { date: "2026-02-18", mood: 4 },
  { date: "2026-02-17", mood: 5 },
  { date: "2026-02-16", mood: 3 },
  { date: "2026-02-15", mood: 4 },
  { date: "2026-02-14", mood: 5 },
  { date: "2026-02-13", mood: 4 },
  { date: "2026-02-12", mood: 4 },
  { date: "2026-02-11", mood: 5 },
  { date: "2026-02-10", mood: 3 },
  { date: "2026-02-09", mood: 4 },
  { date: "2026-02-08", mood: 2 },
  { date: "2026-02-07", mood: 4 },
  { date: "2026-02-06", mood: 5 },
  { date: "2026-02-05", mood: 4 },
];

export const notifications = [
  { id: 1, title: "Новое обучение доступно", message: "Курс 'Безопасность на производстве' теперь доступен", time: "2 часа назад", read: false },
  { id: 2, title: "Тест завершен", message: "Вы успешно прошли тест по охране труда", time: "1 день назад", read: false },
  { id: 3, title: "Напоминание", message: "До истечения медосмотра осталось 30 дней", time: "3 дня назад", read: true },
  { id: 4, title: "Новая инструкция", message: "Обновлена СОП по работе на токарном станке", time: "1 неделя назад", read: true },
];

export const documents = [
  { 
    id: 1, 
    title: "Правила техники безопасности", 
    category: "Безопасность", 
    profession: "Все", 
    date: "15.01.2026", 
    read: true,
    type: "pdf",
    pages: 24
  },
  { 
    id: 2, 
    title: "СОП: Работа на токарном станке", 
    category: "СОП", 
    profession: "Станочник", 
    date: "10.02.2026", 
    read: false,
    type: "pdf",
    pages: 12
  },
  { 
    id: 3, 
    title: "Инструкция по охране труда", 
    category: "Охрана труда", 
    profession: "Все", 
    date: "05.01.2026", 
    read: true,
    type: "pdf",
    pages: 18
  },
  { 
    id: 4, 
    title: "Порядок действий при ЧП", 
    category: "Безопасность", 
    profession: "Все", 
    date: "20.12.2025", 
    read: true,
    type: "pdf",
    pages: 8
  },
  { 
    id: 5, 
    title: "СОП: Фрезерные работы", 
    category: "СОП", 
    profession: "Фрезеровщик", 
    date: "01.02.2026", 
    read: false,
    type: "pdf",
    pages: 15
  },
];

export const trainingMaterials = [
  {
    id: 1,
    title: "Безопасность на производстве",
    type: "course",
    duration: "4 часа",
    progress: 75,
    lessons: 8,
    completedLessons: 6,
    thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400"
  },
  {
    id: 2,
    title: "Основы работы на станках",
    type: "course",
    duration: "6 часов",
    progress: 100,
    lessons: 12,
    completedLessons: 12,
    thumbnail: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400"
  },
  {
    id: 3,
    title: "Первая помощь",
    type: "video",
    duration: "45 мин",
    progress: 0,
    thumbnail: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400"
  },
  {
    id: 4,
    title: "Качество продукции",
    type: "article",
    duration: "15 мин",
    progress: 100,
    thumbnail: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400"
  },
];

export const tests = [
  {
    id: 1,
    title: "Техника безопасности - Базовый уровень",
    questions: 20,
    duration: 30,
    status: "passed",
    score: 95,
    passingScore: 80,
    lastAttempt: "12.02.2026",
    attempts: 1,
    maxAttempts: 3
  },
  {
    id: 2,
    title: "Охрана труда на производстве",
    questions: 15,
    duration: 20,
    status: "passed",
    score: 87,
    passingScore: 80,
    lastAttempt: "10.02.2026",
    attempts: 1,
    maxAttempts: 3
  },
  {
    id: 3,
    title: "Работа на токарном станке",
    questions: 25,
    duration: 40,
    status: "in-progress",
    score: null,
    passingScore: 80,
    lastAttempt: null,
    attempts: 0,
    maxAttempts: 3
  },
  {
    id: 4,
    title: "Первая помощь при травмах",
    questions: 18,
    duration: 25,
    status: "not-started",
    score: null,
    passingScore: 85,
    lastAttempt: null,
    attempts: 0,
    maxAttempts: 3
  },
  {
    id: 5,
    title: "Контроль качества продукции",
    questions: 12,
    duration: 15,
    status: "failed",
    score: 65,
    passingScore: 80,
    lastAttempt: "08.02.2026",
    attempts: 1,
    maxAttempts: 3
  },
];

export const testQuestions = [
  {
    id: 1,
    question: "Какое средство индивидуальной защиты обязательно при работе на станке?",
    options: [
      "Защитные очки",
      "Перчатки",
      "Респиратор",
      "Наушники"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "С какой периодичностью проводится инструктаж по охране труда?",
    options: [
      "Ежемесячно",
      "Ежеквартально",
      "Раз в полгода",
      "Ежегодно"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Что необходимо сделать перед началом работы на станке?",
    options: [
      "Проверить исправность оборудования",
      "Надеть СИЗ",
      "Убедиться в отсутствии посторонних предметов",
      "Все вышеперечисленное"
    ],
    correctAnswer: 3
  },
  {
    id: 4,
    question: "Какое действие запрещено во время работы станка?",
    options: [
      "Регулировка скорости",
      "Уборка стружки руками",
      "Остановка станка",
      "Наблюдение за процессом"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Куда следует сообщить о неисправности оборудования?",
    options: [
      "Продолжить работу",
      "Своему руководителю",
      "Ничего не делать",
      "Попытаться починить самостоятельно"
    ],
    correctAnswer: 1
  },
];

// Admin data
export const adminStats = {
  totalEmployees: 247,
  todayMoodAverage: 4.2,
  moodDistribution: [
    { mood: "😞", count: 12 },
    { mood: "😕", count: 28 },
    { mood: "😐", count: 89 },
    { mood: "🙂", count: 95 },
    { mood: "😄", count: 23 },
  ],
  testsCompletionRate: 78,
  activeTests: 12,
  totalDocuments: 156,
  mostReadDocuments: [
    { title: "Правила техники безопасности", reads: 245 },
    { title: "Инструкция по охране труда", reads: 223 },
    { title: "Порядок действий при ЧП", reads: 198 },
  ]
};

export const employees = [
  {
    id: 1,
    fullName: "Иванов Алексей Петрович",
    position: "Оператор станков",
    profession: "Станочник",
    department: "Цех №3",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    testsCompleted: 12,
    testsPassed: 10,
    averageMood: 4.5,
    lastActive: "2026-02-19"
  },
  {
    id: 2,
    fullName: "Петрова Елена Сергеевна",
    position: "Инженер по качеству",
    profession: "Инженер",
    department: "ОТК",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    testsCompleted: 18,
    testsPassed: 18,
    averageMood: 4.8,
    lastActive: "2026-02-19"
  },
  {
    id: 3,
    fullName: "Смирнов Дмитрий Иванович",
    position: "Фрезеровщик",
    profession: "Фрезеровщик",
    department: "Цех №2",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    testsCompleted: 8,
    testsPassed: 7,
    averageMood: 3.9,
    lastActive: "2026-02-18"
  },
  {
    id: 4,
    fullName: "Козлова Анна Викторовна",
    position: "Контролёр ОТК",
    profession: "Контролёр",
    department: "ОТК",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    testsCompleted: 15,
    testsPassed: 14,
    averageMood: 4.2,
    lastActive: "2026-02-19"
  },
];

export const moodAnalyticsData = [
  { date: "10.02", average: 4.1, department: "Цех №3" },
  { date: "11.02", average: 3.9, department: "Цех №3" },
  { date: "12.02", average: 4.3, department: "Цех №3" },
  { date: "13.02", average: 4.5, department: "Цех №3" },
  { date: "14.02", average: 4.2, department: "Цех №3" },
  { date: "15.02", average: 3.8, department: "Цех №3" },
  { date: "16.02", average: 4.0, department: "Цех №3" },
  { date: "17.02", average: 4.4, department: "Цех №3" },
  { date: "18.02", average: 4.1, department: "Цех №3" },
  { date: "19.02", average: 4.2, department: "Цех №3" },
];

export const testResultsData = [
  {
    profession: "Станочник",
    total: 45,
    passed: 38,
    failed: 7,
    passRate: 84
  },
  {
    profession: "Фрезеровщик",
    total: 32,
    passed: 26,
    failed: 6,
    passRate: 81
  },
  {
    profession: "Инженер",
    total: 28,
    passed: 27,
    failed: 1,
    passRate: 96
  },
  {
    profession: "Контролёр",
    total: 22,
    passed: 21,
    failed: 1,
    passRate: 95
  },
  {
    profession: "Сварщик",
    total: 38,
    passed: 29,
    failed: 9,
    passRate: 76
  },
];