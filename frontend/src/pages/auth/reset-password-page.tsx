import {
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  useMutation
} from "@tanstack/react-query";

import {
  resetPasswordService
} from "../../services/user.service";

import {
  Card,
  CardContent
} from "../../components/ui/card";

import {
  Input
} from "../../components/ui/input";

import {
  Button
} from "../../components/ui/button";

import { toast }
  from "sonner";

export default function ResetPasswordPage() {
  const { token } =
    useParams();

  const navigate =
    useNavigate();

  const [password, setPassword] =
    useState("");

  const mutation =
    useMutation({
      mutationFn: () =>
        resetPasswordService(
          token!,
          password
        ),

      onSuccess: () => {
        toast.success(
          "Password reset success"
        );

        navigate(
          "/login"
        );
      },

      onError: () => {
        toast.error(
          "Invalid token"
        );
      }
    });

  return (
    <div
      className="
      flex
      justify-center
      items-center
      min-h-screen
    "
    >
      <Card
        className="
        w-full
        max-w-md
      "
      >
        <CardContent
          className="
          p-6
          space-y-4
        "
        >
          <h1
            className="
            text-2xl
            font-bold
          "
          >
            Reset Password
          </h1>

          <Input
            type="password"
            placeholder="New password"
            value={
              password
            }
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <Button
            className="
            w-full
          "
            onClick={() =>
              mutation.mutate()
            }
          >
            Reset Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}