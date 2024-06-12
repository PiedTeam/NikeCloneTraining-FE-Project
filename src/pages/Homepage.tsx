import useDocumentTitle from "@hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const nav = useNavigate();
  useDocumentTitle({ title: "Homepage" });
  return (
    <div>
      <button onClick={() => nav("/verify-account")}>VerifyAccount</button>
      <button onClick={() => nav("/password")}>Password</button>
      <button onClick={() => nav("/otp")}>OTP</button>
      <button onClick={() => nav("/change-password")}>CHangePassword</button>
    </div>
  );
};

export default Homepage;
