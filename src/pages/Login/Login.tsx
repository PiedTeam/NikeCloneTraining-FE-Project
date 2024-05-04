import React, { MouseEventHandler } from "react";
import { Input, Link, Button } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import EyeFilledIcon from "../../components/EyeFilledIcon.tsx";
import EyeSlashFilledIcon from "../../components/EyeSlashFilledIcon.tsx";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DocumentTitle from "@components/DocumentTitle.tsx";
import { useMutation } from "@tanstack/react-query";
// import { isAxiosError } from "@utils/utils.ts";
import { useNavigate } from "react-router-dom";
import { login } from "@apis/users.api.ts";

export interface LoginFormData {
  username: string;
  password: string;
}

// type FormError =
//   | {
//       [key in keyof FormData]?: string;
//     }
//   | null;

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: (body: LoginFormData) => {
      return login(body);
    },
  });

  // const errorForm: FormError = useMemo(() => {
  //   if (
  //     isAxiosError<{ error: FormError }>(error) &&
  //     error.response?.status === 422
  //   ) {
  //     return error.response?.data.error;
  //   }
  //   return null;
  // }, [error]);

  const handleLogin: SubmitHandler<LoginFormData> = (data) => {
    console.log(data);
    mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  const handleLoginButtonClick: MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();
    handleSubmit(handleLogin)();
  };

  return (
    <>
      <DocumentTitle title="Login" />
      <div className="flex justify-center h-full  ">
        <div className="flex flex-col mt-24  items-center w-1/2 h-3/4 max-[900px]:text-[14 px]  p-12 transform -translate-y-5 shadow-2xl ">
          <h1>WELCOME BACK</h1>
          <div className="flex justify-center mx-10">
            <img
              src="../../src/assets/images/jordan.jpg"
              alt=""
              className="w-4/12 h-6/12 max-[600px]:hidden "
            />
            <img
              src="../../src/assets/images/nike-4-logo-svgrepo-com.svg"
              alt=""
              className="w-4/12 h-6/12 max-[600px]:hidden"
            />
          </div>
          <Input
            {...register("username")}
            type="username"
            label="Username"
            variant="bordered"
            placeholder="Enter your username"
            isInvalid={errors.username ? true : undefined}
            color={errors.username ? "danger" : "success"}
            errorMessage={errors.username?.message}
            className="max-w-xs mb-4"
          />

          <Input
            {...register("password")}
            isRequired
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            color={errors.password ? "danger" : "success"}
            errorMessage={errors.password?.message}
            endContent={
              <button
                className="focus:outline-none mb4"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-xs"
          />
          <Link
            className="mt-4 t-0"
            isBlock
            showAnchorIcon
            href="#"
            color="primary"
          >
            Forgot Password
          </Link>
          <Button
            disableRipple
            size="lg"
            className="relative mt-4 mb-4 overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-black  text-white"
            onClick={handleLoginButtonClick}
          >
            Login
          </Button>
          <div className="flex justify-center w-full">
            <hr className="mr-1 mt-3 border border-gray-300 w-2/3" />
            <p>Or</p>
            <hr className="ml-1 mt-3 border border-gray-300 w-2/3" />
          </div>
          <div className="flex mt-4">
            <Button
              className="mr-4 w-2/4 border-4  max-[900px]:w-32  max-[900px]:text-[0] max-[600px]:w-16 "
              radius="none"
            >
              Login With Facebook
              <FaFacebook className="text-blue-800 text-5xl " />
            </Button>
            <Button
              className="ml-4 border-4 w-2/4 max-[900px]:w-32 max-[900px]:text-[0] max-[600px]:w-16   "
              radius="none"
            >
              Login With Google
              <FcGoogle className="text-4xl" />
            </Button>
          </div>
          <p className="text-center">
            You just found out Nike ?
            <Link
              className="mt-4 t-0"
              isBlock
              isExternal={false}
              href="/register"
              color="primary"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
