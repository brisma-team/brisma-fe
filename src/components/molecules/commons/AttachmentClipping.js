import { Card, DivButton, UploadFileButton } from "@/components/atoms";
import { copyToClipboard } from "@/helpers";
import { useEffect } from "react";

const AttachmentClipping = ({ data, handleChange, handleClick }) => {
  useEffect(() => {
    console.log("data => ", data);
  }, [data]);
  return (
    <div className="h-fit">
      <Card>
        <div className="w-full px-4 -ml-1">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Lampiran</p>
          </div>
          {/* Start Lampiran Gambar */}
          <div className="-mx-1 mt-2 max-h-[14rem] overflow-y-scroll overflow-x-hidden">
            {data?.length ? (
              <ul className="list-disc w-full pl-6">
                {data.map((v, i) => (
                  <li key={i} className="w-full">
                    <DivButton
                      handleClick={() => copyToClipboard(v?.url)}
                      className="text-atlasian-blue-light underline hover:text-atlasian-red hover:no-underline"
                    >
                      {v?.name}
                    </DivButton>
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
          </div>
          <div className="mt-4 py-2 bg-none w-full justify-start">
            <UploadFileButton
              text={"Tambah Lampiran +"}
              className={"text-atlasian-purple text-sm"}
              handleChange={handleChange}
              handleClick={handleClick}
            />
          </div>
          {/* End Kliping Lampiran */}
        </div>
      </Card>
    </div>
  );
};

export default AttachmentClipping;
