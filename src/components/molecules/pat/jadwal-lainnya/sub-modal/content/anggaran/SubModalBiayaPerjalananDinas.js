import { Select, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  FormWithLabel,
  CardBodyContent,
  CardBodyContentDetailCost,
} from "@/components/molecules/commons";

const SubModalBiayaPerjalananDinas = () => {
  return (
    <div className="w-full gap-3 flex p-6">
      <div className="w-1/2">
        <CardBodyContent handler={() => console.log("TEST")}>
          <FormWithLabel
            label={"Posisi Jabatan"}
            form={
              <Select
                isSearchable={false}
                optionValue={[
                  { label: "Awal", value: "awal" },
                  { label: "Akhir", value: "akhir" },
                ]}
              />
            }
            widthFull={true}
          />
          <FormWithLabel
            label={"Tiket PP"}
            form={<TextInput icon={<IconClose />} />}
            widthFull={true}
          />
          <FormWithLabel
            label={"Transport Lokal"}
            form={<TextInput icon={<IconClose />} />}
            widthFull={true}
          />
          <FormWithLabel
            label={"Uang Harian"}
            form={<TextInput icon={<IconClose />} />}
            widthFull={true}
          />
          <FormWithLabel
            label={"Biaya Akomodasi"}
            form={<TextInput icon={<IconClose />} />}
            widthFull={true}
          />
        </CardBodyContent>
      </div>
      <div className="w-1/2">
        <CardBodyContent>
          <CardBodyContentDetailCost
            title={"Rincian Biaya Perjalanan Dinas"}
            totalCost={{ title: "Mantri Kupedes", cost: "1000000" }}
            detailCost={[
              { title: "Tiket PP", cost: "1000000" },
              { title: "Transport Lokal", cost: "1000000" },
              { title: "Uang Harian", cost: "1000000" },
              { title: "Biaya Akomodasi", cost: "1000000" },
            ]}
          />
        </CardBodyContent>
      </div>
    </div>
  );
};

export default SubModalBiayaPerjalananDinas;
