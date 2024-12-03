import React from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

interface ProtectedRouteProps {
  isLogedin: boolean;
  children: React.ReactNode;
}

export const ProtectedRoute = observer(({ isLogedin, children }: ProtectedRouteProps) => {
  return isLogedin ? <>{children}</> : <Navigate to="/Login" />;
});
