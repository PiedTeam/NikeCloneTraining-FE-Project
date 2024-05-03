import { useQueryString } from "@utils/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "types/user.types";

const OAuth = () => {
  const navigate = useNavigate();
  const user_infor = useQueryString();

  useEffect(() => {
    const user: UserInfo = {
      access_token: user_infor.access_token,
      exp: user_infor.exp,
      iat: user_infor.iat,
      new_user: Boolean(user_infor.new_user),
    };
    console.log(user_infor);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  }, []);

  return <div>OAuth</div>;
};

export default OAuth;
