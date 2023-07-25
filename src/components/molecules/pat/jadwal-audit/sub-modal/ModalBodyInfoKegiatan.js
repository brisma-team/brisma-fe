import { useEffect } from "react";
import {
  Card,
  DatepickerStartEnd,
  Select,
  TextAreaField,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import CardAuditTeam from "../../CardAuditTeam";
import { CardBodyContent, FormWithLabel } from "@/components/molecules/commons";

const ModalBodyInfoKegiatan = ({ setCurrentModalStage }) => {
  useEffect(() => {
    setCurrentModalStage(1);
  }, []);

  return (
    <div className="w-[60rem]">
      <div className="w-1/2">
        <Card>
          <div className="w-full flex justify-between items-center px-2 -my-2">
            <div className="text-xl font-bold">Masukkan Nama Jadwal Audit</div>
            <IconClose size="xlarge" />
          </div>
        </Card>
      </div>
      <div className="flex gap-3 justify-between my-3">
        <div className="w-1/2">
          <CardBodyContent>
            <FormWithLabel
              label={"Tipe Audit"}
              form={<Select optionValue={[]} isSearchable={false} />}
            />
            <FormWithLabel
              label={"Jenis Audit"}
              form={<Select optionValue={[]} isSearchable={false} />}
            />
            <FormWithLabel
              label={"Kategori"}
              form={<Select optionValue={[]} isSearchable={false} />}
            />
            <FormWithLabel
              label={"Deskripsi Kegiatan"}
              form={<TextAreaField maxHeight={"5rem"} />}
              labelPositionTop={true}
              widthFull={true}
            />
            <FormWithLabel
              label={"Periode Kegiatan"}
              form={
                <DatepickerStartEnd
                  placeholderStart={"Mulai"}
                  placeholderEnd={"Akhir"}
                />
              }
              widthFull={true}
            />
            <FormWithLabel
              label={"Tim Audit"}
              form={<Select optionValue={[]} isSearchable={false} />}
            />
          </CardBodyContent>
        </div>
        <div className="w-1/2">
          <CardAuditTeam
            header_title={"Tim Audit Percobaan Baru BRISMA"}
            maker={"Eky Gunawan"}
            created_at={"23-06-2023"}
            manajer_audit={["Annisa Damayana", "Testing 1"]}
            ketua_tim_audit={["Eky Gunawan", "Adnan Budiman"]}
            anggota_tim_audit={["Markisa", "Durian", "Pepaya"]}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalBodyInfoKegiatan;
