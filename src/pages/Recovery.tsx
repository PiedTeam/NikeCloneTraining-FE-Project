import React, { ChangeEvent, MouseEventHandler } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { RecoveryForm } from "@services/users.api";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { isAxiosUnprocessableEntityError } from "@utils/utils.ts";
import { ResponseApi } from "@utils/utils.type.ts";
import usersService from "@services/users.service";
import { isAxiosError } from "axios";

const Recovery = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = React.useState("email");
  const location = useLocation();

  const recoveryMethods = [
    { label: "Email", value: "email" },
    { label: "Phone Number", value: "phone number" },
  ];

  const schema = yup.object().shape({
    email_phone:
      selectedKey === "email"
        ? yup.string().email("Invalid email").required("Email is required")
        : yup
            .string()
            .matches(/^[0-9]+$/, "Invalid phone number")
            .test(
              "len",
              "Phone number must be exactly 10 digits",
              (val: string | undefined) => val!.length === 10,
            )
            .required("Phone number is required"),
  });

  const { mutate } = useMutation({
    mutationFn: (body: RecoveryForm) => {
      return usersService.recovery(body);
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
    mutate(data, {
      onSuccess: () => {
        toast.success("Recovery successful!", {
          position: "top-right",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/otp", {
            state: { email_phone: data.email_phone, from: location.pathname },
          });
        }, 2000);
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<RecoveryForm>>(error)) {
          const formError = error.response?.data.data;

          if (formError) {
            toast.error(
              formError.email ? formError.email : formError.phone_number,
              {
                autoClose: 2000,
              },
            );
            Object.keys(formError).forEach((key) => {
              const errorMessage = formError[key as keyof RecoveryForm];
              setError(key as keyof RecoveryForm, {
                message: errorMessage?.toString(),
                type: "Server",
              });
            });
          }
        } else if (isAxiosError(error) && error.response?.status === 406) {
          toast.error(
            "Send otp over 3 time, Please wait 24 hours to try again",
          );
        } else if (isAxiosError(error) && error.response?.status === 401) {
          toast.error("Your account is not activated yet");
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
  };
  return (
    <div>
      <div className="flex h-full justify-center">
        <div className="max-[900px]:text-[14 px] mt-24 flex h-3/4 w-1/2 -translate-y-5 transform flex-col items-center p-12 shadow-2xl max-[600px]:p-4">
          <h1 className="text-center">RECOVERY PASSWORD</h1>
          <Input
            {...register("email_phone")}
            type="email_phone"
            label="Phone/Email"
            variant="bordered"
            placeholder="Enter your email or phone number"
            isInvalid={errors.email_phone ? true : undefined}
            color={errors.email_phone ? "danger" : "success"}
            errorMessage={errors.email_phone && errors.email_phone.message}
            className="mb-4 mt-4 max-w-xs"
            isRequired
          />
          <div className="">
            <p className="mb-4 mr-2 font-bold">CHOICE YOUR METHOD:</p>
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
