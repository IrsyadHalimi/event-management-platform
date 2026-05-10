import {
  Outlet
} from "react-router-dom";

import {
  Navbar
} from "../components/layout/navbar";

export const PublicLayout =
  () => {
    return (
      <div>
        <Navbar />

        <main
          className="
          max-w-7xl
          mx-auto
          px-4
          py-6
        "
        >
          <Outlet />
        </main>
      </div>
    );
  };