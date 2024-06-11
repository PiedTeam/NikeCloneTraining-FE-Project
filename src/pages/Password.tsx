import React, { MouseEventHandler } from "react";
import { Input, Link, Button } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import EyeFilledIcon from "../components/icons/EyeFilledIcon.tsx";
import EyeSlashFilledIcon from "../components/icons/EyeSlashFilledIcon.tsx";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordInterfaceApi } from "@services/users.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import usersService from "@services/users.service.ts";

export interface UserInfoForm {
  data: {
    email: string;
  };
}

export interface passwordInterface {
  password: string;
  confirmPassword: string;
}

const Password = () => {
  const userObject = localStorage.getItem("user");
  const access_token: string = JSON.parse(userObject!).access_token;
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const schema = yup.object().shape({
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf(
        [yup.ref("password")],
        "Confirm password must match with passwords",
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordInterface>({
    resolver: yupResolver(schema),
  });

  const handleUpdatePassword: SubmitHandler<passwordInterface> = async (
    dataForm,
  ) => {
    const { data: userInfo } = await usersService.getMe(access_token);
    const patchData: passwordInterfaceApi = {
      email: userInfo!.data.email,
      password: dataForm.password,
    };
    const { message, error } = await usersService.updatePassword({
      access_token,
      _data: patchData,
    });

    if (typeof error === "object" && error !== null && "response" in error) {
      toast.error(error.response.data.data.data.password);
    } else {
      toast.success(message as string);
      setTimeout(() => navigate("/"), 3000);
    }
  };
  const handleUpdateButtonClick: MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();
    handleSubmit(handleUpdatePassword)();
  };

  return (
    <div className="flex h-full  justify-center  ">
      <div className="max-[900px]:text-[14 px] mt-24  flex h-3/4 w-1/2 -translate-y-5 transform  flex-col items-center p-12 shadow-2xl ">
        <h1> Your Password </h1>
        <div className="mx-10 flex justify-center">
          <img
            src="../../src/assets/images/jordan.jpg"
            alt=""
            className="h-4/12 w-4/12 max-[600px]:hidden "
          />
          <img
            src="../../src/assets/images/nike-4-logo-svgrepo-com.svg"
            alt=""
            className="h-4/12 w-4/12 max-[600px]:hidden"
          />
        </div>

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
              className="mb4 focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
              ) : (
                <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-xs"
        />
        <Input
          {...register("confirmPassword")}
          isRequired
          label="Confirm Password"
          variant="bordered"
          placeholder="Enter your Confirm password"
          color={errors.confirmPassword ? "danger" : "success"}
          errorMessage={errors.confirmPassword?.message}
          endContent={
            <button
              className="mb4 focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
              ) : (
                <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="mt-4 max-w-xs"
        />
        <Link
          className="t-0 mt-4"
          isBlock
          showAnchorIcon
          href="#"
          color="primary"
        >
          Back to email
        </Link>
        <Button
          disableRipple
          size="lg"
          className="relative mb-4 mt-4 overflow-visible rounded-full bg-black px-12 text-white shadow-xl  hover:-translate-y-1"
          onClick={handleUpdateButtonClick}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Password;
