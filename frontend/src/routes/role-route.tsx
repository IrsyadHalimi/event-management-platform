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

export default function RoleRoute({
  children,
  allowedRoles
}: Props) {
  const user =
    useAuthStore(
      (state) =>
        state.user
    );

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const isAllowed =
    allowedRoles.includes(
      user.role
    );

  if (!isAllowed) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return children;
}