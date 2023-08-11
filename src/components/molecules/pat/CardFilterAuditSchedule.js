import {
  ButtonIcon,
  Card,
  DatepickerStartEnd,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  AuditTeamSelect,
  CategorySelect,
  MetodeSelect,
  PekerjaSelect,
  TemaSelect,
  TypeSelect,
} from "../commons";
import { useEffect, useState } from "react";

const CardFilterAuditSchedule = ({ showFilter, params, setParams }) => {
  const [selectedValue, setSelectedValue] = useState({
    metode: "",
    tipe: "",
    jenis: "",
    tema: "",
    timAudit: "",
    maker: "",
  });

  useEffect(() => {
    console.log("params => ", params);
  }, [params]);

  useEffect(() => {
    console.log("selectedValue => ", selectedValue);
  }, [selectedValue]);

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
        <div className="flex p-2">
          <div className="flex flex-wrap gap-3 px-2 w-[25.75rem]">
            <div className="w-48">
              <TextInput
                placeholder="Nama Proyek"
                onChange={(e) =>
                  handleChangeParams("project_name", e.target.value)
                }
                value={params.project_name}
                icon={
                  <ButtonIcon
                    icon={<IconClose size="medium" />}
                    handleClick={() => handleChangeParams("project_name", "")}
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
              <DatepickerStartEnd
                placeholderStart={"Start"}
                placeholderEnd={"End"}
                handlerChangeStart={(e) => handleChangeParams("start", e)}
                handlerChangeEnd={(e) => handleChangeParams("end", e)}
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
          <div className="flex flex-wrap gap-3 px-2 w-[25.75rem]">
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
              <PekerjaSelect
                placeholder={"Maker"}
                customIcon={
                  <ButtonIcon
                    icon={<IconClose />}
                    handleClick={() => handleResetSelected("maker")}
                  />
                }
                handleChange={(e) => (
                  handleChangeParams("maker", e.value.pn),
                  handleChangeSelected("maker", e)
                )}
                selectedValue={selectedValue.maker}
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
            <div className="w-48">
              <AuditTeamSelect
                placeholder={"Tim Audit"}
                customIcon={
                  <ButtonIcon
                    icon={<IconClose />}
                    handleClick={() => handleResetSelected("timAudit")}
                  />
                }
                handleChange={(e) => (
                  handleChangeParams("timAudit", e.value),
                  handleChangeSelected("timAudit", e.value)
                )}
                selectedValue={selectedValue.timAudit}
              />
            </div>
          </div>
        </div>
      </Card>
    )
  );
};

export default CardFilterAuditSchedule;
