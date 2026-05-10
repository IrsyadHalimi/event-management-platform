import {
  useForm
} from "react-hook-form";

import {
  zodResolver
} from "@hookform/resolvers/zod";

import {
  registerSchema
} from "../../validators/auth.validator";

import { z }
  from "zod";

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

import {
  Label
} from "../../components/ui/label";

import {
  registerService
} from "../../services/auth.service";

import { toast }
  from "sonner";

import {
  useNavigate
} from "react-router-dom";

type RegisterForm =
  z.infer<
    typeof registerSchema
  >;

export default function RegisterPage() {
  const navigate =
    useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<RegisterForm>({
    resolver:
      zodResolver(
        registerSchema
      )
  });

  const onSubmit =
    async (
      data:
        RegisterForm
    ) => {
      try {
        await registerService(
          data
        );

        toast.success(
          "Register success"
        );

        navigate(
          "/login"
        );
      } catch (error: any) {
        toast.error(
          error.response?.data
            ?.message ||
            "Register failed"
        );
      }
    };

  return (
    <div
      className="
      flex
      justify-center
      items-center
      min-h-[80vh]
    "
    >
      <Card
        className="
        w-full
        max-w-md
      "
      >
        <CardContent
          className="p-6"
        >
          <h1
            className="
            text-2xl
            font-bold
            mb-6
          "
          >
            Register
          </h1>

          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
            className="
            space-y-4
          "
          >
            <div>
              <Label>
                Name
              </Label>

              <Input
                {...register(
                  "name"
                )}
              />

              <p
                className="
                text-red-500
                text-sm
              "
              >
                {
                  errors.name
                    ?.message
                }
              </p>
            </div>

            <div>
              <Label>
                Email
              </Label>

              <Input
                type="email"
                {...register(
                  "email"
                )}
              />

              <p
                className="
                text-red-500
                text-sm
              "
              >
                {
                  errors.email
                    ?.message
                }
              </p>
            </div>

            <div>
              <Label>
                Password
              </Label>

              <Input
                type="password"
                {...register(
                  "password"
                )}
              />

              <p
                className="
                text-red-500
                text-sm
              "
              >
                {
                  errors
                    .password
                    ?.message
                }
              </p>
            </div>

            <div>
              <Label>
                Role
              </Label>

              <select
                {...register(
                  "role"
                )}
                className="
                w-full
                border
                rounded-md
                p-2
              "
              >
                <option value="">
                  Select role
                </option>

                <option value="CUSTOMER">
                  Customer
                </option>

                <option value="ORGANIZER">
                  Organizer
                </option>
              </select>

              <p
                className="
                text-red-500
                text-sm
              "
              >
                {
                  errors.role
                    ?.message
                }
              </p>
            </div>

            <Button
              className="
              w-full
            "
              disabled={
                isSubmitting
              }
            >
              {isSubmitting
                ? "Loading..."
                : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}