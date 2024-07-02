import { Button, Link } from "@nextui-org/react";
import { useToast } from "@providers/ToastProvider";
import usersService from "@services/users.service";
import { isAxiosError } from "@utils/utils";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";

const CompareOtpPage = () => {
  const [isResendAvailable, setIsResendAvailable] = useState<boolean>(true);
  const location = useLocation();
  const [timeRemaining, setTimeRemaining] = useState<number>(30);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [otp, setOtp] = useState("");
  useEffect(() => {}, []);

  const sendOtp = async () => {
    try {
      const data = await usersService.recovery(location.state.email_phone);
      if (data) {
        toast.success({ message: "Otp is being sent" });
      }
      setIsResendAvailable(false);
      let remainingTime = 30;
      const interval = setInterval(() => {
        setTimeRemaining(--remainingTime);
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        setIsResendAvailable(true);
        setTimeRemaining(30);
      }, 30000);
    } catch (error) {
      toast.danger({
        message: "Error occurred while sending OTP. Please try again later.",
      });
    }
  };

  const handleCompareOtp = async () => {
    try {
      const response = await usersService.compareOtp({
        _data: {
          email_phone: location.state.email_phone,
          otp: otp,
        },
      });
      if (response.status === 200) {
        toast.success({ message: "Otp verified successfully" });
        setTimeout(
          () =>
            navigate("/password", {
              state: {
                from: location.pathname,
                email_phone: location.state.email_phone,
                otp: otp,
              },
            }),
          3000,
        );
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.danger({
          message:
            "Error occurred while verifying OTP. Please try again later.",
        });
      }
    }
  };

  return (
    <div className="flex h-full  justify-center  ">
      <div className="max-[900px]:text-[14 px] mt-24  flex h-3/4 w-1/2 -translate-y-5 transform  flex-col items-center p-12 shadow-2xl ">
        <h1 className="mb-4">Confirm Your Otp</h1>
        <p className="my-4">
          <strong>Verification only takes a few minutes</strong>, helps secure
          your account.
        </p>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="w-4"></span>}
          inputType="tel"
          renderInput={(props) => <input {...props} />}
          inputStyle="!w-[50px] !h-[50px] rounded-lg border-2 border-rose-500 "
        />
        <div className=" my-8 flex justify-around  ">
          <Link
            className=" t-0 mr-8 text-center"
            isBlock
            showAnchorIcon
            color="primary"
            onClick={() => navigate(-1)}
          >
            Back
          </Link>

          <Button
            color="default"
            className="h-unit-13 w-6/12 text-base"
            onClick={sendOtp}
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
                  className="pointer-events-none flex-shrink-0 text-2xl text-default-400 "
                >
                  <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
                </svg>
              )
            }
          >
            {isResendAvailable ? "Send OTP" : "Resend OTP"}
          </Button>
        </div>
        {!isResendAvailable && (
          <p className="mx-2 text-sm ">Resend code in {timeRemaining}s</p>
        )}
        <Button
          radius="full"
          size="lg"
          className="mt-4 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          onClick={handleCompareOtp}
        >
          Verify OTP
        </Button>
      </div>
    </div>
  );
};

export default CompareOtpPage;
