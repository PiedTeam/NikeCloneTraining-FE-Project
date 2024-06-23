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
    <div>
      <Header featureArray={featureArray} />
      <Navbar />
      <AdvertiseBar />

      <div className="flex justify-between">
        <button
          className="rounded border-2 border-black px-2"
          onClick={() => nav("/verify-account")}
        >
          VerifyAccount
        </button>
        <button
          className="rounded border-2 border-black px-2"
          onClick={() => nav("/password")}
        >
          Password
        </button>
        <button
          className="rounded border-2 border-black px-2"
          onClick={() => nav("/otp")}
        >
          OTP
        </button>
        <button
          className="rounded border-2 border-black px-2"
          onClick={() => nav("/change-password")}
        >
          CHangePassword
        </button>
        <button
          className="rounded border-2 border-black px-2"
          onClick={() => nav("/login")}
        >
          Login
        </button>
        <button
          className="rounded border-2 border-black px-2"
          onClick={() => nav("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};
export default Homepage;
