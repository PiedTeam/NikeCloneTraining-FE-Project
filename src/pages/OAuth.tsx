import { useQueryString } from "@utils/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@stores/AuthStore";
import { UserInfo } from "types/user.types";

const OAuth = () => {
  const navigate = useNavigate();
  const user_infor = useQueryString();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [newUser, setNewUser] = useState<boolean | null>(null);

  function stringToBool(stringValue: string) {
    return stringValue.toLowerCase() === "true";
  }

  useEffect(() => {
    if (user_infor.new_user !== undefined) {
      const user: UserInfo = {
        access_token: user_infor.access_token,
        exp: user_infor.exp,
        iat: user_infor.iat,
        new_user: stringToBool(user_infor.new_user),
      };

      setNewUser(user.new_user);
      setAuth({
        isAuthenticated: true,
        isInitialized: true,
        user: user,
        status: "VERIFIED",
      });
    }
  }, [user_infor, setAuth]);

  useEffect(() => {
    if (newUser !== null) {
      if (newUser) {
        navigate("/password", { state: { from: "/oauth" } });
      } else {
        navigate("/");
      }
    }
  }, [newUser, navigate]);

  return <div>OAuth</div>;
};

export default OAuth;
