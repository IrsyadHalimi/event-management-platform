import {
  useForm
} from "react-hook-form";

import {
  zodResolver
} from "@hookform/resolvers/zod";

import {
  loginSchema
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
  loginService
} from "../../services/auth.service";

import { toast }
  from "sonner";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuthStore
} from "../../store/auth.store";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await loginService(data as any); 

      const result = response.data || response;

      setAuth(result.token, result.user);

      toast.success("Login success");

      const urlParams = result?.user?.role === "ORGANIZER" ? "/dashboard" : "/dashboard/my-transactions";
      
      navigate(urlParams);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Login failed"
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
            Login
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
                : "Login"}
            </Button>

            <div
              className="
              text-right
              mt-2
            "
            >
              <a
                href="/forgot-password"
                className="
                text-sm
                text-blue-500
              "
              >
                Forgot password?
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}