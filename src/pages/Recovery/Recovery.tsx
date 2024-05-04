import React, { ChangeEvent, MouseEventHandler } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Select, SelectItem, Button } from "@nextui-org/react"; // Import Select and SelectItem
import { recovery } from "@apis/users.api";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { isAxiosUnprocessableEntityError } from "@utils/utils.ts";
import { ResponseApi } from "@utils/utils.type.ts";
export interface RecoveryForm {
  username: string;
}

const Recovery = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = React.useState("email"); // Change to single selectedKey state

  const recoveryMethods = [
    { label: "Email", value: "email" },
    { label: "Phone Number", value: "phone number" },
  ];

  const schema = yup.object().shape({
    username:
      selectedKey === "email"
        ? yup.string().email("Invalid email").required("Email is required")
        : yup
            .string()
            .matches(/^[0-9]+$/, "Invalid phone number")
            .required("Phone number is required"),
  });

  const { mutate } = useMutation({
    mutationFn: (body: RecoveryForm) => {
      return recovery(body);
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RecoveryForm>({
    resolver: yupResolver(schema),
  });

  const handleRecovery: SubmitHandler<RecoveryForm> = (data) => {
    console.log(data);
    mutate(data, {
      onSuccess: () => {
        toast.success("Recovery successful!", {
          position: "top-left",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<RecoveryForm>>(error)) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof RecoveryForm, {
                message: formError[key as keyof RecoveryForm],
                type: "Server",
              });
            });
          }
        }
      },
    });
  };

  const handleRecoveryButtonClick: MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();
    handleSubmit(handleRecovery)();
  };

  const handleSelectionChange = (selectedValue: ChangeEvent) => {
    setSelectedKey((selectedValue.target as HTMLSelectElement).value);
    console.log(
      "Selected Method",
      (selectedValue.target as HTMLSelectElement).value,
    );
  };
  return (
    <div>
      <div className="flex justify-center h-full  ">
        <div className="flex flex-col mt-24  items-center w-1/2 h-3/4 max-[900px]:text-[14 px] max-[600px]:p-4   p-12 transform -translate-y-5 shadow-2xl ">
          <h1>RECOVERY PASSWORD</h1>
          <Input
            {...register("username")}
            type="username"
            label="Phone/Email"
            variant="bordered"
            placeholder="Enter your email or phone number"
            isInvalid={errors.username ? true : undefined}
            color={errors.username ? "danger" : "success"}
            errorMessage={errors.username && errors.username.message}
            className="max-w-xs mb-4 mt-4"
            isRequired
          />
          <div className="flex max-[900px]:flex-col">
            <p className="mt-2 mr-2 font-bold text-center">
              CHOICE YOUR METHOD:{" "}
            </p>
            <Select
              isRequired
              label="Recovery Method"
              defaultSelectedKeys={[selectedKey]}
              onChange={(value) => handleSelectionChange(value)}
              className="max-w-xs"
            >
              {recoveryMethods.map((method) => (
                <SelectItem key={method.value} value={method.value}>
                  {method.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Button
            className="mt-4"
            size="lg"
            color="danger"
            onClick={handleRecoveryButtonClick}
          >
            Recovery
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
