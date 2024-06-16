import { Button } from "@nextui-org/react";

type ThirdPartyButtonProps = {
  radius?: "full" | "none";
  onClick: () => void;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  className?: string;
  content: string;
};

const ThirdPartyButton = ({
  onClick,
  className,
  endContent,
  radius = "none",
  startContent,
  content,
}: ThirdPartyButtonProps) => {
  return (
    <Button
      type="submit"
      className={className}
      radius={radius}
      startContent={startContent}
      endContent={endContent}
      onClick={onClick}
    >
      {content}
    </Button>
  );
};

export default ThirdPartyButton;
