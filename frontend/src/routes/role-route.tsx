import {
  Navigate
} from "react-router-dom";

import {
  useAuthStore
} from "../store/auth.store";

interface Props {
  children:
    React.ReactNode;

  allowedRoles:
    string[];
}

export const RoleRoute =
  ({
    children,
    allowedRoles
  }: Props) => {
    const user =
      useAuthStore(
        (state) =>
          state.user
      );

    if (
      !user ||
      !allowedRoles.includes(
        user.role
      )
    ) {
      return (
        <Navigate
          to="/"
        />
      );
    }

    return children;
  };