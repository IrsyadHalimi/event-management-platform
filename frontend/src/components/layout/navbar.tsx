import {
  Link
} from "react-router-dom";

import {
  Button
} from "../ui/button";

import {
  useAuthStore
} from "../../store/auth.store";

import {
  LogIn,
  LogOut,
  Ticket,
  UserRoundPlus
} from "lucide-react";

export const Navbar =
  () => {
    const {
      token,
      logout
    } = useAuthStore();
    const user = useAuthStore((state) => state.user);

    return (
      <nav
        className="
        border-b
        bg-white
      "
      >
        <div
          className="
          max-w-7xl
          mx-auto
          px-4
          py-4
          flex
          items-center
          justify-between
        "
        >
          <div className="">
            
            <Link
              to="/"
              className="
                font-bold
                text-4xl
                flex items-center gap-2
                purple
              "
            >
            <Ticket size={48} />
              Eventify
            </Link>
          </div>

          <div
            className="
            flex
            items-center
            gap-3
          "
          >

            {token ? (
              <>
                {user?.role === "ORGANIZER" ? (
                  <Link
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/dashboard/my-transactions"
                  >
                    My Transactions
                  </Link>
                )}

                <Button
                  variant="destructive"
                  onClick={() => {
                    logout();
                    window.location.href =
                      "/login";
                  }}
                  title="Logout"
                  aria-label="Logout"
                >
                  <LogOut />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" title="Login" aria-label="Login">
                <Button
                  variant="default"
                  title="Login"
                  aria-label="Login"
                >
                  Login
                  <LogIn />
                </Button>
                </Link>

                <Link
                  to="/register"
                >
                  <Button
                    variant="default"
                    title="Register"
                    aria-label="Register"
                  >
                    Register
                  <UserRoundPlus />
                </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  };