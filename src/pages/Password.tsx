import React, { MouseEventHandler } from "react";
import { Input, Link, Button } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ResetPasswordResponse,
  passwordInterfaceApi,
} from "@services/users.api";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import usersService from "@services/users.service.ts";
import { useAuthStore } from "@stores/AuthStore.ts";
import { isAxiosUnprocessableEntityError } from "@utils/utils.ts";
import { ResponseApi } from "@utils/utils.type.ts";
import { SvgIcon } from "@common/components";
import { ButtonPreviewPassword } from "@components/index";

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
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);
  const access_token = useAuthStore((state) => state.auth?.user?.access_token);
  const location = useLocation();
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
    if (location.state?.from === "/otp") {
      try {
        const response = await usersService.resetPassword({
          email_phone: location.state.email_phone,
          password: dataForm.password,
          confirm_password: dataForm.confirmPassword,
          otp: location.state.otp,
        });
        if (response.status === 200) {
          toast.success("Reset Password Successfully");
          setTimeout(() => navigate("/login"), 3000);
        }
      } catch (error) {
        if (
          isAxiosUnprocessableEntityError<ResponseApi<ResetPasswordResponse>>(
            error,
          )
        ) {
          const formError = error.response?.data.data;
          if (formError) {
            if ("password" in formError) {
              toast.error(formError.data?.password);
            } else if ("confirm_password" in formError) {
              toast.error(formError.data?.confirm_password);
            } else if ("otp" in formError) {
              toast.error(formError.data?.otp);
            }
          }
        }
      }
    } else {
      const { data: userInfo } = await usersService.getMe(
        access_token as string,
      );
      const patchData: passwordInterfaceApi = {
        email: userInfo!.data.email,
        password: dataForm.password,
      };
      const { message, error } = await usersService.updatePassword({
        access_token: access_token as string,
        _data: patchData,
      });
      if (typeof error === "object" && error !== null && "response" in error) {
        toast.error(error.response.data.data.data.password);
      } else {
        toast.success(message as string);
        setTimeout(() => navigate("/"), 3000);
      }
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
          <SvgIcon icon="jordan" className="h-4/12 w-4/12 max-[600px]:hidden" />
          <SvgIcon
            icon="nike-signup"
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
            <ButtonPreviewPassword
              isVisible={isVisible}
              toggleVisibility={toggleVisibility}
            />
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
            <ButtonPreviewPassword
              isVisible={isVisible}
              toggleVisibility={toggleVisibility}
            />
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
