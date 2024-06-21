import { FaEye, FaEyeSlash } from "react-icons/fa";

type ButtonPreviewPasswordProps = {
  isVisible: boolean;
  toggleVisibility: () => void;
};

const ButtonPreviewPassword = ({
  isVisible,
  toggleVisibility,
}: ButtonPreviewPasswordProps) => {
  return (
    <button
      className="mb4 focus:outline-none"
      type="button"
      onClick={toggleVisibility}
    >
      {isVisible ? (
        <FaEye className="pointer-events-none text-2xl text-default-400" />
      ) : (
        <FaEyeSlash className="pointer-events-none text-2xl text-default-400" />
      )}
    </button>
  );
};

export default ButtonPreviewPassword;
