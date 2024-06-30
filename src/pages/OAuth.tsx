import { useAuth } from "@provider/AuthProvider";
import { useQueryString } from "@utils/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const navigate = useNavigate();
  const user_infor = useQueryString();
  const { setToken } = useAuth();
  const [newUser, setNewUser] = useState<boolean | null>(null);

  function stringToBool(stringValue: string) {
    return stringValue.toLowerCase() === "true";
  }

  useEffect(() => {
    if (user_infor.new_user !== undefined) {
      // const user: UserInfo = {
      //   access_token: user_infor.access_token,
      //   exp: user_infor.exp,
      //   iat: user_infor.iat,
      //   new_user: stringToBool(user_infor.new_user),
      // };
      setToken(user_infor.access_token);
      setNewUser(stringToBool(user_infor.new_user));
    }
  }, [user_infor, setToken]);

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
