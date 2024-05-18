import { compareOtp, getOtp } from "@apis/users.api";
import { runApi } from "@hooks/useApi";
import { Button, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export interface sendOtp {
  email_phone: string;
}
export interface compareOtpApi {
  email_phone: string;
  forgot_password_otp: string;
}
const CompareOtpPage = () => {
  const [accessToken, setAccessToken] = useState("");
  const [isResendAvailable, setIsResendAvailable] = useState<boolean>(true);
  const location = useLocation();
  const [timeRemaining, setTimeRemaining] = useState<number>(30);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  useEffect(() => {
    const userObject = localStorage.getItem("user");
    const access_token = JSON.parse(userObject!).access_token;
    setAccessToken(access_token);
  }, []);

  const sendOtp = async () => {
    try {
      const data = await runApi<sendOtp>(getOtp, accessToken, { email_phone: location.state.email_phone }, "POST");
      if (data) {
        toast.success("Otp is being sent");
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
      toast.error("Error occurred while sending OTP. Please try again later.");
      console.error("Error occurred while sending OTP:", error);
    }
  };

  const handleCompareOtp = async () => {
    const dataIs = {
      email_phone: location.state.email_phone,
      forgot_password_otp: otp,
    };
    console.log(dataIs);

    const { message, error } = await runApi<compareOtpApi>(
      compareOtp,
      accessToken,
      {
        email_phone: location.state.email_phone,
        forgot_password_otp: otp.toString(),
      },
      "POST",
    );
    if (typeof error === "object" && error !== null && "response" in error) {
      toast.error(error.response.data.data.forgot_password_otp);
    } else {
      toast.success(message as string);
      setTimeout(() => navigate("/password"), 3000);
    }
  };

  return (
    <div className="flex justify-center  h-full  ">
      <div className="flex flex-col mt-24  items-center w-1/2 h-3/4 max-[900px]:text-[14 px]  p-12 transform -translate-y-5 shadow-2xl ">
        <h1 className="mb-4">Confirm Your Otp</h1>
        <p className="my-4">
          <strong>Verification only takes a few minutes</strong>, helps secure your account.
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
        <div className=" flex my-8 justify-around  ">
          <Link className=" t-0 text-center mr-8" isBlock showAnchorIcon color="primary" onClick={() => navigate(-1)}>
            Back
          </Link>

          <Button
            color="default"
            className="w-6/12 h-unit-13 text-base"
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
                  className="text-2xl text-default-400 pointer-events-none flex-shrink-0 "
                >
                  <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
                </svg>
              )
            }
          >
            {isResendAvailable ? "Send OTP" : "Resend OTP"}
          </Button>
        </div>
        {!isResendAvailable && <p className="text-sm mx-2 ">Resend code in {timeRemaining}s</p>}
        <Button
          radius="full"
          size="lg"
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mt-4"
          onClick={handleCompareOtp}
        >
          Verify OTP
        </Button>
      </div>
    </div>
  );
};

export default CompareOtpPage;
