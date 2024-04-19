import EyeFilledIcon from "@components/icons/EyeFilledIcon";
import EyeSlashFilledIcon from "@components/icons/EyeSlashFilledIcon";
import { Button } from "@nextui-org/react";

const ButtonPreviewPassword = ({
  isVisible,
  toggleVisibility,
}: {
  isVisible: boolean;
  toggleVisibility: () => void;
}) => {
  return (
    <Button isIconOnly variant="light" onClick={toggleVisibility}>
      {isVisible ? (
        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
      ) : (
        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
      )}
    </Button>
  );
};

export default ButtonPreviewPassword;
