import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import api from "@/services/axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/v1/signup", {
        email: data.email,
        password: data.password,
      });

      alert("Registration Successful! Please Login.");

      reset();

      navigate("/login");
    } catch (error) {
  console.log(error.response?.data);

  const message =
    error.response?.data?.msg ||
    error.response?.data?.message ||
    "Registration Failed";

  alert(message);
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-[400px] shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            Register
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <Label>Email</Label>

              <Input
                type="email"
                placeholder="Enter Email"
                {...register("email", {
                  required: "Email is required",
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label>Password</Label>

              <Input
                type="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required",
                  },
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
            >
              Register
            </Button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-medium"
              >
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}