import AdvertiseBar from "@components/AdvertiseBar";
import Header from "../layout/Header";
import Navbar from "@components/Navbar";
import { featureArray } from "../db/header";
import useDocumentTitle from "@hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";
import { useToast } from "@providers/ToastProvider";

const Homepage = () => {
  const nav = useNavigate();
  const { toast } = useToast();
  useDocumentTitle({ title: "Homepage" });
  return (
    <div>
      <Header featureArray={featureArray} />
      <Navbar />
      <AdvertiseBar />

      <div className="flex justify-between ">
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
        <button
          className="rounded border-2 border-black px-2"
          onClick={() =>
            toast.success({ message: "Login Successfully", timeout: 5000 })
          }
        >
          Success
        </button>
        <button
          className="rounded border-2 border-black px-2"
          onClick={() =>
            toast.danger({
              message: "Your Login Crediential is Incorrect",
              timeout: 3000,
            })
          }
        >
          Danger
        </button>
        <button
          className="rounded border-2 border-black px-2"
          onClick={() =>
            toast.warning({
              message: "Check Your Login Crediential Again",
              timeout: 1000,
            })
          }
        >
          Warning
        </button>
      </div>
    </div>
  );
};
export default Homepage;
