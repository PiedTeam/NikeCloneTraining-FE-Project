//utils
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { isAxiosError, isAxiosUnprocessableEntityError } from "@utils/utils.ts";

// assets
import Jordan from "../../public/assets/images/Jordan.jpg";

// hooks
import useDocumentTitle from "@hooks/useDocumentTitle.tsx";
import { useForm, SubmitHandler } from "react-hook-form";
import { MouseEventHandler, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// apis
import { login } from "@apis/users.api.ts";
import { ResponseApi } from "@utils/utils.type.ts";
import { isProduction } from "@utils/http.ts";

// components
import { ButtonPreviewPassword, InputControl, BrandLogo } from "@components/index";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, Button } from "@nextui-org/react";
import { toast } from "react-toastify";

export interface LoginFormData {
  email_phone: string;
  password: string;
  email?: string;
  phone_number?: string;
}

const schema = yup.object().shape({
  email_phone: yup.string().required("Email or Phone is required"),
  password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useDocumentTitle({ title: "Login" });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: (body: LoginFormData) => {
      return login(body);
    },
  });

  const handleLogin: SubmitHandler<LoginFormData> = (data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Login successfully");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<LoginFormData>>(error)) {
          const formError = error.response?.data.data;
          toast.error("Email/Phone number or Password is incorrect");
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof LoginFormData, {
                message: formError[key as keyof LoginFormData],
                type: "Server",
              });
            });
          }
        } else if (isAxiosError(error)) {
          if (error.response?.status === 429) {
            toast.error("Please try again after 5 minutes");
          }
        }
      },
    });
  };

  const handleLoginButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    console.log(errors);
    handleSubmit(handleLogin)();
  };

  return (
    <>
      <div className="flex justify-center h-full">
        <div className="flex flex-col mt-24  items-center w-1/2 h-3/4 max-[900px]:text-[14 px]  p-12 transform -translate-y-5 shadow-2xl ">
          <h1>WELCOME BACK</h1>
          <BrandLogo image_url={Jordan} showNikeLogo />
          <InputControl<LoginFormData>
            isRequired
            isError={!!errors.email_phone || !!errors.email || !!errors.phone_number}
            register={register}
            name="email_phone"
            type="email_phone"
            label="Email Or Phone"
            placeholder="Enter your Email or Phone Number"
            errorMessage={errors.email_phone?.message || errors.email?.message || errors.phone_number?.message}
            className="max-w-xs mb-4"
          />

          <InputControl<LoginFormData>
            register={register}
            isRequired
            isError={!!errors.password}
            name="password"
            label="Password"
            placeholder="Enter your password"
            errorMessage={errors.password?.message}
            endContent={
              <ButtonPreviewPassword isVisible={isVisible} toggleVisibility={() => setIsVisible(!isVisible)} />
            }
            type={isVisible ? "text" : "password"}
            className="max-w-xs"
          />
          <Link className="mt-4 t-0" isBlock showAnchorIcon href="/recovery" color="primary">
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
              onClick={() => {
                window.location.href = isProduction
                  ? (import.meta.env.VITE_PRODUCTION_FACEBOOK_OAUTH_URL as string)
                  : (import.meta.env.VITE_DEVELOPEMENT_FACEBOOK_OAUTH_URL as string);
              }}
              endContent={<FaFacebook className="text-blue-800 text-5xl " />}
            >
              Login With Facebook
            </Button>
            <Button
              className="ml-4 border-4 w-2/4 max-[900px]:w-32 max-[900px]:text-[0] max-[600px]:w-16   "
              radius="none"
              onClick={() => {
                window.location.href = isProduction
                  ? (import.meta.env.VITE_PRODUCTION_GOOGLE_OAUTH_URL as string)
                  : (import.meta.env.VITE_DEVELOPEMENT_GOOGLE_OAUTH_URL as string);
              }}
              endContent={<FcGoogle className="text-4xl" />}
            >
              Login With Google
            </Button>
          </div>
          <p className="text-center">
            You just found out Nike ?
            <Link className="mt-4 t-0" isBlock href="/register" color="primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
