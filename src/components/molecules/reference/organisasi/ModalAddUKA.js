import { ButtonIcon, Modal, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  ModalHeader,
  ModalFooter,
  CardBodyContent,
  FormWithLabel,
  BranchSelect,
  OrgehSelect,
} from "@/components/molecules/commons";

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
  console.log(data);
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
/*    {
      label: "Uka Type*",
      value: data?.uka_type || "",
      placeholder: "Pilih Uka Type",
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
      label: "No. Telepon",
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
    },*/
  ];
  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          headerText={typeModal === "update" ? "Ubah UKA" : "Tambah UKA"}
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
                  //   isDisabled={true}
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
              ) : null
            }
            errors={validation?.[field?.name]}
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
        ))}
      </CardBodyContent>
    </Modal>
  );
};

export default ModalAddUKA;
