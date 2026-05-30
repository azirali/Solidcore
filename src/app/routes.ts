import { createBrowserRouter } from "react-router";
import { Login } from "./screens/Login";
import { EmployeeLayout } from "./layouts/EmployeeLayout";
import { AdminLayout } from "./layouts/AdminLayout";

// Employee screens
import { EmployeeHome } from "./screens/employee/Home";
import { Documents } from "./screens/employee/Documents";
import { DocumentViewer } from "./screens/employee/DocumentViewer";
import { Training } from "./screens/employee/Training";
import { Tests } from "./screens/employee/Tests";
import { TestScreen } from "./screens/employee/TestScreen";
import { TestResults } from "./screens/employee/TestResults";
import { Profile } from "./screens/employee/Profile";
import { MoodHistory } from "./screens/employee/MoodHistory";

// Admin screens
import { AdminDashboard } from "./screens/admin/Dashboard";
import { ContentManagement } from "./screens/admin/ContentManagement";
import { EmployeeManagement } from "./screens/admin/EmployeeManagement";
import { MoodAnalytics } from "./screens/admin/MoodAnalytics";
import { TestResultsAdmin } from "./screens/admin/TestResults";
import { AdminProfile } from "./screens/admin/AdminProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/employee",
    Component: EmployeeLayout,
    children: [
      {
        path: "home",
        Component: EmployeeHome,
      },
      {
        path: "documents",
        Component: Documents,
      },
      {
        path: "documents/:id",
        Component: DocumentViewer,
      },
      {
        path: "training",
        Component: Training,
      },
      {
        path: "tests",
        Component: Tests,
      },
      {
        path: "tests/:id",
        Component: TestScreen,
      },
      {
        path: "tests/:id/results",
        Component: TestResults,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "mood-history",
        Component: MoodHistory,
      },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        path: "dashboard",
        Component: AdminDashboard,
      },
      {
        path: "content",
        Component: ContentManagement,
      },
      {
        path: "employees",
        Component: EmployeeManagement,
      },
      {
        path: "mood-analytics",
        Component: MoodAnalytics,
      },
      {
        path: "test-results",
        Component: TestResultsAdmin,
      },
      {
        path: "profile",
        Component: AdminProfile,
      },
    ],
  },
]);