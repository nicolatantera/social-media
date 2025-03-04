import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AuthState } from '@/utils/interfaces/Auth';
import { ReactElement } from 'react';

interface ProtectedRouteProps {
  element: ReactElement;
}

export default function ProtectedRoute({ element }: ProtectedRouteProps) {
  const isAuth = Boolean(useSelector((state: AuthState) => state.token))

  return isAuth ? element : <Navigate to="/social-media/" replace />;
};
