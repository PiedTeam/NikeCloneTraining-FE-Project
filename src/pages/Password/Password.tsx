import React, { MouseEventHandler } from "react";
import { Input, Link, Button } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import EyeFilledIcon from "../../components/EyeFilledIcon.tsx";
import EyeSlashFilledIcon from "../../components/EyeSlashFilledIcon.tsx";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useApi, { runApi } from "@hooks/useApi.ts";
import { getMe, updatePassword } from "@apis/users.api.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface PasswordForm {
  password: string;
  confirmPassword: string;
}
interface UserInfo {
  data: {
    email: string;
  };
}
interface response {
  message: string;
}

const Password = () => {
  const userObject = localStorage.getItem("user");
  const access_token = JSON.parse(userObject!).access_token;
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);
  const { data: userInfo } = useApi<UserInfo>(getMe, access_token);

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
  } = useForm<PasswordForm>({
    resolver: yupResolver(schema),
  });

  const handleUpdatePassword: SubmitHandler<PasswordForm> = async (
    dataForm,
  ) => {
    const patchData = { ...dataForm, email: userInfo!.data!.email };
    console.log(patchData);

    try {
      const { data } = await runApi<response>(
        updatePassword,
        access_token,
        patchData,
        "POST",
      );

      toast.success(data?.message);
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateButtonClick: MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();
    console.log("Button Clicked, preparing to submit the form");
    handleSubmit(handleUpdatePassword)();
  };

  return (
    <div className="flex justify-center  h-full  ">
      <div className="flex flex-col mt-24  items-center w-1/2 h-3/4 max-[900px]:text-[14 px]  p-12 transform -translate-y-5 shadow-2xl ">
        <h1> Your Password </h1>
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
          Back to email
        </Link>
        <Button
          disableRipple
          size="lg"
          className="relative mt-4 mb-4 overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-black  text-white"
          onClick={handleUpdateButtonClick}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Password;
