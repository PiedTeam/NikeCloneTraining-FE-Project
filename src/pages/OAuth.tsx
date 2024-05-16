import { useQueryString } from "@utils/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "types/user.types";

const OAuth = () => {
  const navigate = useNavigate();
  const user_infor = useQueryString();
  const [newUser, setNewUser] = useState(false);
  const navigateFunc = () => {
    if (newUser) {
      navigate("/password");
    }
  };
  useEffect(() => {
    const user: UserInfo = {
      access_token: user_infor.access_token,
      exp: user_infor.exp,
      iat: user_infor.iat,
      new_user: Boolean(user_infor.new_user),
    };
    localStorage.setItem("user", JSON.stringify(user));

    setNewUser(user_infor.new_user ? true : false);
    navigateFunc();
  }, [user_infor]);

  return <div>OAuth</div>;
};

export default OAuth;
