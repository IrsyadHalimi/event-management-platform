import {
  useAuthStore
} from "../../store/auth.store";

import {
  NavLink
} from "react-router-dom";

import {
  Button
} from "../ui/button";

import { Skeleton } from "@/components/ui/skeleton";

const SidebarLink = ({ to, label, end = true }: { to: string; label: string; end?: boolean }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `px-3 py-2 rounded-lg transition ${
        isActive ? "bg-black text-white" : "hover:bg-gray-100"
      }`
    }
  >
    {label}
  </NavLink>
);

export const Sidebar = () => {
  const user = useAuthStore((state) => state.user);
  const isRehydrating = useAuthStore.persist?.hasHydrated ? !useAuthStore.persist.hasHydrated() : !user;
  const {
    token,
    logout
  } = useAuthStore();

  return (
    <aside className="w-64 min-h-screen border-r bg-white p-4">
      <div className="text-xl font-bold mb-6">Dashboard</div>

      <div className="flex flex-col gap-4">
        <SidebarLink to="/dashboard" label="Overview" />

        {isRehydrating ? (
          <div className="space-y-4 px-3">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        ) : (
          <>
            {user?.role === "ORGANIZER" && (
              <>
                <SidebarLink to="/dashboard/my-events" label="My Events" />
                <SidebarLink to="/dashboard/create-event" label="Create Event" />
                <SidebarLink to="/dashboard/organizer-transactions" label="Transactions" />
              </>
            )}

            {user?.role === "CUSTOMER" && (
              <>
                <SidebarLink to="/dashboard/my-transactions" label="My Transactions" />
              </>
            )}
            <SidebarLink to="/dashboard/profile" label="Profile" />
          </>
        )}

        {token ? (
          <>
            <SidebarLink to="/" label="Home Page"/>

            <Button
              variant="destructive"
              onClick={() => {
                logout();
                window.location.href =
                  "/login";
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <SidebarLink to="/login" label="Login" />
            <SidebarLink to="/register" label="Register" />
          </>
        )}
      </div>
    </aside>
  );
};