import { useEffect } from "react";
import {
  Card,
  DatepickerStartEnd,
  Select,
  TextAreaField,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { CardFormInputTeam } from "@/components/molecules/pat";
import { CardBodyContent, FormWithLabel } from "@/components/molecules/commons";

const ModalBodyInfoKegiatan = ({ setCurrentModalStage }) => {
  useEffect(() => {
    setCurrentModalStage(1);
  }, []);

  return (
    <div className="w-[50rem]">
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
              label={"Metode Kegiatan"}
              form={<Select optionValue={[]} isSearchable={false} />}
            />
            <FormWithLabel
              label={"Tipe Kegiatan"}
              form={<Select optionValue={[]} isSearchable={false} />}
            />
            <FormWithLabel
              label={"Jenis Kegiatan"}
              form={<Select optionValue={[]} isSearchable={false} />}
            />
            <FormWithLabel
              label={"Kategori"}
              form={<Select optionValue={[]} isSearchable={false} />}
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
              label={"Deskripsi Kegiatan"}
              form={<TextAreaField maxHeight={"5rem"} />}
              labelPositionTop={true}
              widthFull={true}
            />
            <FormWithLabel
              label={"Tim Audit"}
              form={<Select optionValue={[]} isSearchable={false} />}
            />
          </CardBodyContent>
        </div>
        <div className="w-1/2">
          <CardFormInputTeam type={"P.I.C"} />
        </div>
      </div>
    </div>
  );
};

export default ModalBodyInfoKegiatan;
