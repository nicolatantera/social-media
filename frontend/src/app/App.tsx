import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "@/pages/HomePage/HomePage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import ProfilePage from "@/pages/ProfilePage/ProfilePage";
import NoPage from "@/pages/NoPage/NoPage";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { themeSettings } from "@/utils/theme/theme";
import { AuthState } from "@/utils/interfaces/Auth";

const router = createBrowserRouter([
  {
    path: "/social-media/",
    element: <PublicRoute element={<LoginPage />} />,
  },
  {
    path: "/social-media/home",
    element: <ProtectedRoute element={<HomePage />} />,
  },
  {
    path: "/social-media/profile/:userId",
    element: <ProtectedRoute element={<ProfilePage />} />,
  },
  {
    path: "*",
    element: <NoPage />,
  },
]);

export default function App() {
  const mode = useSelector((state: AuthState) => state.mode);
  const theme = useMemo(() => themeSettings(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
