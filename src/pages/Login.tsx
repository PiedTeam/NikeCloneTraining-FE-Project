//utils
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { isAxiosUnprocessableEntityError } from "@utils/utils.ts";

// assets
import Jordan from "../../public/assets/images/Jordan.jpg";

// hooks
import useDocumentTitle from "@hooks/useDocumentTitle.ts";
import { useForm, SubmitHandler, FieldValues, Path } from "react-hook-form";
import { MouseEventHandler, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// apis
import { LoginFormData } from "@services/users.api";
import { ResponseApi } from "@utils/utils.type.ts";

// components
import {
  ButtonPreviewPassword,
  InputControl,
  BrandLogo,
  ThirdParyButton,
} from "@components/index";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import usersService from "@services/users.service";

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
      return usersService.login(body);
    },
  });

  const handleLogin: SubmitHandler<LoginFormData> = (data) => {
    console.log("data", data);
    mutate(data, {
      onSuccess: (response) => {
        toast.success("Login successfully");
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setTimeout(() => {
          navigate("/");
        }, 2000);
      },
      onError: (error) => {
        if (
          isAxiosUnprocessableEntityError<ResponseApi<LoginFormData>>(error)
        ) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof LoginFormData, {
                message: formError[key as keyof LoginFormData],
                type: "Server",
              });
              toast.error("Login failed");
            });
          }
        }
      },
    });
  };

  const handleLoginButtonClick: MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();
    console.log(errors);
    handleSubmit(handleLogin)();
  };

  return (
    <>
      <div className="flex h-full justify-center">
        <div className="max-[900px]:text-[14 px] mt-24  flex h-3/4 w-1/2 -translate-y-5 transform  flex-col items-center p-12 shadow-2xl ">
          <h1>WELCOME BACK</h1>
          <BrandLogo image_url={Jordan} showNikeLogo />
          <InputControl<LoginFormData>
            isRequired
            isError={
              !!errors.email_phone || !!errors.email || !!errors.phone_number
            }
            register={register}
            className="mb-4 max-w-xs"
            errorMessage={
              errors.email_phone?.message ||
              errors.email?.message ||
              errors.phone_number?.message
            }
            {...EmailPhoneSchema}
          />

          <InputControl<LoginFormData>
            register={register}
            isRequired
            isError={!!errors.password}
            errorMessage={errors.password?.message}
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
            href="#"
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
            <ThirdParyButton
              className="mr-4 w-2/4 border-4  max-[900px]:w-32  max-[900px]:text-[0] max-[600px]:w-16"
              onClick={() => {
                window.location.href = import.meta.env.VITE_FACEBOOK_OAUTH_URL;
              }}
              endContent={<FaFacebook className="text-5xl text-blue-800 " />}
              content="Login With Facebook"
            />
            <ThirdParyButton
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
