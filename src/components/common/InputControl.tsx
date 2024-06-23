import { InputProps, Input } from "@nextui-org/react";
import { Path, UseFormRegister, FieldValues } from "react-hook-form";

interface InputControlProps<T extends FieldValues> extends InputProps {
  name: Path<T>;
  register: UseFormRegister<T>;
  isError: boolean;
  errorMessage?: string;
}
const InputControl = <T extends FieldValues>({
  register,
  isError,
  name,
  errorMessage,
  ...rest
}: InputControlProps<T>) => {
  return (
    <Input
      {...register(name)}
      isInvalid={isError ? true : undefined}
      color={isError ? "danger" : "default"}
      errorMessage={errorMessage}
      variant="bordered"
      {...rest}
    />
  );
};

export default InputControl;
