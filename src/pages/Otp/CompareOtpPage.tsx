import { Button, Link } from "@nextui-org/react";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

const CompareOtpPage: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  return (
    <div className="flex justify-center  h-full  ">
      <div className="flex flex-col mt-24  items-center w-1/2 h-3/4 max-[900px]:text-[14 px]  p-12 transform -translate-y-5 shadow-2xl ">
        <h1 className="mb-4">Confirm Your Otp</h1>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="w-4"></span>}
          renderInput={(props) => <input {...props} />}
          inputStyle="!w-[50px] !h-[50px] rounded-lg border-2 border-rose-500 "
        />
        <div className=" flex my-8 justify-around  ">
          <Link
            className=" t-0 text-center mr-8"
            isBlock
            showAnchorIcon
            color="primary"
            onClick={() => navigate(-1)}
          >
            Back
          </Link>
          <Button color="primary" size="sm" className="ml-8">
            Send otp again
          </Button>
        </div>
        <Button
          radius="full"
          size="lg"
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        >
          Send Otp
        </Button>
      </div>
    </div>
  );
};

export default CompareOtpPage;
