import {
  useState
} from "react";

import {
  useMutation
} from "@tanstack/react-query";

import {
  forgotPasswordService
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

export default function ForgotPasswordPage() {
  const [email, setEmail] =
    useState("");

  const mutation =
    useMutation({
      mutationFn:
        forgotPasswordService,

      onSuccess: () => {
        toast.success(
          "Reset password link sent"
        );
      },

      onError: () => {
        toast.error(
          "Failed"
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
            Forgot Password
          </h1>

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <Button
            className="
            w-full
          "
            onClick={() =>
              mutation.mutate(
                email
              )
            }
          >
            Send Reset Link
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}