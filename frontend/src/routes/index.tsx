import {
  Routes,
  Route
} from "react-router-dom";

import {
  PublicLayout
} from "../layouts/public-layout";

import {
  DashboardLayout
} from "../layouts/dashboard-layout";

import HomePage
  from "../pages/home-page";

import LoginPage
  from "../pages/auth/login-page";

import RegisterPage
  from "../pages/auth/register-page";

import DashboardPage
  from "../pages/dashboard/dashboard-page";

import {
  ProtectedRoute
} from "./protected-route";

export const AppRoutes =
  () => {
    return (
      <Routes>
        <Route
          element={
            <PublicLayout />
          }
        >
          <Route
            path="/"
            element={
              <HomePage />
            }
          />

          <Route
            path="/login"
            element={
              <LoginPage />
            }
          />

          <Route
            path="/register"
            element={
              <RegisterPage />
            }
          />
        </Route>

        <Route
          path="/dashboard"

          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <DashboardPage />
            }
          />
        </Route>
      </Routes>
    );
  };