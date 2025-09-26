import App from "@/App";
import DashboardPage from "@/features/dashboard/dashboard-page";
import { RootLayout } from "@/layouts/root-layout";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <DashboardPage />,
            },
        ],
    },
]);
