import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { isAxiosUnprocessableEntityError } from "@utils/utils.ts";

import useDocumentTitle from "@hooks/useDocumentTitle.ts";
import { useForm, SubmitHandler, FieldValues, Path } from "react-hook-form";
import { MouseEventHandler, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { LoginFormData } from "@services/users.api";
import { ResponseApi } from "@utils/utils.type.ts";

import {
  ButtonPreviewPassword,
  InputControl,
  ThirdPartyButton,
} from "@components/index";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import usersService from "@services/users.service";
import { useAuthStore } from "@stores/AuthStore";
import { jwtDecode } from "jwt-decode";
import { BrandLogo } from "@common/components";

type LoginFieldSchema<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder: string;
};

const EmailPhoneSchema: LoginFieldSchema<LoginFormData> = {
  name: "email_phone",
  label: "Email Or Phone",
  placeholder: "Enter your Email or Phone Number",
};

const PasswordSchema: LoginFieldSchema<LoginFormData> = {
  name: "password",
  label: "Password",
  placeholder: "Enter your password",
};

const schema = yup.object().shape({
  email_phone: yup.string().required("Email or Phone is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const [errorMsg, setErrorMsg] = useState<string>("");
  useDocumentTitle({ title: "Login" });
  const { register, handleSubmit, setError } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: (body: LoginFormData) => {
      return usersService.login(body);
    },
  });

  const handleLogin: SubmitHandler<LoginFormData> = (data) => {
    mutate(data, {
      onSuccess: (response) => {
        toast.success("Login successfully");
        setErrorMsg("");
        setAuth({
          user: {
            access_token: response.data.data.access_token,
            exp: "",
            iat: "",
            new_user: false,
          },
          isAuthenticated: true,
          isInitialized: true,
          status:
            jwtDecode<{
              exp: number;
              iat: number;
              status: number;
              token_type: number;
              user_id: string;
            }>(response.data.data.access_token).status === 1
              ? "VERIFIED"
              : "UNVERIFIED",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      },
      onError: (error) => {
        if (
          isAxiosUnprocessableEntityError<ResponseApi<LoginFormData>>(error)
        ) {
          setErrorMsg("Email or Password is incorrect");
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof LoginFormData, {
                message: formError[key as keyof LoginFormData],
                type: "Server",
              });
              toast.error("Invalid email or password");
            });
          }
        } else {
          toast.error("Please try again later");
        }
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
      <div className="flex h-full justify-center">
        <div className="max-[900px]:text-[14 px] mt-24  flex h-3/4 w-1/2 -translate-y-5 transform  flex-col items-center p-12 shadow-2xl ">
          <h1>WELCOME BACK</h1>
          <BrandLogo isShowNikeLogo />
          <InputControl<LoginFormData>
            isRequired
            isError={!!errorMsg}
            register={register}
            className="mb-4 max-w-xs"
            errorMessage={errorMsg}
            {...EmailPhoneSchema}
          />

          <InputControl<LoginFormData>
            register={register}
            isRequired
            isError={!!errorMsg}
            errorMessage={errorMsg}
            endContent={
              <ButtonPreviewPassword
                isVisible={isVisible}
                toggleVisibility={() => setIsVisible(!isVisible)}
              />
            }
            type={isVisible ? "text" : "password"}
            className="max-w-xs"
            {...PasswordSchema}
          />
          <Link
            className="t-0 mt-4"
            isBlock
            showAnchorIcon
            href="/recovery"
            color="primary"
          >
            Forgot Password
          </Link>
          <Button
            disableRipple
            size="lg"
            className="relative mb-4 mt-4 overflow-visible rounded-full bg-black px-12 text-white shadow-xl  hover:-translate-y-1"
            onClick={handleLoginButtonClick}
          >
            Login
          </Button>
          <div className="flex w-full justify-center">
            <hr className="mr-1 mt-3 w-2/3 border border-gray-300" />
            <p>Or</p>
            <hr className="ml-1 mt-3 w-2/3 border border-gray-300" />
          </div>
          <div className="mt-4 flex">
            <ThirdPartyButton
              className="mr-4 w-2/4 border-4  max-[900px]:w-32  max-[900px]:text-[0] max-[600px]:w-16"
              onClick={() => {
                window.location.href = import.meta.env.VITE_FACEBOOK_OAUTH_URL;
              }}
              endContent={<FaFacebook className="text-5xl text-blue-800 " />}
              content="Login With Facebook"
            />
            <ThirdPartyButton
              className="mr-4 w-2/4 border-4  max-[900px]:w-32  max-[900px]:text-[0] max-[600px]:w-16"
              onClick={() => {
                window.location.href = import.meta.env.VITE_GOOGLE_OAUTH_URL;
              }}
              endContent={<FcGoogle className="text-4xl" />}
              content="Login With Google"
            />
          </div>
          <p className="text-center">
            You just found out Nike ?
            <Link
              className="t-0 mt-4"
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
