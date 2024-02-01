import { IconClose } from "@/components/icons";
import { Card, LinkIcon, TextInput } from "@/components/atoms";
import { PekerjaSelect } from "../../commons";

const CardFilterTimAudit = ({ showFilter, filter, setFilter }) => {
  const handleChange = (property, value) => {
    setFilter({ ...filter, [property]: value });
  };

  return (
    showFilter && (
      <Card>
        <div className="flex flex-wrap items-center m-2 gap-3 px-2">
          <div className="w-48">
            <TextInput
              placeholder="Nama Tim"
              icon={<IconClose size="large" />}
              onChange={(e) => handleChange("tim_name", e.target.value)}
            />
          </div>
          <div className="w-48">
            <PekerjaSelect
              placeholder={"Manajer Audit"}
              customIcon={
                <LinkIcon
                  icon={<IconClose />}
                  handler={() => handleChange("nama_ma", "")}
                />
              }
              handleChange={(e) => handleChange("nama_ma", e.value.name)}
              selectedValue={
                filter?.nama_ma === ""
                  ? ""
                  : {
                      label: filter?.nama_ma,
                      value: filter?.nama_ma,
                    }
              }
            />
          </div>
          <div className="w-48">
            <PekerjaSelect
              placeholder={"Ketua Tim Audit"}
              customIcon={
                <LinkIcon
                  icon={<IconClose />}
                  handler={() => handleChange("nama_kta", "")}
                />
              }
              handleChange={(e) => handleChange("nama_kta", e.value.name)}
              selectedValue={
                filter?.nama_kta === ""
                  ? ""
                  : {
                      label: filter?.nama_kta,
                      value: filter?.nama_kta,
                    }
              }
            />
          </div>
          <div className="w-48">
            <PekerjaSelect
              placeholder={"Anggota Tim Audit"}
              customIcon={
                <LinkIcon
                  icon={<IconClose />}
                  handler={() => handleChange("nama_ata", "")}
                />
              }
              handleChange={(e) => handleChange("nama_ata", e.value.name)}
              selectedValue={
                filter?.nama_ata === ""
                  ? ""
                  : {
                      label: filter?.nama_ata,
                      value: filter?.nama_ata,
                    }
              }
            />
          </div>
        </div>
      </Card>
    )
  );
};

export default CardFilterTimAudit;
