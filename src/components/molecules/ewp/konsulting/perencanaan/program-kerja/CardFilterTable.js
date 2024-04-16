import { ButtonIcon, Card, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  RiskControlSelect,
  RiskSelect,
  UserSKAISelect,
} from "@/components/molecules/commons";

const CardFilterTable = ({ showFilter, filter, handleChange, handleReset }) => {
  return showFilter ? (
    <div className="rounded mt-4 w-[30rem]">
      <Card>
        <div className="px-4 py-2 flex flex-col gap-3 items-center justify-center w-full">
          <div className="flex gap-3 items-center w-full">
            <div className="flex flex-col gap-3 w-56">
              <TextInput
                placeholder="Judul lingkup"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("judul_lingkup")}
                    icon={<IconClose />}
                  />
                }
                onChange={(e) => handleChange("judul_lingkup", e.target.value)}
                value={filter?.judul_lingkup}
              />
              <UserSKAISelect
                selectedValue={
                  filter?.pic?.pn
                    ? { label: filter?.pic?.name, value: filter?.pic }
                    : null
                }
                customIcon={
                  <ButtonIcon
                    icon={<IconClose />}
                    handleClick={() => handleReset("pic")}
                  />
                }
                handleChange={(e) => handleChange("pic", e.value)}
                placeholder={"P.I.C"}
              />
            </div>
            <div className="flex flex-col gap-3 w-56">
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
                handleChange={(e) => handleChange("risk", e.value)}
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
                handleChange={(e) => handleChange("control", e.value)}
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
