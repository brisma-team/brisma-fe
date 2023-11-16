import { AvatarDefaultExample, RoleLabel } from "@/components/atoms";
import useUser from "@/data/useUser";
const ProfileDetail = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <AvatarDefaultExample />
      <div className="pt-4 flex flex-col items-center justify-center">
        <p className="font-bold text-base">{user?.data?.fullName}</p>
        <p className="-mt-1 mb-2 text-base">{user?.data?.pn}</p>
        <RoleLabel text={user?.data?.jabatan} />
      </div>
    </div>
  );
};

export default ProfileDetail;
