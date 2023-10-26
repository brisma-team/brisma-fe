import {
  ButtonIcon,
  Card,
  DatepickerStartEnd,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  CategorySelect,
  MetodeSelect,
  PekerjaSelect,
  TemaSelect,
  TypeSelect,
} from "../commons";
import { useState } from "react";

const CardFilterOtherSchedule = ({ showFilter, params, setParams }) => {
  const [selectedValue, setSelectedValue] = useState({
    metode: "",
    tipe: "",
    jenis: "",
    tema: "",
    pic: "",
  });

  const handleChangeParams = (property, value) => {
    const updatedData = {
      ...params,
      [property]: value,
    };
    setParams(updatedData);
  };

  const handleChangeSelected = (property, value) => {
    const updatedData = {
      ...selectedValue,
      [property]: value,
    };
    setSelectedValue(updatedData);
  };

  const handleResetSelected = (property) => {
    handleChangeParams(property, "");
    handleChangeSelected(property, "");
  };

  return (
    showFilter && (
      <Card>
        <div className="flex gap-3 px-4 py-2 w-fit">
          <div className="flex flex-col gap-3">
            <div className="w-72 flex tems-center h-full">
              <TextInput
                placeholder="Nama Proyek"
                onChange={(e) => handleChangeParams("nama", e.target.value)}
                value={params.nama}
                icon={
                  <ButtonIcon
                    icon={<IconClose size="medium" />}
                    handleClick={() => handleChangeParams("nama", "")}
                  />
                }
              />
            </div>
            <div className="w-72">
              <DatepickerStartEnd
                placeholderStart={"Start"}
                placeholderEnd={"End"}
                handlerChangeStart={(e) => handleChangeParams("start", e)}
                handlerChangeEnd={(e) => handleChangeParams("end", e)}
                valueStart={params.start}
                valueEnd={params.end}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-48">
              <MetodeSelect
                placeholder={"Metode Audit"}
                customIcon={
                  <ButtonIcon
                    icon={<IconClose />}
                    handleClick={() => handleResetSelected("metode")}
                  />
                }
                handleChange={(e) => (
                  handleChangeParams("metode", e.value),
                  handleChangeSelected("metode", e)
                )}
                selectedValue={selectedValue.metode}
              />
            </div>
            <div className="w-48">
              <TypeSelect
                placeholder={"Tipe Audit"}
                customIcon={
                  <ButtonIcon
                    icon={<IconClose />}
                    handleClick={() => handleResetSelected("tipe")}
                  />
                }
                handleChange={(e) => (
                  handleChangeParams("tipe", e.value),
                  handleChangeSelected("tipe", e)
                )}
                selectedValue={selectedValue.tipe}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-48">
              <CategorySelect
                placeholder={"Jenis Audit"}
                customIcon={
                  <ButtonIcon
                    icon={<IconClose />}
                    handleClick={() => handleResetSelected("jenis")}
                  />
                }
                handleChange={(e) => (
                  handleChangeParams("jenis", e.value),
                  handleChangeSelected("jenis", e)
                )}
                selectedValue={selectedValue.jenis}
              />
            </div>
            <div className="w-48">
              <TemaSelect
                placeholder={"Tema Audit"}
                customIcon={
                  <ButtonIcon
                    icon={<IconClose />}
                    handleClick={() => handleResetSelected("tema")}
                  />
                }
                handleChange={(e) => (
                  handleChangeParams("tema", e.value),
                  handleChangeSelected("tema", e)
                )}
                selectedValue={selectedValue.tema}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-48">
              <PekerjaSelect
                placeholder={"PIC"}
                customIcon={
                  <ButtonIcon
                    icon={<IconClose />}
                    handleClick={() => handleResetSelected("pic")}
                  />
                }
                handleChange={(e) => (
                  handleChangeParams("pic", e.value.pn),
                  handleChangeSelected("pic", e)
                )}
                selectedValue={selectedValue.pic}
              />
            </div>
          </div>
        </div>
      </Card>
    )
  );
};

export default CardFilterOtherSchedule;
