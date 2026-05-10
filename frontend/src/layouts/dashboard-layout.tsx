import {
  Outlet
} from "react-router-dom";

import {
  Sidebar
} from "../components/layout/sidebar";

export const DashboardLayout =
  () => {
    return (
      <div
        className="
        flex
      "
      >
        <Sidebar />

        <main
          className="
          flex-1
          p-6
        "
        >
          <Outlet />
        </main>
      </div>
    );
  };