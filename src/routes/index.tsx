import UsersPage from "@/features/users/users-page";
import { RootLayout } from "@/layouts/root-layout";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <UsersPage />,
            },
        ],
    },
]);
