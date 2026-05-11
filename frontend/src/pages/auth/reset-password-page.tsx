import {
  useState
} from "react";

import {
  useNavigate,
  useSearchParams
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
  const navigate =
    useNavigate();

  const [searchParams] =
    useSearchParams();

  const token =
    searchParams.get(
      "token"
    );

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

      onError: (
        error: any
      ) => {
        toast.error(
          error.response?.data
            ?.message ||
            "Invalid token"
        );
      }
    });

  const handleSubmit =
    () => {
      if (!token) {
        toast.error(
          "Token not found"
        );

        return;
      }

      mutation.mutate();
    };

  return (
    <div
      className="
      flex
      justify-center
      items-center
      min-h-screen
      bg-gray-50
      px-4
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
          <div
            className="
            text-center
            space-y-2
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

            <p
              className="
              text-sm
              text-gray-500
            "
            >
              Enter your new password
            </p>
          </div>

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
            onClick={
              handleSubmit
            }
            disabled={
              mutation.isPending
            }
          >
            {mutation.isPending
              ? "Resetting..."
              : "Reset Password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}