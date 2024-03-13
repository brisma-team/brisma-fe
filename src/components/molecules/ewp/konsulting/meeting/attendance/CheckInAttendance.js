import {
  ButtonField,
  ErrorValidation,
  Spinner,
  TextInput,
} from "@/components/atoms";
import { CardOverview } from "../overview";
import { useEffect } from "react";
import PasswordTextField from "@/components/atoms/PasswordTextField";

const CheckInAttendance = ({
  isLoading,
  meetingDetail,
  payload,
  validation,
  handleSubmitLogin,
  handleChangePayload,
}) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleSubmitLogin(e);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleSubmitLogin]);

  if (isLoading) {
    return (
      <div className="w-full h-32 flex items-center justify-center">
        <Spinner size={"large"} />
      </div>
    );
  }

  // useEffect(() => {
  //   console.log("validation => ", validation);
  // }, [validation]);

  return (
    <div className="w-full flex gap-3 p-5">
      <div className="w-[55%]">
        <CardOverview data={meetingDetail} withoutHover withoutButton />
      </div>
      <div className="w-[45%] p-2">
        <p className="text-brisma font-bold text-2xl">Daftar Kehadiran</p>
        <div className="w-full py-3">
          <p className="text-base text-brisma font-bold">Personal Number</p>
          <TextInput
            value={payload?.pn}
            onChange={(e) => handleChangePayload("pn", e.target.value)}
            placeholder={"Masukkan PN"}
          />
          {validation?.pn ? (
            <ErrorValidation
              message={validation?.pn}
              className={"ml-1 mt-2 mb-2"}
            />
          ) : (
            ""
          )}
          <p className="text-base text-brisma font-bold">Password</p>
          <PasswordTextField
            value={payload?.password}
            handleChange={(e) =>
              handleChangePayload("password", e.target.value)
            }
            placeholder={"Masukkan Password"}
          />
          {validation?.password ? (
            <ErrorValidation
              message={validation?.password}
              className={"ml-1 mt-2 mb-2"}
            />
          ) : (
            ""
          )}
        </div>
        <div className="w-full bg-atlasian-blue-light rounded">
          <ButtonField text="Check-In" handler={handleSubmitLogin} />
        </div>
      </div>
    </div>
  );
};

export default CheckInAttendance;
