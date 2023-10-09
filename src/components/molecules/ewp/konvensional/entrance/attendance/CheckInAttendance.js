import { ButtonField, TextInput } from "@/components/atoms";
import { CardOverview } from "../../overview";

const CheckInAttendance = ({ data }) => {
  return (
    <div className="w-full flex gap-3 p-5">
      <div className="w-[55%]">
        <CardOverview data={data} withoutHover={true} withoutButton={true} />
      </div>
      <div className="w-[45%] p-2">
        <p className="text-brisma font-bold text-2xl">Daftar Kehadiran</p>
        <div className="w-full py-3">
          <p className="text-base text-brisma font-bold">Personal Number</p>
          <TextInput />
          <p className="text-base text-brisma font-bold">Password</p>
          <TextInput />
        </div>
        <div className="w-full bg-atlasian-blue-light rounded">
          <ButtonField text="Check-In" />
        </div>
      </div>
    </div>
  );
};

export default CheckInAttendance;
