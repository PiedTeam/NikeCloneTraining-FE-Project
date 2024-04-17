import React, { MouseEventHandler } from "react";
import { Input, Link, Button } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import EyeFilledIcon from "../../components/EyeFilledIcon.tsx";
import EyeSlashFilledIcon from "../../components/EyeSlashFilledIcon.tsx";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormData {
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf(
      [yup.ref("password")],
      "Confirm Passwords must match with Passwords",
    ),
});

const PasswordEntryPage = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleLogin: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const handleLoginButtonClick: MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();
    handleSubmit(handleLogin)();
  };

  return (
    <div className="flex justify-center  h-full  ">
      <div className="flex flex-col mt-24  items-center w-1/2 h-3/4 max-[900px]:text-[14 px]  p-12 transform -translate-y-5 shadow-2xl ">
        <h1>Create your password</h1>
        <p>
          {}{" "}
          <Link
            className="mt-4 t-0"
            isBlock
            showAnchorIcon
            href="#"
            color="primary"
          >
            Change
          </Link>
        </p>
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
          {...register("password")}
          isRequired
          label="Password"
          variant="bordered"
          placeholder="Re-enter your password"
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
          className="max-w-xs mt-4"
        />

        <Input
          {...register("confirmPassword")}
          isRequired
          label="Confirm Password"
          variant="bordered"
          placeholder="Re-enter your password"
          color={errors.confirmPassword ? "danger" : "success"}
          errorMessage={errors.confirmPassword?.message}
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
          className="max-w-xs mt-4"
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
          className="relative mt-8 mb-4 text-left overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-black  text-white"
          onClick={handleLoginButtonClick}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default PasswordEntryPage;
