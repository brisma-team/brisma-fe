import { ButtonIcon, Card, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  PekerjaSelect,
  RiskControlSelect,
  RiskSelect,
  StatusApprovalSelect,
} from "@/components/molecules/commons";

const CardFilterTable = ({ showFilter, filter, handleChange, handleReset }) => {
  return showFilter ? (
    <div className="rounded w-[45rem] my-4">
      <Card>
        <div className="px-4 py-2 flex flex-col gap-3 items-center justify-center w-full">
          <div className="flex gap-3 w-full">
            <div className="w-1/3 flex flex-col gap-2 h-full">
              <PekerjaSelect
                placeholder={"Auditor"}
                handleChange={(e) => handleChange("auditor", e?.value)}
                selectedValue={
                  filter?.auditor?.pn
                    ? {
                        label: filter?.auditor?.name,
                        value: {
                          pn: filter?.auditor?.pn,
                          name: filter?.auditor?.name,
                        },
                      }
                    : null
                }
                customIcon={
                  <ButtonIcon
                    handleClick={() => handleReset("auditor")}
                    icon={<IconClose />}
                  />
                }
              />
              <TextInput
                placeholder="Lingkup"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("lingkup")}
                    icon={<IconClose />}
                  />
                }
                onChange={(e) => handleChange("lingkup", e.target.value)}
                value={filter?.lingkup}
              />
            </div>
            <div className="w-1/3 flex flex-col gap-2 h-full">
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
            <div className="w-1/3 flex flex-col gap-2 h-full">
              <StatusApprovalSelect
                handleChange={(e) => handleChange("status", e.value)}
                selectedValue={
                  filter?.status?.kode
                    ? {
                        label: filter?.status?.name,
                        value: {
                          kode: filter?.status?.kode,
                          value: filter?.status?.name,
                        },
                      }
                    : null
                }
                handleReset={() => handleReset("status")}
                placeholder={"Status Persetujuan"}
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
