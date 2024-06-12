import { EyeFilledIcon, EyeSlashFilledIcon } from "..";

type ButtonPreviewPasswordProps = {
  isVisible: boolean;
  toggleVisibility: () => void;
};

const ButtonPreviewPassword = ({ isVisible, toggleVisibility }: ButtonPreviewPasswordProps) => {
  return (
    <button className="focus:outline-none mb4" type="button" onClick={toggleVisibility}>
      {isVisible ? (
        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
      ) : (
        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
      )}
    </button>
  );
};

export default ButtonPreviewPassword;
