import {
  Link
} from "react-router-dom";

import {
  useAuthStore
} from "../../store/auth.store";

import {
  NavLink
} from "react-router-dom";

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
          <NavLink
            to="/dashboard"
            className={({
              isActive
            }) =>
              `
              px-3
              py-2
              rounded-lg
              transition
              ${
                isActive
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }
            `
            }
          >
            Overview
          </NavLink>

          {user?.role ===
            "ORGANIZER" && (
            <>
              <NavLink
                to="/dashboard/my-events"
                className={({
                  isActive
                }) =>
                  `
                  px-3
                  py-2
                  rounded-lg
                  transition
                  ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }
                `
                }
              >
                My Events
              </NavLink>

              <NavLink
                to="/dashboard/create-event"
                className={({
                  isActive
                }) =>
                  `
                  px-3
                  py-2
                  rounded-lg
                  transition
                  ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }
                `
                }
              >
                Create Event
              </NavLink>

              <NavLink
                to="/dashboard/organizer-transactions"
                className={({
                  isActive
                }) =>
                  `
                  px-3
                  py-2
                  rounded-lg
                  transition
                  ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }
                `
                }
              >
                Transactions
              </NavLink>
            </>
          )}

          <NavLink
            to="/dashboard/my-transactions"
            className={({
              isActive
            }) =>
              `
              px-3
              py-2
              rounded-lg
              transition
              ${
                isActive
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }
            `
            }
          >
            My Transactions
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({
              isActive
            }) =>
              `
              px-3
              py-2
              rounded-lg
              transition
              ${
                isActive
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }
            `
            }
          >
            Profile
          </NavLink>
        </div>
      </aside>
    );
  };