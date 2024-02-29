import { Card, DatepickerField, TextAreaField } from "@/components/atoms";
import { FormWithLabel } from "@/components/molecules/commons";
import { dateNow } from "@/helpers";

const CardAddRekomendasi = ({ data, validation, handleChange }) => {
  return (
    <Card>
      <div className="w-full px-4 flex flex-col">
        <p className="text-base font-bold w-">Tambah Rekomendasi</p>
        <FormWithLabel
          label={"Deadline"}
          form={
            <DatepickerField
              placeholder="Pilih Tanggal"
              format={"DD-MM-YYYY"}
              handleChange={(value) => handleChange("deadline", value)}
              value={data?.deadline || ""}
              minDate={dateNow()}
            />
          }
          errors={validation?.deadline}
          widthLabel={"w-2/12"}
          widthForm={"w-3/12"}
        />
        <FormWithLabel
          label={"Uraian Rekomendasi"}
          form={
            <TextAreaField
              handleChange={(e) => handleChange("desc", e.target.value)}
              value={data?.desc || ""}
            />
          }
          errors={validation?.desc}
          widthLabel={"w-2/12"}
          widthForm={"w-10/12"}
          labelPositionTop
        />
      </div>
    </Card>
  );
};

export default CardAddRekomendasi;
