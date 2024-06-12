import AdvertiseBar from "@components/AdvertiseBar";
import Header from "../layout/Header";
import Navbar from "@components/Navbar";
import { featureArray } from "../db/header";
import useDocumentTitle from "@hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const nav = useNavigate();
  useDocumentTitle({ title: "Homepage" });
  return (
    <div className="">
      {/* tý thêm px-2 vô */}
      <Header featureArray={featureArray} />
      <Navbar />
      <AdvertiseBar />

      <div>
        <button onClick={() => nav("/verify-account")}>VerifyAccount</button>
        <button onClick={() => nav("/password")}>Password</button>
        <button onClick={() => nav("/otp")}>OTP</button>
        <button onClick={() => nav("/change-password")}>CHangePassword</button>
      </div>
    </div>
  );
};

export default Homepage;
