import {
  Link
} from "react-router-dom";

export const Sidebar =
  () => {
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

          <Link
            to="/dashboard/my-events"
          >
            My Events
          </Link>

          <Link
            to="/dashboard/my-transactions"
          >
            Transactions
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