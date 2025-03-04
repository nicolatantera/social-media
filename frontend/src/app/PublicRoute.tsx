import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AuthState } from "@/utils/interfaces/Auth";
import { ReactElement } from "react";

interface PublicRouteProps {
  element: ReactElement;
}

export default function PublicRoute({ element }: PublicRouteProps) {
  const isAuth = Boolean(useSelector((state: AuthState) => state.token));

  return isAuth ? <Navigate to="/social-media/home" replace /> : element;
}
