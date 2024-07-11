import { ButtonIcon, ModalScroll, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  ModalHeader,
  ModalFooter,
  CardBodyContent,
  FormWithLabel,
  BranchSelect,
  OrgehSelect,
} from "@/components/molecules/commons";
import UkaTypeSelect from "../../commons/UkaTypeSelect";

const ModalAddUKA = ({
  data,
  typeModal,
  validation,
  showModal,
  handleChangeText,
  handleChangeSelect,
  handleCloseModal,
  handleSubmit,
}) => {
  const fields = [
    {
      label: "Kode Kantor Audit*",
      value: data?.kode,
      placeholder: "Masukkan Kode",
      name: "kode",
      inputText: true,
    },
    {
      label: "Nama Kantor Audit*",
      value: data?.name,
      placeholder: "Masukkan Nama Kantor Audit",
      name: "name",
      inputText: true,
    },
    {
      label: "Branch*",
      value: data?.branch_kode,
      placeholder: "Pilih Branch",
      name: "branch",
      inputText: false,
    },
    {
      label: "Orgeh*",
      value: data?.orgeh_kode,
      placeholder: "Pilih Orgeh",
      name: "orgeh",
      inputText: false,
    },
    {
      label: "Tipe Kantor Audit*",
      value: data?.uka_type || "",
      placeholder: "Pilih Tipe Kantor Audit",
      name: "uka_type",
      inputText: false,
    },
    {
      label: "Region",
      value: data?.region || "",
      placeholder: "Masukkan Region",
      name: "region",
      inputText: true,
    },
    {
      label: "Alamat",
      value: data?.alamat || "",
      placeholder: "Masukkan Alamat",
      name: "alamat",
      inputText: true,
    },
    {
      label: "No. Telp",
      value: data?.telp || "",
      placeholder: "Masukkan No. Telepon",
      name: "telp",
      inputText: true,
    },
    {
      label: "Email",
      value: data?.email || "",
      placeholder: "Masukkan Email",
      name: "email",
      inputText: true,
    },
    {
      label: "Fax",
      value: data?.fax || "",
      placeholder: "Masukkan Fax",
      name: "fax",
      inputText: true,
    },
  ];
  return (
    <ModalScroll
      positionCenter={true}
      showModal={showModal}
      header={
        <ModalHeader
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          headerText={
            typeModal === "update" ? "Ubah Kantor Audit" : "Tambah Kantor Audit"
          }
        />
      }
      footer={
        <ModalFooter
          handleSubmit={handleSubmit}
          buttonText={typeModal === "update" ? "Ubah" : "Simpan"}
        />
      }
    >
      <CardBodyContent>
        {fields?.map((field) => (
          <FormWithLabel
            key={field?.name}
            label={field?.label}
            form={
              field?.inputText ? (
                <TextInput
                  value={data?.[field?.name] || ""}
                  onChange={(e) =>
                    handleChangeText(field?.name, e.target.value)
                  }
                  placeholder={field?.placeholder}
                  isDisabled={typeModal == "update" && field?.name == "kode"}
                  // icon={
                  //   <ButtonIcon
                  //     handleClick={() => handleChangeText(field?.name, "")}
                  //     icon={<IconClose size="medium" />}
                  //   />
                  // }
                />
              ) : field?.name == "orgeh" ? (
                <OrgehSelect
                  isSearchable
                  handleChange={(e) => handleChangeSelect(field?.name, e)}
                  selectedValue={
                    data?.[field?.name]
                      ? {
                          label:
                            data?.[field?.name]?.value?.orgeh_kode +
                            " - " +
                            data?.[field?.name]?.value?.orgeh_name,
                          value: data?.[field?.name]?.value?.orgeh_kode,
                        }
                      : null
                  }
                  customIcon={
                    <ButtonIcon
                      handleClick={() => handleChangeSelect(field?.name, null)}
                      icon={<IconClose size="medium" />}
                    />
                  }
                  placeholder={field?.placeholder}
                />
              ) : field?.name == "branch" ? (
                <BranchSelect
                  isSearchable={true}
                  handleChange={(e) => handleChangeSelect(field?.name, e)}
                  selectedValue={
                    data?.[field?.name]
                      ? {
                          label:
                            data?.[field?.name]?.value?.branch_kode +
                            " - " +
                            data?.[field?.name]?.value?.branch_name,
                          value: data?.[field?.name]?.value?.branch_kode,
                        }
                      : null
                  }
                  customIcon={
                    <ButtonIcon
                      handleClick={() => handleChangeSelect(field?.name, null)}
                      icon={<IconClose size="medium" />}
                    />
                  }
                  placeholder={field?.placeholder}
                  width={"full"}
                />
              ) : field?.name == "uka_type" ? (
                <UkaTypeSelect
                  handleChange={(e) => handleChangeSelect(field?.name, e)}
                  selectedValue={
                    data?.[field?.name]
                      ? {
                          label:
                            data?.[field?.name]?.kode +
                            " - " +
                            data?.[field?.name]?.name,
                          value: data?.[field?.name]?.value?.kode,
                        }
                      : null
                  }
                  customIcon={
                    <ButtonIcon
                      handleClick={() => handleChangeSelect(field?.name, null)}
                      icon={<IconClose size="medium" />}
                    />
                  }
                  placeholder={field?.placeholder}
                  width={"full"}
                />
              ) : null
            }
            errors={validation?.[field?.name]}
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
        ))}
      </CardBodyContent>
    </ModalScroll>
  );
};

export default ModalAddUKA;
