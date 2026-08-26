import { Layout } from "@/design-system";
import {
  BOTTOM_NAV_ITEMS,
  HEADER_NAV_ITEMS,
  MAIN_NAV_ITEMS,
  MOCK_PROJECTS,
} from "@/lib/mockData";
import { Overview } from "@/pages/Overview";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import avatarImage from "./assets/fran.png";

function DashboardLayout() {
  return (
    <Layout
      sidebarProps={{
        currentProject: MOCK_PROJECTS[0],
        projects: MOCK_PROJECTS,
        mainNavItems: MAIN_NAV_ITEMS,
        bottomNavItems: BOTTOM_NAV_ITEMS,
      }}
      headerProps={{
        navItems: HEADER_NAV_ITEMS,
        avatar: {
          fallback: "Fran Sanchez",
          src: avatarImage,
          label: "Account",
        },
      }}
    >
      <Outlet />
    </Layout>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
