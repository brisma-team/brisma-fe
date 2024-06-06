import { CardContent } from "@/components/molecules/commons";
import CardContentObjek from "./CardContentObjek";
import { convertDate } from "@/helpers";

const DetailNegosiasi = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-4">
        <div className="w-3/4">
          <CardContent className="h-full">
            <div className="flex flex-col gap-0.5 h-full">
              <div className="text-sm text-brisma font-bold">
                ALASAN NEGOSIASI
              </div>
              <div className="text-sm text-brisma">{data?.alasan || ""}</div>
            </div>
          </CardContent>
        </div>
        <div className="w-1/4">
          <CardContent className="h-full">
            <div className="flex flex-col gap-2 text-center">
              <div className="text-sm font-bold">METODE NEGOSIASI</div>
              <div className="text-sm font-bold">
                {data?.metode_nego?.nama?.toUpperCase() || ""}
                <p className="font-normal">
                  Tanggal :{" "}
                  {data?.created_at
                    ? convertDate(data?.created_at, "/", "d")
                    : ""}
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
      <div className="flex gap-4">
        <CardContentObjek data={data?.action_plan} />
        <CardContentObjek data={data?.negosiasi} isNewData />
      </div>
    </div>
  );
};

export default DetailNegosiasi;
