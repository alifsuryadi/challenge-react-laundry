import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Spacer,
  Button,
  Input,
  Checkbox,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../lib/axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username harus memiliki minimal 4 karakter" }),
  password: z
    .string()
    .min(6, { message: "Password harus memiliki minimal 6 karakter" }),
});

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        username: data.username,
        password: data.password,
      });

      const token = response.data.data.token;
      localStorage.setItem("token", token);
      toast.success("Login berhasil!");
      navigate("/dashboard");
      setShowNotification(false);
    } catch (error) {
      if (
        (error.response && error.response.status === 401) ||
        error.response.status === 500
      ) {
        toast.error("Username atau password salah");
      } else {
        toast.error("Terjadi kesalahan tidak terduga");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    if (showNotification) {
      toast.info(
        <>
          <p>
            <strong>Akun Demo:</strong>
          </p>
          <p>
            Username: <strong>admin</strong>
          </p>
          <p>
            Password: <strong>password</strong>
          </p>
        </>,
        {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => setShowNotification(false),
        }
      );
    }
  }, [showNotification]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card style={{ minWidth: "420px", padding: "40px" }}>
        <CardHeader>
          <h1 className="text-2xl font-bold text-center mb-4">
            Selamat Datang
          </h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Username
              </label>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    clearable
                    bordered
                    fullWidth
                    color="default"
                    size="lg"
                    className="block w-full"
                  />
                )}
              />
              {errors.username && (
                <span className="text-red-500 text-sm">
                  {errors.username.message}
                </span>
              )}
            </div>
            <Spacer y={2} />
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <div className="relative">
                    <Input
                      {...field}
                      clearable
                      bordered
                      fullWidth
                      color="default"
                      size="lg"
                      type={showPassword ? "text" : "password"}
                      className="block w-full"
                    />
                    <span
                      className="absolute right-3 top-4 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </span>
                  </div>
                )}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center mt-4">
              <Controller
                name="remember"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox {...field}>
                    <span className="text-sm">Ingatkan saya</span>
                  </Checkbox>
                )}
              />
            </div>
            <Spacer y={2} />
            <div className="flex items-center justify-center">
              <Button
                type="submit"
                style={{ width: "100%", backgroundColor: "#ADD8E6" }}
              >
                Masuk
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Login;
