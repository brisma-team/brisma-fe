import { AvatarDefaultExample, RoleLabel } from "@/components/atoms";

const ProfileDetail = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <AvatarDefaultExample />
      <div className="pt-4 flex flex-col items-center justify-center">
        <p className="font-bold text-base">Muhamad Firli Ismail</p>
        <p className="-mt-1 mb-2 text-base">20020202</p>
        <RoleLabel text={"Kepala Divisi Internal Audit"} />
      </div>
    </div>
  );
};

export default ProfileDetail;