import { AvatarDefaultExample } from "@/components";

const ProfileDetail = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <AvatarDefaultExample />
      <div className="pt-4 flex flex-col items-center justify-center">
        <p className="font-bold text-base">Muhamad Firli Ismail</p>
        <p className="-mt-1 mb-2 text-base">20020202</p>
        <div
          style={{
            backgroundColor: "#FFBDAD",
            padding: "3px",
            paddingRight: "6px",
            paddingLeft: "6px",
            borderRadius: "3px",
          }}
        >
          <p className="text-base text-white">Kepala Divisi Internal Audit</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
