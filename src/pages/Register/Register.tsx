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
import DocumentTitle from "@components/DocumentTitle";
import { Button, Checkbox, Input } from "@nextui-org/react";
import LogoNike from "@assets/logo/logo_nike.svg";
import EyeSlashFilledIcon from "@components/EyeSlashFilledIcon";
import EyeFilledIcon from "@components/EyeFilledIcon";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FacebookSVG from "@assets/logo/FacebookSVG";
import GoogleSVG from "@assets/logo/GoogleSVG";
import { useMutation } from "@tanstack/react-query";
import { register } from "@apis/users.api";
import { isAxiosError, isAxiosUnprocessableEntityError } from "@utils/utils";
import { ResponseApi } from "@utils/utils.type";

export interface IRegisterForm {
  first_name: string;
  last_name: string;
  email_phone: string;
  email?: string;
  phone_number?: string;
  password: string;
  agreeToTerms: boolean;
  subcribe?: boolean;
}

const schema: yup.ObjectSchema<Omit<IRegisterForm, "email" | "phone_number">> =
  yup.object().shape({
    first_name: yup
      .string()
      .required(ValidationRules.firstnameRule.required.message),
    last_name: yup
      .string()
      .required(ValidationRules.lastnameRule.required.message),
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
      ),
    password: yup
      .string()
      .required(ValidationRules.passwordRule.required.message)
      .min(
        ValidationRules.passwordRule.minLength.value,
        ValidationRules.passwordRule.minLength.message,
      )
      .matches(
        new RegExp(ValidationRules.passwordRule.pattern.value),
        ValidationRules.passwordRule.pattern.message,
      ),
    agreeToTerms: yup.boolean().required().isTrue(),
    subcribe: yup.boolean(),
  });

type FormError =
  | {
      [key in keyof Omit<IRegisterForm, "agreeToTerms">]?: string;
    }
  | null;

const Register = () => {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { mutate, error } = useMutation({
    mutationFn: (_body: Omit<IRegisterForm, "agreeToTerms">) => {
      return register(_body);
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
  } = useForm<IRegisterForm>({
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });
  const onSubmit: SubmitHandler<IRegisterForm> = (_data) => {
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
            ResponseApi<Omit<IRegisterForm, "agreeToTerms" | "subcribe">>
          >(error)
        ) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(
                key as keyof Omit<IRegisterForm, "agreeToTerms" | "subcribe">,
                {
                  message:
                    formError[
                      key as keyof Omit<
                        IRegisterForm,
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
      <DocumentTitle title="Register" />
      <div className="flex justify-center items-center h-screen">
        <div
          className={`fixed top-10 border border-black rounded py-3 px-6 font-medium text-lg bg-blue-500 ${isOpen ? "" : "hidden"}`}
        >
          <p>Register Successfully</p>
        </div>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-[minmax(0,_1030px)_minmax(0,_1fr)]">
          {width >= 1024 && (
            <div className="flex flex-col justify-center items-center lg:p-[60px]">
              <div>
                <img src={LogoNike} alt="Pied" />
              </div>
            </div>
          )}
          <div className=" flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
            <div className="max-w-[460px] w-full">
              <div className="flex flex-col gap-2.5">
                <h1 className="font-normal">Lets become a Nike Member</h1>
              </div>
              <form className="mt-3 " onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-5 mt-unit-8">
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
                    <p className="fixed text-xs text-red-500 ml-2 font-medium mt-1">
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
                    <p className="fixed text-xs text-red-500 ml-2 font-medium mt-1">
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
                  <p className="fixed text-xs text-red-500 ml-2 font-medium mt-1">
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
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                    />
                  )}
                />
                <div className="text-xs ml-2 font-medium mt-2 text-red-500">
                  <p>
                    {errors.password?.types?.required ||
                    errors.password?.types?.optionality
                      ? "Required"
                      : ""}
                  </p>
                  <p
                    className={`text-xs mt-2 ${errors.password?.types?.min || errors.password?.types?.optionality ? "" : "text-black"}`}
                  >
                    Minumum of 8 characters
                  </p>
                  <p
                    className={`text-xs mt-2 ${errors.password?.types?.matches || errors.password?.types?.optionality ? "" : "text-black"}`}
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
                  <div className="mt-2 text-red-500 text-sm font-medium">
                    {errorForm.email}
                  </div>
                )}

                <Button
                  type="submit"
                  className="block mt-6 h-unit-13 bg-black text-white justify-end font-bold px-8 text-lg w-full"
                  radius="full"
                  // isLoading={true}
                >
                  Create Account
                </Button>
              </form>
              <div className="mt-6 flex items-center justify-between">
                <div className="border border-slate-400 w-5/12"></div>
                <div>
                  <p className="block text-center text-2xl">OR</p>
                </div>
                <div className="border border-slate-400 w-5/12"></div>
              </div>

              <div className="mt-4 text-center flex items-center justify-between">
                <Button
                  type="submit"
                  className="h-unit-13 w-50 font-medium text-small"
                  radius="full"
                  startContent={<FacebookSVG />}
                  onClick={() => {
                    window.location.href =
                      import.meta.env.VITE_FACEBOOK_OAUTH_URL;
                  }}
                >
                  Register with Facebook
                </Button>
                <Button
                  type="submit"
                  className="h-unit-13 w-50 font-medium px-5 text-small"
                  radius="full"
                  startContent={<GoogleSVG />}
                  onClick={() => {
                    window.location.href =
                      import.meta.env.VITE_GOOGLE_OAUTH_URL;
                  }}
                >
                  Register with Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
