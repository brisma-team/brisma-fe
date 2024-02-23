import { Card, UploadFileButton } from "@/components/atoms";
import PopupKlipping from "./PopupKlipping";
import { copyToClipboard } from "@/helpers";
import Image from "next/image";

const ImageClipping = ({ data, handleChange, handleClick }) => {
  return (
    <div className="h-fit">
      <Card>
        <div className="w-full px-4 -ml-1">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Kliping Gambar</p>
            <PopupKlipping />
          </div>
          {/* Start Kliping Gambar */}
          <div className="grid grid-cols-2 -mx-1 mt-2 max-h-[14rem] overflow-x-hidden overflow-y-scroll">
            {data?.length
              ? data?.map((v, i) => {
                  return (
                    <button
                      key={i}
                      className="m-2 border-2 shadow-sm rounded-lg p-3"
                      style={{ width: "6.25rem", height: "6.25rem" }}
                      onClick={() => copyToClipboard(v?.url)}
                    >
                      <Image
                        src={v?.url}
                        alt={v?.name}
                        width={200}
                        height={200}
                      />
                    </button>
                  );
                })
              : ""}
          </div>
          <div className="mt-4 py-2 bg-none w-full justify-start">
            <UploadFileButton
              text={"Tambah Kliping +"}
              fileAccept={"image/png, image/gif, image/jpeg"}
              className={"text-atlasian-purple text-sm"}
              handleChange={handleChange}
              handleClick={handleClick}
              type={"image"}
            />
          </div>
          {/* End Kliping Gambar */}
        </div>
      </Card>
    </div>
  );
};

export default ImageClipping;
