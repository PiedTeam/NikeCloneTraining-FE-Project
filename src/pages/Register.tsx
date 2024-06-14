// utils
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// styles

// contexts

// constants
import ValidationRules from "@constants/validationRules.json";
// hooks
import useWindowSize from "@hooks/useWindowSize";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
//components
import { Button, Checkbox, Input } from "@nextui-org/react";
import LogoNike from "../../public/assets/logo/logo_nike.svg";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { RegisterForm } from "@services/users.api";
import { isAxiosError, isAxiosUnprocessableEntityError } from "@utils/utils";
import { ResponseApi } from "@utils/utils.type";
import useDocumentTitle from "@hooks/useDocumentTitle";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  ThirdParyButton,
} from "@components/index";
import usersService from "@services/users.service";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import DOMPurify from "dompurify";

const schema: yup.ObjectSchema<Omit<RegisterForm, "email" | "phone_number">> =
  yup.object().shape({
    first_name: yup
      .string()
      .required(ValidationRules.firstnameRule.required.message)
      .matches(/^[^']*$/, "First Name cannot contain then sensitive character"),
    last_name: yup
      .string()
      .required(ValidationRules.lastnameRule.required.message)
      .matches(/^[^']*$/, "Last Name cannot contain then sensitive character"),
    email_phone: yup
      .string()
      .required("This field is required")
      .test(
        "is-email-or-phone",
        "Must be a valid email or phone number",
        (value) => {
          const isEmail = new RegExp(
            ValidationRules.emailRule.isEmail.value,
          ).test(value);
          const isPhone = new RegExp(
            ValidationRules.phonenumberRule.pattern.value,
            "g",
          ).test(value);
          return isEmail || isPhone;
        },
      )
      .matches(
        /^[^']*$/,
        "Email or Phone cannot contain then sensitive character",
      ),
    password: yup
      .string()
      .required(ValidationRules.passwordRule.required.message)
      .min(
        ValidationRules.passwordRule.minLength.value,
        ValidationRules.passwordRule.minLength.message,
      )
      .matches(/^[^']*$/, "Password cannot contain then sensitive character")
      .matches(
        new RegExp(ValidationRules.passwordRule.pattern.value),
        ValidationRules.passwordRule.pattern.message,
      ),
    agreeToTerms: yup.boolean().required().isTrue(),
    subcribe: yup.boolean(),
  });

type FormError =
  | {
      [key in keyof Omit<RegisterForm, "agreeToTerms">]?: string;
    }
  | null;

const Register = () => {
  useDocumentTitle({ title: "Register" });
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { mutate, error } = useMutation({
    mutationFn: (_body: Omit<RegisterForm, "agreeToTerms">) => {
      const registerData: Omit<RegisterForm, "agreeToTerms"> = {
        first_name: DOMPurify.sanitize(_body.first_name),
        last_name: DOMPurify.sanitize(_body.last_name),
        email_phone: DOMPurify.sanitize(_body.email_phone),
        password: DOMPurify.sanitize(_body.password),
        subcribe: _body.subcribe,
      };

      return usersService.register(registerData);
    },
  });

  const errorForm: FormError = useMemo(() => {
    if (
      isAxiosError<{ error: FormError }>(error) &&
      error.response?.status === 422
    ) {
      return error.response?.data.error;
    }
    return null;
  }, [error]);

  const {
    // register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });
  const onSubmit: SubmitHandler<RegisterForm> = (_data) => {
    mutate(_data, {
      onSuccess: () => {
        // alert("Register successfully");

        setIsOpen(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      },
      onError: (error) => {
        if (
          isAxiosUnprocessableEntityError<
            ResponseApi<Omit<RegisterForm, "agreeToTerms" | "subcribe">>
          >(error)
        ) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(
                key as keyof Omit<RegisterForm, "agreeToTerms" | "subcribe">,
                {
                  message:
                    formError[
                      key as keyof Omit<
                        RegisterForm,
                        "agreeToTerms" | "subcribe"
                      >
                    ],
                  type: "Server",
                },
              );
            });
          }
        }
      },
    });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div
          className={`fixed top-10 rounded border border-black bg-blue-500 px-6 py-3 text-lg font-medium ${isOpen ? "" : "hidden"}`}
        >
          <p>Register Successfully</p>
        </div>
        <div className="4xl:grid-cols-[minmax(0,_1030px)_minmax(0,_1fr)] grid flex-1 grid-cols-1 lg:grid-cols-2">
          {width >= 1024 && (
            <div className="flex flex-col items-center justify-center lg:p-[60px]">
              <div>
                <img src={LogoNike} alt="Pied" />
              </div>
            </div>
          )}
          <div className=" flex w-full items-center justify-center px-4 py-10 lg:p-[60px]">
            <div className="w-full max-w-[460px]">
              <div className="flex flex-col gap-2.5">
                <h1 className="font-normal">Lets become a Nike Member</h1>
              </div>
              <form className="mt-3 " onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-unit-8 grid grid-cols-2 gap-5">
                  <div className="col-span-1">
                    <Controller
                      name="first_name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          // className="mt-3 w-full h-unit-20 border border-black "
                          classNames={{
                            input: [
                              "bg-transparent",
                              "placeholder:text-default-700/50 placeholder:text-lg",
                            ],
                            innerWrapper: ["bg-transparent"],
                            inputWrapper: [
                              "w-full",
                              "h-unit-13",
                              "border",
                              "border-1",
                              errors.first_name
                                ? "border-red-600"
                                : "border-black",
                              "bg-white",
                            ],
                          }}
                          placeholder="First Name*"
                          type="text"
                          radius="sm"
                        />
                      )}
                    />
                    <p className="fixed ml-2 mt-1 text-xs font-medium text-red-500">
                      {errors.first_name?.message}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <Controller
                      name="last_name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          classNames={{
                            input: [
                              "bg-transparent",
                              "placeholder:text-default-700/50 placeholder:text-lg",
                            ],
                            innerWrapper: ["bg-transparent"],
                            inputWrapper: [
                              "w-full",
                              "h-unit-13",
                              "border",
                              errors.last_name
                                ? "border-red-600"
                                : "border-black",
                              "bg-white",
                            ],
                          }}
                          radius="sm"
                          placeholder="Last Name *"
                          type="text"
                        />
                      )}
                    />
                    <p className="fixed ml-2 mt-1 text-xs font-medium text-red-500">
                      {errors.last_name?.message}
                    </p>
                  </div>
                </div>

                <div className="mt-unit-8">
                  <Controller
                    name="email_phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        classNames={{
                          input: [
                            "bg-transparent",
                            "placeholder:text-default-700/50 placeholder:text-lg",
                          ],
                          innerWrapper: ["bg-transparent"],
                          inputWrapper: [
                            "w-full",
                            "h-unit-13",
                            "border",
                            errors.email_phone
                              ? "border-red-600"
                              : "border-black",
                            "bg-white",
                          ],
                        }}
                        radius="sm"
                        placeholder="Email or Phone number *"
                        type="text"
                      />
                    )}
                  />
                  <p className="fixed ml-2 mt-1 text-xs font-medium text-red-500">
                    {errors.email_phone?.message ||
                      errors.email?.message ||
                      errors.phone_number?.message}
                  </p>
                </div>

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      classNames={{
                        input: [
                          "bg-transparent",
                          "placeholder:text-default-700/50 placeholder:text-lg",
                        ],
                        innerWrapper: ["bg-transparent"],
                        inputWrapper: [
                          "mt-unit-8",
                          "w-full",
                          "h-unit-13",
                          "border",
                          errors.password ? "border-red-600" : "border-black",
                          "bg-white",
                        ],
                      }}
                      isClearable
                      radius="sm"
                      placeholder="Password *"
                      endContent={
                        <button
                          className="focus:outline-none"
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
                    />
                  )}
                />
                <div className="ml-2 mt-2 text-xs font-medium text-red-500">
                  <p>
                    {errors.password?.types?.required ||
                    errors.password?.types?.optionality
                      ? "Required"
                      : ""}
                  </p>
                  <p
                    className={`mt-2 text-xs ${errors.password?.types?.min || errors.password?.types?.optionality ? "" : "text-black"}`}
                  >
                    Minumum of 8 characters
                  </p>
                  <p
                    className={`mt-2 text-xs ${errors.password?.types?.matches || errors.password?.types?.optionality ? "" : "text-black"}`}
                  >
                    Uppercase, lowercase letters, one number and special
                    characters
                  </p>
                </div>
                <Controller
                  name="subcribe"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      color="default"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      classNames={{
                        base: ["mt-2"],
                        label: ["text-md"],
                      }}
                    >
                      Sign up for emails to get updates from Nike on products,
                      offers and your Member benefits
                    </Checkbox>
                  )}
                />

                <Controller
                  name="agreeToTerms"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      color="default"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      classNames={{
                        base: ["mt-1"],
                        label: [
                          "text-md",
                          errors.agreeToTerms ? "text-red-500" : "text-black",
                        ],
                      }}
                    >
                      I agree to Nike{" "}
                      <a
                        href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=privacyPolicy&country=VN&language=en&requestType=redirect&uxId=4fd2d5e7db76e0f85a6bb56721bd51df"
                        className="font-bold underline decoration-solid"
                      >
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=termsOfUse&country=VN&language=en&requestType=redirect&uxId=4fd2d5e7db76e0f85a6bb56721bd51df"
                        className="font-bold underline decoration-solid"
                      >
                        Terms of Use
                      </a>
                    </Checkbox>
                  )}
                />

                {errorForm && (
                  <div className="mt-2 text-sm font-medium text-red-500">
                    {errorForm.email}
                  </div>
                )}

                <Button
                  type="submit"
                  className="h-unit-13 mt-6 block w-full justify-end bg-black px-8 text-lg font-bold text-white"
                  radius="full"
                  // isLoading={true}
                >
                  Create Account
                </Button>
              </form>
              <div className="mt-6 flex items-center justify-between">
                <div className="w-5/12 border border-slate-400"></div>
                <div>
                  <p className="block text-center text-2xl">OR</p>
                </div>
                <div className="w-5/12 border border-slate-400"></div>
              </div>

              <div className="mt-4 flex items-center justify-between text-center">
                <ThirdParyButton
                  radius="full"
                  onClick={() => {
                    window.location.href =
                      import.meta.env.VITE_FACEBOOK_OAUTH_URL;
                  }}
                  startContent={
                    <FaFacebook className="text-5xl text-blue-800 " />
                  }
                  content="Register with Facebook"
                  className="w-50 h-unit-13 text-small font-medium"
                />
                <ThirdParyButton
                  radius="full"
                  onClick={() => {
                    window.location.href =
                      import.meta.env.VITE_GOOGLE_OAUTH_URL;
                  }}
                  startContent={<FcGoogle className="text-3xl" />}
                  content="Register with Google"
                  className="w-50 h-unit-13 px-5 text-small font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
