import { AvatarDefaultExample, RoleLabel } from "@/components/atoms";
import useUser from "@/data/useUser";
const ProfileDetail = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <AvatarDefaultExample />
      <div className="pt-4 flex flex-col items-center justify-center">
        <p className="font-bold text-base">{user?.data?.fullName}</p>
        <p className="text-base -mt-1">{user?.data?.pn}</p>
        <p className="font-semibold text-base -mt-1 mb-2">
          {user?.data?.uka_name}
        </p>
        <RoleLabel text={user?.data?.jabatan} />
      </div>
    </div>
  );
};

export default ProfileDetail;
