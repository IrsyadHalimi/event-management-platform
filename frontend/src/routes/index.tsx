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

import EventDetailPage
  from "../pages/events/event-detail-page";

import MyTransactionsPage
  from "../pages/dashboard/my-transactions-page";

import {
  ProtectedRoute
} from "./protected-route";

import MyEventsPage
  from "../pages/dashboard/my-events-page";

import CreateEventPage
  from "../pages/dashboard/create-event-page";

import OrganizerTransactionsPage
  from "../pages/dashboard/organizer-transactions-page";

import RoleRoute
  from "./role-route";

import EditEventPage
  from "../pages/dashboard/edit-event-page";

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
            path="/events/:slug"
            element={
              <EventDetailPage />
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

          <Route
            path="my-transactions"
            element={
              <MyTransactionsPage />
            }
          />

          <Route
            path="my-events"
            element={
              <RoleRoute
                allowedRoles={[
                  "ORGANIZER"
                ]}
              >
                <MyEventsPage />
              </RoleRoute>
            }
          />

          <Route
            path="create-event"
            element={
              <RoleRoute
                allowedRoles={[
                  "ORGANIZER"
                ]}
              >
                <CreateEventPage />
              </RoleRoute>
            }
          />

          <Route
            path="edit-event/:id"
            element={
              <RoleRoute
                allowedRoles={[
                  "ORGANIZER"
                ]}
              >
                <EditEventPage />
              </RoleRoute>
            }
          />

          <Route
            path="organizer-transactions"
            element={
              <RoleRoute
                allowedRoles={[
                  "ORGANIZER"
                ]}
              >
                <OrganizerTransactionsPage />
              </RoleRoute>
            }
          />
        </Route>
      </Routes>
    );
  };