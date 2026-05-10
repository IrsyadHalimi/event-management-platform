import {
  Link
} from "react-router-dom";

import {
  useAuthStore
} from "../../store/auth.store";

export const Sidebar =
  () => {
    const user =
      useAuthStore(
        (state) =>
          state.user
      );

    return (
      <aside
        className="
        w-64
        min-h-screen
        border-r
        bg-white
        p-4
      "
      >
        <div
          className="
          text-xl
          font-bold
          mb-6
        "
        >
          Dashboard
        </div>

        <div
          className="
          flex
          flex-col
          gap-4
        "
        >
          <Link to="/dashboard">
            Overview
          </Link>

          {user?.role ===
            "ORGANIZER" && (
            <>
              <Link
                to="/dashboard/my-events"
              >
                My Events
              </Link>

              <Link
                to="/dashboard/create-event"
              >
                Create Event
              </Link>

              <Link
                to="/dashboard/organizer-transactions"
              >
                Transactions
              </Link>
            </>
          )}

          <Link
            to="/dashboard/my-transactions"
          >
            My Transactions
          </Link>

          <Link
            to="/dashboard/profile"
          >
            Profile
          </Link>
        </div>
      </aside>
    );
  };