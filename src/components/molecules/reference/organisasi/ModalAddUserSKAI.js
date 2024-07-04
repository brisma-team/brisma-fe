import { ButtonIcon, Modal, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  ModalHeader,
  ModalFooter,
  CardBodyContent,
  FormWithLabel,
} from "@/components/molecules/commons";
import { RoleSelectRef, UkaSelectRef } from "../common";

const ModalAddUserSKAI = ({
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
      label: "Personal Number",
      value: data?.pn,
      placeholder: "Personal Number",
      name: "pn",
      inputText: true,
    },
    {
      label: "Name",
      value: data?.name,
      placeholder: "Name",
      name: "name",
      inputText: true,
    },
    {
      label: "Unit Kantor Audit",
      value: data?.uka_kode,
      placeholder: "Unit Kantor Audit",
      name: "uka_kode",
      inputText: false,
    },
    {
      label: "Role",
      value: data?.role_kode,
      placeholder: "Role",
      name: "role_kode",
      inputText: false,
    },
  ];

  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          headerText={
            typeModal === "update" ? "Ubah Pengguna" : "Tambah Pengguna"
          }
        />
      }
      footer={<ModalFooter handleSubmit={handleSubmit} />}
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
                  icon={
                    <ButtonIcon
                      handleClick={() => handleChangeText(field?.name, "")}
                      icon={<IconClose size="medium" />}
                    />
                  }
                />
              ) : field?.name == "uka_kode" ? (
                <UkaSelectRef
                  isSearchable
                  handleChange={(e) => handleChangeSelect(field?.name, e)}
                  selectedValue={data?.[field?.name] || null}
                  customIcon={
                    <ButtonIcon
                      handleClick={() => handleChangeSelect(field?.name, null)}
                      icon={<IconClose size="medium" />}
                    />
                  }
                  placeholder={field?.placeholder}
                />
              ) : (
                <RoleSelectRef
                  isSearchable={false}
                  isMulti
                  handleChange={(e) => handleChangeSelect(field?.name, e)}
                  selectedValue={data?.[field?.name] || null}
                  customIcon={
                    <ButtonIcon
                      handleClick={() => handleChangeSelect(field?.name, null)}
                      icon={<IconClose size="medium" />}
                    />
                  }
                  placeholder={field?.placeholder}
                  width={"full"}
                />
              )
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

export default ModalAddUserSKAI;
