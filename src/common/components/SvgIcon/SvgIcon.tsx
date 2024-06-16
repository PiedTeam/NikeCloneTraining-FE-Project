import NikeSvgPath from "@public/assets/svg/logo-nike.svg";
import FbSvgPath from "@public/assets/svg/logo-fb.svg";
import JordanSvgPath from "@public/assets/svg/nike-jordan.svg";
import NikeSignupSvgPath from "@public/assets/svg/logo-nike-siginup.svg";
import { useMemo } from "react";

interface SvgIconProps extends React.HTMLProps<HTMLImageElement> {
  icon: "nike" | "facebook" | "jordan" | "nike-signup";
}

const SvgIcon = ({ icon, ...rest }: SvgIconProps) => {
  const SvgIconComponent = useMemo(() => {
    switch (icon) {
      case "nike":
        return <img src={NikeSvgPath} alt="Nike SVG" {...rest} />;
      case "facebook":
        return <img src={FbSvgPath} alt="Facebook SVG" {...rest} />;
      case "jordan":
        return <img src={JordanSvgPath} alt="Jordan SVG" {...rest} />;
      case "nike-signup":
        return <img src={NikeSignupSvgPath} alt="Nike Signup SVG" {...rest} />;
      default:
        return <></>;
    }
  }, [icon, rest]);

  return SvgIconComponent;
};

export default SvgIcon;
