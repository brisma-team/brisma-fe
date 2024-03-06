import { ButtonIcon, Card, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { RiskControlSelect, RiskSelect } from "@/components/molecules/commons";

const CardFilterTable = ({
  showFilter,
  filter,
  handleChangeText,
  handleChangeSelect,
  handleReset,
}) => {
  return showFilter ? (
    <div className="rounded mt-4 w-[30rem]">
      <Card>
        <div className="px-4 py-2 flex flex-col gap-3 items-center justify-center w-full">
          <div className="flex gap-3 items-center w-full">
            <div className="flex flex-col gap-3 w-full">
              <TextInput
                placeholder="Judul lingkup"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("judul_lingkup")}
                    icon={<IconClose size="large" />}
                  />
                }
                onChange={(e) =>
                  handleChangeText("judul_lingkup", e.target.value)
                }
                value={filter?.judul_lingkup}
              />
              <TextInput
                placeholder="P.I.C"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("pn_pic")}
                    icon={<IconClose size="large" />}
                  />
                }
                onChange={(e) => handleChangeText("pn_pic", e.target.value)}
                value={filter?.pn_pic}
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <RiskSelect
                selectedValue={
                  filter?.risk?.kode
                    ? { label: filter?.risk?.nama, value: filter?.risk }
                    : null
                }
                customIcon={
                  <ButtonIcon
                    icon={<IconClose />}
                    handleClick={() => handleReset("risk")}
                  />
                }
                handleChange={(e) => handleChangeSelect("risk", e.value)}
                placeholder={"Pilih resiko"}
              />
              <RiskControlSelect
                selectedValue={
                  filter?.control?.kode
                    ? { label: filter?.control?.nama, value: filter?.control }
                    : null
                }
                customIcon={
                  <ButtonIcon
                    icon={<IconClose />}
                    handleClick={() => handleReset("control")}
                  />
                }
                handleChange={(e) => handleChangeSelect("control", e.value)}
                placeholder={"Pilih control"}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  ) : (
    ""
  );
};

export default CardFilterTable;
