// import AvatarDefaultExample from "./Avatar";
import { AvatarDefaultExample } from "@/components";

const ProfileDetail = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <AvatarDefaultExample />
      <div className="pt-4 leading-3 flex flex-col items-center justify-center">
        <p className="font-bold">Muhamad Firli Ismail</p>
        <p className="mb-2">20020202</p>
        <div
          style={{
            backgroundColor: "#FFBDAD",
            padding: "3px",
            paddingRight: "6px",
            paddingLeft: "6px",
            borderRadius: "3px",
          }}
        >
          <p style={{ fontSize: "12px" }}>Kepala Divisi Internal Audit</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
