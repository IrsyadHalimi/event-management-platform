import {
  Link
} from "react-router-dom";

import {
  Button
} from "../ui/button";

import {
  useAuthStore
} from "../../store/auth.store";

export const Navbar =
  () => {
    const {
      token,
      logout
    } = useAuthStore();

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
          <Link
            to="/"
            className="
              font-bold
              text-xl
            "
          >
            Eventify
          </Link>

          <div
            className="
            flex
            items-center
            gap-3
          "
          >
            <Link to="/events">
              Events
            </Link>

            {token ? (
              <>
                <Link to="/dashboard">
                  Dashboard
                </Link>

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
                <Link to="/login">
                  Login
                </Link>

                <Link
                  to="/register"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  };