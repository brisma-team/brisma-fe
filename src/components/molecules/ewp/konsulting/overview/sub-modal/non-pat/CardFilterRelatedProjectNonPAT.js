import { ButtonIcon, Card, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { CategorySelect, TypeSelect } from "@/components/molecules/commons";

const CardFilterRelatedProjectNonPAT = ({
  showFilter,
  filter,
  handleChange,
  handleReset,
}) => {
  return (
    showFilter && (
      <div className="rounded bg-white mt-4 w-fit">
        <Card>
          <div className="px-2 flex gap-3">
            <div className="flex flex-col gap-3 h-fit">
              <TextInput
                placeholder="Judul Proyek Terkait"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("project_name")}
                    icon={<IconClose />}
                  />
                }
                onChange={(e) => handleChange("project_name", e.target.value)}
                value={filter?.project_name}
              />
              <TextInput
                placeholder="Project ID"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("project_id")}
                    icon={<IconClose />}
                  />
                }
                onChange={(e) => handleChange("project_id", e.target.value)}
                value={filter?.project_id}
              />
            </div>
            <div className="flex flex-col gap-3 w-56 h-fit">
              <TypeSelect
                placeholder={"Tipe Audit"}
                customIcon={
                  <ButtonIcon
                    icon={<IconClose size="small" />}
                    handleClick={() => handleReset("ref_tipe")}
                  />
                }
                handleChange={(e) =>
                  handleChange("ref_tipe", { kode: e.value, name: e.label })
                }
                selectedValue={
                  filter?.ref_tipe?.kode
                    ? {
                        label: filter?.ref_tipe?.name,
                        value: filter?.ref_tipe?.kode,
                      }
                    : null
                }
              />
              <CategorySelect
                placeholder={"Jenis Audit"}
                customIcon={
                  <ButtonIcon
                    icon={<IconClose size="small" />}
                    handleClick={() => handleReset("ref_jenis")}
                  />
                }
                handleChange={(e) =>
                  handleChange("ref_jenis", { kode: e.value, name: e.label })
                }
                selectedValue={
                  filter?.ref_jenis?.kode
                    ? {
                        label: filter?.ref_jenis?.name,
                        value: filter?.ref_jenis?.kode,
                      }
                    : null
                }
              />
            </div>
          </div>
        </Card>
      </div>
    )
  );
};

export default CardFilterRelatedProjectNonPAT;
