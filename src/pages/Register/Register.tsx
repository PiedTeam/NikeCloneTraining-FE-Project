// utils

// styles

// contexts

// hooks

//components
import DocumentTitle from "@components/DocumentTitle";
import { Button, Checkbox, Input } from "@nextui-org/react";
import LogoNike from "@assets/logo/logo_nike.svg";

// import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ValidationRules from "@constants/validationRules.json";
import useWindowSize from "@hooks/useWindowSize";
import { useState } from "react";
import EyeSlashFilledIcon from "@components/EyeSlashFilledIcon";
import EyeFilledIcon from "@components/EyeFilledIcon";

enum VerifyMethod {
  EMAIL = "email",
  SMS = "sms",
}

interface IRegisterForm {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  phonenumber: string;
  verifyMethod: VerifyMethod;
  agreeToTerms: boolean;
  subcribe: boolean;
}

const schema: yup.ObjectSchema<IRegisterForm> = yup
  .object({
    firstname: yup
      .string()
      .required(ValidationRules.firstnameRule.required.message),
    lastname: yup
      .string()
      .required(ValidationRules.lastnameRule.required.message),
    username: yup
      .string()
      .required(ValidationRules.usernameRule.required.message),
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
    email: yup
      .string()
      .email(ValidationRules.emailRule.isEmail.message)
      .required(ValidationRules.emailRule.required.message),
    phonenumber: yup
      .string()
      .required(ValidationRules.phonenumberRule.required.message)
      .matches(
        new RegExp(ValidationRules.phonenumberRule.pattern.value),
        ValidationRules.phonenumberRule.pattern.message,
      ),
    verifyMethod: yup.string().oneOf(Object.values(VerifyMethod)).required(),
    agreeToTerms: yup.boolean().required(),
    subcribe: yup.boolean().required(),
  })
  .required();

const Register = () => {
  // const navigate = useNavigate()
  const { width } = useWindowSize();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    // register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<IRegisterForm> = (data) => console.log(data);

  return (
    <>
      <DocumentTitle title="Register" />
      <div className="flex justify-center items-center h-screen">
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
                      name="firstname"
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
                              errors.firstname
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
                      {errors.firstname?.message}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <Controller
                      name="lastname"
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
                              errors.lastname
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
                      {errors.lastname?.message}
                    </p>
                  </div>
                </div>

                <div className="mt-unit-8">
                  <Controller
                    name="username"
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
                            errors.username ? "border-red-600" : "border-black",
                            "bg-white",
                          ],
                        }}
                        radius="sm"
                        placeholder="User Name *"
                        type="text"
                      />
                    )}
                  />
                  <p className="fixed text-xs text-red-500 ml-2 font-medium mt-1">
                    {errors.username?.message}
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
                      // variant="bordered"
                    />
                  )}
                />
                <p className="fixed text-xs text-red-500 ml-2 font-medium mt-1">
                  {errors.password?.message}
                </p>

                {/* <Controller
                name="email"
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
                        errors.email ? "border-red-600" : "border-black",
                        "bg-white",
                      ],
                    }}
                    radius="sm"
                    placeholder="Email *"
                    type="text"
                  />
                )}
              />
              <p className="fixed text-xs text-red-500 ml-2 font-medium mt-1">
                {errors.email?.message}
              </p>

              <Controller
                name="phonenumber"
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
                        errors.phonenumber ? "border-red-600" : "border-black",
                        "bg-white",
                      ],
                    }}
                    radius="sm"
                    type="text"
                    placeholder="Phone Number *"
                  />
                )}
              />
              <p className="fixed text-xs text-red-500 ml-2 font-medium mt-1">
                {errors.phonenumber?.message}
              </p> */}
                <Controller
                  name="subcribe"
                  control={control}
                  render={() => (
                    <Checkbox
                      color="default"
                      classNames={{
                        base: ["mt-8"],
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
                        base: ["mt-3"],
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

                <Button
                  type="submit"
                  className="block mt-12 h-unit-13 bg-black text-white justify-end font-bold px-8 text-lg left-[60%]"
                  radius="full"
                  // isLoading={true}
                >
                  Create Account
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
