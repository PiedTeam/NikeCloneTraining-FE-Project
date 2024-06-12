import React, { MouseEventHandler, useEffect, useState } from "react";
import { Input, Link, Button } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import EyeFilledIcon from "../components/icons/EyeFilledIcon.tsx";
import EyeSlashFilledIcon from "../components/icons/EyeSlashFilledIcon.tsx";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { FormDataChangePasswordApi } from "@services/users.api.ts";
import usersService from "@services/users.service.ts";

export interface FormDataChangePassword {
  oldPassword: string;
  confirmPassword: string;
  password: string;
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

    const { message, error } = await usersService.changePassword({
      accessToken,
      _data: updateData,
    });

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
      <div className="flex h-full  justify-center  ">
        <div className="max-[900px]:text-[14 px] mt-24  flex h-3/4 w-1/2 -translate-y-5 transform  flex-col items-center p-12 shadow-2xl ">
          <h1> Change Password </h1>
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
            {...register("oldPassword")}
            isRequired
            label="Old Password"
            variant="bordered"
            placeholder="Enter your old password"
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
            className="mb-4 max-w-xs"
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
            placeholder="Enter confirm new password"
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
            Back
          </Link>
          <Button
            disableRipple
            size="lg"
            className="relative mb-4 mt-4 overflow-visible rounded-full bg-black px-12 text-white shadow-xl  hover:-translate-y-1"
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
