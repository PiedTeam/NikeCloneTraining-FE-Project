import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  isAxiosError,
  isAxiosUnprocessableEntityError,
  validateEmail,
  validateOtp,
  validatePhoneNumber,
} from "@utils/utils";
import { ResponseApi } from "@utils/utils.type";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import usersService from "@services/users.service";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@stores/AuthStore";

enum VerifyMethod {
  EMAIL = "email",
  SMS = "sms",
}

interface SendOTPErrorProps {
  email?: string;
  phone_number?: string;
}

interface VerifyAccountErrorProps {
  email_phone?: string;
  verify_account_otp?: string;
}

const VerifyAccount = () => {
  const [otpIsSent, setOtpIsSent] = useState<boolean>(false);
  const [otpIsClicked, setOtpIsClicked] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string>("");
  const [isResendAvailable, setIsResendAvailable] = useState<boolean>(true);
  const [timeRemaining, setTimeRemaining] = useState<number>(30);
  const isVerify = useAuthStore((state) => state.auth);
  const token = useAuthStore((state) => state.auth?.user?.access_token);
  const [sendOTPError, setSendOTPError] = useState<string>("");
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<VerifyMethod>(
    VerifyMethod.EMAIL,
  );
  const [validateOTPError, setValidateOTPError] =
    useState<VerifyAccountErrorProps>({
      email_phone: "",
      verify_account_otp: "",
    });

  const { mutate } = useMutation({
    mutationFn: (_body: { email_phone: string; token: string }) => {
      return usersService.sendVerifyAccountOTP(_body);
    },
  });

  const receiveOTPRef = useRef<HTMLInputElement>(null);
  const OTPRef = useRef<HTMLInputElement>(null);

  const checkValidation = () => {
    if (
      (selectedMethod === VerifyMethod.EMAIL &&
        validateEmail(receiveOTPRef.current?.value || "")) ||
      (selectedMethod === VerifyMethod.SMS &&
        validatePhoneNumber(receiveOTPRef.current?.value || ""))
    ) {
      return true;
    }
    return false;
  };

  const handleSendOtp = () => {
    setOtpIsClicked(true);
    if (checkValidation()) {
      setOtpIsSent(true);
      mutate(
        {
          email_phone: receiveOTPRef.current?.value || "",
          token: token as string,
        },
        {
          onSuccess: () => {
            toast.success("OTP sent successfully");
            setSendOTPError("");
            setIsResendAvailable(false);
            const interval = setInterval(() => {
              setTimeRemaining((prev) => prev - 1);
            }, 1000);
            setTimeout(() => {
              clearInterval(interval);
              setIsResendAvailable(true);
              setTimeRemaining(30);
            }, 30 * 1000);
          },
          onError: (error) => {
            if (
              isAxiosUnprocessableEntityError<ResponseApi<SendOTPErrorProps>>(
                error,
              )
            ) {
              const formError = error.response?.data.data;
              if (formError) {
                if (formError.email) {
                  setSendOTPError(formError.email);
                } else if (formError.phone_number) {
                  setSendOTPError(formError.phone_number);
                }
              }
            } else if (isAxiosError(error) && error.response?.status === 406) {
              toast.error(
                "Send otp over 3 time, Please wait 24 hours to try again",
              );
            }
          },
        },
      );
    }
  };

  const handleVerifyOTP = async () => {
    const otp = OTPRef.current?.value;
    if (otp !== null && receiveOTPRef.current?.value !== null) {
      if (!validateOtp(OTPRef.current?.value as string)) {
        setOtpError("OTP must be 6 digits");
      } else {
        setOtpError("");
        try {
          const result = await usersService.verifyAccount({
            email_phone: receiveOTPRef.current?.value as string,
            otp: OTPRef.current?.value as string,
            token: token as string,
          });
          if (result) {
            setValidateOTPError({
              ...validateOTPError,
              email_phone: "",
              verify_account_otp: "",
            });
            toast.success("Account Verified Successfully");
            setTimeout(() => navigate("/"), 3000);
          }
        } catch (error: unknown) {
          if (
            error instanceof Error &&
            isAxiosUnprocessableEntityError<
              ResponseApi<VerifyAccountErrorProps>
            >(error)
          ) {
            setValidateOTPError(
              (error as AxiosError<ResponseApi<VerifyAccountErrorProps>>)
                .response?.data.data as VerifyAccountErrorProps,
            );
          }
        }
      }
    }
  };

  useEffect(() => {
    if (isVerify?.status === "VERIFIED") {
      toast.success("Account already verified");
      navigate("/");
    }
  }, [isVerify, navigate]);

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <div className="w-full max-w-[600px] bg-white px-4 py-10 lg:p-[60px]">
          <h1>Verify your Account</h1>
          <p className="mt-10">
            To help keep PIED_NIKE the{" "}
            <strong>most trusted design marketplace</strong>, we need to verify
            your Account.
          </p>
          <p className="mt-4">
            <strong>Verification only takes a few minutes</strong>, helps secure
            your account.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="w-8/12">
              <Input
                classNames={{
                  base: ["w-full"],
                  input: [
                    "bg-transparent",
                    "placeholder:text-default-700/50 placeholder:text-lg",
                  ],
                  inputWrapper: [
                    "w-full",
                    "h-unit-13",
                    "border",
                    "border-1",
                    "bg-white",
                  ],
                }}
                ref={receiveOTPRef}
                placeholder={
                  selectedMethod === VerifyMethod.SMS ? "Phone Number" : "Email"
                }
                isRequired
                label={
                  selectedMethod === VerifyMethod.SMS ? "Phone Number" : "Email"
                }
              />
              <p className="fixed ml-3 mt-1 text-sm text-red-500">
                {sendOTPError}
              </p>
            </div>
            <Select
              label="Verify method *"
              variant="bordered"
              classNames={{
                base: ["w-4/12"],
              }}
              value={[VerifyMethod.EMAIL]}
              onChange={(e) =>
                setSelectedMethod(e.target.value as VerifyMethod)
              }
            >
              <SelectItem key={VerifyMethod.EMAIL} value={VerifyMethod.EMAIL}>
                Email
              </SelectItem>
              <SelectItem key={VerifyMethod.SMS} value={VerifyMethod.SMS}>
                Phone Number
              </SelectItem>
            </Select>
          </div>
          <p className="fixed ml-3 text-red-500">
            {otpIsClicked && !otpIsSent ? "Invalid Input" : ""}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Input
              classNames={{
                base: ["w-8/12"],
                input: [
                  "bg-transparent",
                  "placeholder:text-default-700/50 placeholder:text-lg",
                ],
                inputWrapper: [
                  "w-full",
                  "h-unit-13",
                  "border",
                  "border-1",
                  "bg-white",
                ],
              }}
              ref={OTPRef}
              placeholder="Code *"
              isRequired
              isInvalid={!!otpError}
            />
            <Button
              color="default"
              className="h-unit-13 w-4/12 text-base"
              onClick={handleSendOtp}
              isDisabled={isResendAvailable ? false : true}
              startContent={
                !isResendAvailable && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="1em"
                    height="1em"
                    viewBox="0 0 30 30"
                    className="pointer-events-none flex-shrink-0 text-2xl text-default-400"
                  >
                    <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
                  </svg>
                )
              }
            >
              {isResendAvailable ? "Send OTP" : "Resend OTP"}
            </Button>
          </div>
          <p className="relative ml-3 mt-2 text-sm italic text-red-500">
            {otpError ||
              validateOTPError.email_phone ||
              validateOTPError.verify_account_otp}
          </p>
          {!isResendAvailable && (
            <p className="relative left-3/4 mt-2 text-sm italic">
              Resend code in {timeRemaining}
            </p>
          )}

          <Button
            className="mt-12 w-full text-lg"
            size="lg"
            color="primary"
            variant="ghost"
            onClick={handleVerifyOTP}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default VerifyAccount;
