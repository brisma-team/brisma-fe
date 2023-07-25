import { Select, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  FormWithLabel,
  CardBodyContent,
  CardBodyContentDetailCost,
} from "@/components/molecules/commons";

const SubModalBiayaSelamaKegiatan = () => {
  return (
    <div className="w-full gap-3 flex p-6">
      <div className="w-1/2">
        <CardBodyContent handler={() => console.log("TEST")}>
          <FormWithLabel
            label={"Kategori Kegiatan"}
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
            label={"Porto"}
            form={<TextInput icon={<IconClose />} />}
            widthFull={true}
          />
          <FormWithLabel
            label={"Percetakan"}
            form={<TextInput icon={<IconClose />} />}
            widthFull={true}
          />
          <FormWithLabel
            label={"A.T.K"}
            form={<TextInput icon={<IconClose />} />}
            widthFull={true}
          />
          <FormWithLabel
            label={"Suplai Komputer"}
            form={<TextInput icon={<IconClose />} />}
            widthFull={true}
          />
        </CardBodyContent>
      </div>
      <div className="w-1/2">
        <CardBodyContent>
          <CardBodyContentDetailCost
            title={"Rincian Biaya Perjalanan Dinas"}
            totalCost={{ title: "Barang dan Jasa", cost: "1000000" }}
            detailCost={[
              { title: "Porto", cost: "1000000" },
              { title: "Percetakkan", cost: "1000000" },
              { title: "A.T.K", cost: "1000000" },
              { title: "Suplai Komputer", cost: "1000000" },
            ]}
          />
        </CardBodyContent>
      </div>
    </div>
  );
};

export default SubModalBiayaSelamaKegiatan;
