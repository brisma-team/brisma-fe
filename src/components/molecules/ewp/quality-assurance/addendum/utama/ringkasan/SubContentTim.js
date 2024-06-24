import { useEffect, useState } from "react";
import { convertIntegerToDecimal } from "@/helpers";
import { CardTeam } from "@/components/molecules/ewp/monitoring-offsite/tindak-lanjut";
import { Card } from "@/components/atoms";
import { CardMemberTeam } from "@/components/molecules/ewp/konsulting/perencanaan/tim-timeplan";

const SubContentTim = ({ tim, dataInfoProject }) => {
  const [dataTeam, setDataTeam] = useState({});

  useEffect(() => {
    if (tim) {
      const mappingInitiator = [dataInfoProject?.project_info?.initiator];
      const mappingKTA = tim?.kta?.length
        ? tim?.kta?.map((v) => {
            const { pn, nama, is_initiator } = v;
            return {
              pn,
              nama,
              is_initiator,
            };
          })
        : [];
      const mappingMA = tim?.ma?.length
        ? tim?.ma?.map((v) => {
            const { pn, nama, is_initiator } = v;
            return {
              pn,
              nama,
              is_initiator,
            };
          })
        : [];
      const mappingATA = tim?.ata?.length
        ? tim?.ata?.map((v) => {
            const { pn, nama, is_initiator, mandays, deskripsi } = v;
            return {
              pn,
              nama,
              is_initiator,
              mandays: convertIntegerToDecimal(mandays).decimal,
              deskripsi,
            };
          })
        : [];

      setDataTeam({
        initiator: mappingInitiator,
        kta: mappingKTA,
        ma: mappingMA,
        ata: mappingATA,
      });
    } else {
      setDataTeam({});
    }
  }, [tim, dataInfoProject]);
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3 w-full h-full">
        <CardTeam
          data={dataTeam}
          property={"initiator"}
          title={"Initiator"}
          textColorTitle={"text-atlasian-yellow"}
          withoutButton
          isDisabled
        />
        <CardTeam
          isUserSKAI
          data={dataTeam}
          validation
          withoutButton
          isDisabled
          property={"ma"}
          title={"Manajer Review"}
          textColorTitle={"text-atlasian-blue-light"}
        />
        <CardTeam
          isUserSKAI
          data={dataTeam}
          withoutButton
          isDisabled
          property={"kta"}
          title={"Ketua Tim Review"}
          textColorTitle={"text-atlasian-red"}
        />
      </div>
      <div className="w-full">
        <Card>
          <div className="px-4 py-2 flex flex-col gap-4 w-full">
            <CardMemberTeam
              title={"Anggota Tim Audit"}
              textColorTitle={"text-atlasian-green"}
              property={"ata"}
              data={dataTeam}
              withoutButton
              isDisabled
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SubContentTim;
