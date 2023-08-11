import {
  ButtonIcon,
  Card,
  DatepickerStartEnd,
  TextInput,
} from "@/components/atoms";
import { useMetode, useTipe } from "@/data/reference";
import { MetodeSelect, TypeSelect } from "../commons";
import { IconClose } from "@/components/icons";

const CardFilterActivitySchedule = ({ showFilter, params, setParams }) => {
  const { metode } = useMetode("list");
  const { tipe } = useTipe("list");

  const handleChange = (property, value) => {
    const updatedData = {
      ...params,
      [property]: value,
    };
    setParams(updatedData);
  };

  const findMetode = (kode) => {
    const find = metode?.data?.find((v) => v.kode == kode);
    return { label: find?.nama, value: find?.kode };
  };

  const findTipe = (kode) => {
    const find = tipe?.data?.find((v) => v.kode == kode);
    return { label: find?.nama, value: find?.kode };
  };

  return (
    showFilter && (
      <Card>
        <div className="flex flex-wrap m-2 gap-3 px-2">
          <div className="w-48">
            <TextInput
              placeholder="Nama Proyek"
              onChange={(e) => handleChange("project_name", e.target.value)}
              value={params.project_name}
              icon={
                <ButtonIcon
                  icon={<IconClose size="medium" />}
                  handleClick={() => handleChange("project_name", "")}
                />
              }
            />
          </div>
          <div className="w-48">
            <MetodeSelect
              placeholder={"Metode Audit"}
              customIcon={
                <ButtonIcon
                  icon={<IconClose />}
                  handleClick={() => handleChange("metode", "")}
                />
              }
              handleChange={(e) => handleChange("metode", e.value)}
              selectedValue={
                params?.metode === "" ? "" : findMetode(params?.metode)
              }
            />
          </div>
          <div className="w-48">
            <DatepickerStartEnd
              placeholderStart={"Start"}
              placeholderEnd={"End"}
              handlerChangeStart={(e) => handleChange("start", e)}
              handlerChangeEnd={(e) => handleChange("end", e)}
              valueStart={params.start}
              valueEnd={params.end}
            />
          </div>
          <div className="w-48">
            <TypeSelect
              placeholder={"Tipe Audit"}
              customIcon={
                <ButtonIcon
                  icon={<IconClose />}
                  handleClick={() => handleChange("tipe", "")}
                />
              }
              handleChange={(e) => handleChange("tipe", e.value)}
              selectedValue={params?.tipe === "" ? "" : findTipe(params?.tipe)}
            />
          </div>
        </div>
      </Card>
    )
  );
};

export default CardFilterActivitySchedule;
