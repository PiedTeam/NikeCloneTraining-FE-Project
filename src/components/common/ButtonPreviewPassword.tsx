import { EyeFilledIcon, EyeSlashFilledIcon } from "..";

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
        <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
      ) : (
        <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
      )}
    </button>
  );
};

export default ButtonPreviewPassword;
