import React, { MouseEventHandler, useEffect, useState } from "react";
import { Input, Link, Button } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import EyeFilledIcon from "../../components/EyeFilledIcon.tsx";
import EyeSlashFilledIcon from "../../components/EyeSlashFilledIcon.tsx";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePassword } from "@apis/users.api.ts";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import { runApi } from "@hooks/useApi.ts";

export interface FormDataChangePassword {
  oldPassword: string;
  confirmPassword: string;
  password: string;
}
export interface FormDataChangePasswordApi {
  old_password: string;
  new_password: string;
}
const schema = yup.object().shape({
  oldPassword: yup.string().required(),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password must contain at least 8 characters, including at least one digit, one special character, one uppercase letter, and one lowercase letter",
    ),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Confirm password must match with password"),
});

const ChangePassword = () => {
  // const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataChangePassword>({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const userObject = localStorage.getItem("user");
    const access_token = JSON.parse(userObject!).access_token;
    setAccessToken(access_token);
  }, []);

  const handleChangePassword: SubmitHandler<FormDataChangePassword> = async (
    dataPassChange,
  ) => {
    const updateData: FormDataChangePasswordApi = {
      old_password: dataPassChange.oldPassword,
      new_password: dataPassChange.password,
    };

    const { message, error } = await runApi<FormDataChangePasswordApi>(
      changePassword,
      accessToken,
      updateData,
      "POST",
    );

    if (typeof error === "object" && error !== null && "response" in error) {
      toast.error(error.response.data.data.old_password);
    } else {
      toast.success(message as string);
      // setTimeout(() => navigate("/"), 3000);
    }
  };

  const handleChangePasswordButtonClick: MouseEventHandler<
    HTMLButtonElement
  > = (event) => {
    event.preventDefault();
    handleSubmit(handleChangePassword)();
  };

  return (
    <div>
      <div className="flex justify-center  h-full  ">
        <div className="flex flex-col mt-24  items-center w-1/2 h-3/4 max-[900px]:text-[14 px]  p-12 transform -translate-y-5 shadow-2xl ">
          <h1> Change Password </h1>
          <div className="flex justify-center mx-10">
            <img
              src="../../src/assets/images/jordan.jpg"
              alt=""
              className="w-4/12 h-4/12 max-[600px]:hidden "
            />
            <img
              src="../../src/assets/images/nike-4-logo-svgrepo-com.svg"
              alt=""
              className="w-4/12 h-4/12 max-[600px]:hidden"
            />
          </div>
          <Input
            {...register("oldPassword")}
            isRequired
            label="Old Password"
            variant="bordered"
            placeholder="Enter your old password"
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
            className="max-w-xs mb-4"
          />
          <Input
            {...register("password")}
            isRequired
            label="Password"
            variant="bordered"
            placeholder="Enter your new password"
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
          <Input
            {...register("confirmPassword")}
            isRequired
            label="Confirm Password"
            variant="bordered"
            placeholder="Enter confirm new password"
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
            Back
          </Link>
          <Button
            disableRipple
            size="lg"
            className="relative mt-4 mb-4 overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-black  text-white"
            onClick={handleChangePasswordButtonClick}
          >
            Change
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
