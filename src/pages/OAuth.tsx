import { useQueryString } from "@utils/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "types/user.types";

const OAuth = () => {
  const navigate = useNavigate();
  const user_infor = useQueryString();
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
      localStorage.setItem("user", JSON.stringify(user));
      console.log("User Info:", user_infor);
      console.log("Converted new_user:", user.new_user);

      setNewUser(user.new_user);
    }
  }, [user_infor]);

  useEffect(() => {
    if (newUser !== null) {
      console.log("New User State:", newUser);
      if (newUser) {
        navigate("/password");
      } else {
        navigate("/");
      }
    }
  }, [newUser, navigate]);

  return <div>OAuth</div>;
};

export default OAuth;
