import React, { MouseEventHandler } from "react";
import { Link, Button } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import BrandLogo from "@components/common/BrandLogo.tsx";
import InputControl from "@components/common/InputControl";
import ButtonPreviewPassword from "@components/common/ButtonPreviewPassword";

interface LoginFormValues {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  const handleLogin: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data);
  };

  const handleLoginButtonClick: MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();
    handleSubmit(handleLogin)();
  };

  return (
    <div className="flex justify-center h-full">
      <div className="flex flex-col mt-24 items-center w-1/2 h-3/4 max-[900px]:text-[14 px] p-12 transform -translate-y-5 shadow-2xl">
        <h1>WELCOME BACK</h1>
        <BrandLogo />
        <InputControl<LoginFormValues>
          isRequired
          isError={!!errors.email}
          errorMessage={errors.email?.message}
          register={register}
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          className="max-w-xs mb-4"
        />
        <InputControl<LoginFormValues>
          isError={!!errors.password}
          register={register}
          name="password"
          isRequired
          label="Password"
          placeholder="Enter your password"
          errorMessage={errors.password?.message}
          endContent={
            <ButtonPreviewPassword
              toggleVisibility={toggleVisibility}
              isVisible={isVisible}
            />
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
            endContent={<FaFacebook className="text-blue-800 text-5xl " />}
          >
            Login With Facebook
          </Button>
          <Button
            className="ml-4 border-4 w-2/4 max-[900px]:w-32 max-[900px]:text-[0] max-[600px]:w-16   "
            radius="none"
            endContent={<FcGoogle className="text-4xl" />}
          >
            Login With Google
          </Button>
        </div>
        <p className="text-center">
          You just found out Nike ?
          <Link className="mt-4 t-0" isBlock href="#" color="primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
