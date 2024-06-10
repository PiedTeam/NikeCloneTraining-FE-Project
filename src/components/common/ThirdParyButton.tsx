import { Button } from "@nextui-org/react";

type ThirdParyButtonProps = {
  radius?: "full" | "none";
  onClick: () => void;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  className?: string;
  content: string;
};

const ThirdParyButton = ({
  onClick,
  className,
  endContent,
  radius = "none",
  startContent,
  content,
}: ThirdParyButtonProps) => {
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

export default ThirdParyButton;
