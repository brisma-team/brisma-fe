import {
  ButtonIcon,
  CloseModal,
  ModalScroll,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  CardContent,
  CategorySelect,
  CustomSelect,
  FormWithLabel,
  ModalFooter,
  TypeSelect,
  UserSKAISelect,
} from "@/components/molecules/commons";
import { getYearsList } from "@/helpers";

const ModalAddProjectEksternal = ({
  payload,
  dataPic,
  validation,
  selectedData,
  showModal,
  handleChangePayload,
  handleResetPayload,
  handleCloseModal,
  handleSubmit,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      footer={<ModalFooter handleSubmit={handleSubmit} />}
      positionCenter
    >
      <div className="w-[50rem] relative">
        <div className="flex justify-between">
          <CloseModal
            showModal={showModal}
            handleCloseModal={handleCloseModal}
          />
          <div className="text-2xl font-semibold mb-2">{`[${
            selectedData?.orgeh_kode
          }][${
            selectedData?.branch_kode
          }] - ${selectedData?.branch_name?.toUpperCase()}`}</div>
        </div>
        <div className="mt-3">
          <CardContent>
            <FormWithLabel
              form={
                <TextInput
                  icon={
                    <ButtonIcon
                      handleClick={() => handleResetPayload("project_id")}
                      icon={<IconClose size="medium" />}
                    />
                  }
                  onChange={(e) =>
                    handleChangePayload("project_id", e.target.value)
                  }
                  value={payload?.project_id || ""}
                  placeholder={"Project ID"}
                />
              }
              label="Project ID*"
              widthLabel={"w-3/12"}
              widthForm={"w-9/12"}
            />
            <FormWithLabel
              form={
                <TextInput
                  icon={
                    <ButtonIcon
                      handleClick={() => handleResetPayload("project_name")}
                      icon={<IconClose size="medium" />}
                    />
                  }
                  onChange={(e) =>
                    handleChangePayload("project_name", e.target.value)
                  }
                  value={payload?.project_name || ""}
                  placeholder={"Project Name"}
                />
              }
              label="Project Name*"
              widthLabel={"w-3/12"}
              widthForm={"w-9/12"}
            />
            <FormWithLabel
              form={
                <TypeSelect
                  placeholder={"Tipe Kegiatan"}
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() => handleResetPayload("mtd_tipe")}
                    />
                  }
                  handleChange={(e) =>
                    handleChangePayload("mtd_tipe", {
                      kode: e.value,
                      nama: e.label,
                    })
                  }
                  selectedValue={
                    payload?.mtd_tipe?.kode
                      ? {
                          label: payload?.mtd_tipe?.nama,
                          value: payload?.mtd_tipe?.kode,
                        }
                      : null
                  }
                />
              }
              label="Tipe Kegiatan*"
              widthLabel={"w-3/12"}
              widthForm={"w-9/12"}
            />
            <FormWithLabel
              form={
                <CategorySelect
                  placeholder={"Jenis Kegiatan"}
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() => handleResetPayload("mtd_jenis")}
                    />
                  }
                  handleChange={(e) =>
                    handleChangePayload("mtd_jenis", {
                      kode: e.value,
                      nama: e.label,
                    })
                  }
                  selectedValue={payload.jenis}
                />
              }
              label="Jenis Kegiatan"
              widthLabel={"w-3/12"}
              widthForm={"w-9/12"}
            />
            <FormWithLabel
              form={
                <CustomSelect
                  optionValue={getYearsList()}
                  placeholder="Tahun"
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() => handleResetPayload("tahun")}
                    />
                  }
                  handleChange={(e) => handleChangePayload("tahun", e.value)}
                  selectedValue={
                    payload?.tahun
                      ? {
                          label: payload?.tahun?.toString(),
                          value: payload?.tahun,
                        }
                      : null
                  }
                />
              }
              label="Tahun*"
              errors={validation?.tahun}
              widthLabel={"w-3/12"}
              widthForm={"w-9/12"}
            />
            <FormWithLabel
              form={
                // <UserSKAISelect
                //   selectedValue={
                //   payload?.pic?.pn
                //     ? {
                //         label: `${payload?.pic?.pn} - ${payload?.pic?.name}`,
                //         value: {
                //           pn: payload?.pic?.pn,
                //           name: payload?.pic?.name,
                //         },
                //       }
                //     : null
                // }
                //   customIcon={
                //     <ButtonIcon
                //       icon={<IconClose />}
                //       handleClick={() => handleResetPayload("pic")}
                //     />
                //   }
                //   handleChange={(e) => handleChangePayload("pic", e.value)}
                // />
                <CustomSelect
                  optionValue={dataPic}
                  selectedValue={
                    payload?.pic?.pn
                      ? {
                          label: `${payload?.pic?.pn} - ${payload?.pic?.name}`,
                          value: {
                            pn: payload?.pic?.pn,
                            name: payload?.pic?.name,
                          },
                        }
                      : null
                  }
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() => handleResetPayload("pic")}
                    />
                  }
                  handleChange={(e) => handleChangePayload("pic", e.value)}
                />
              }
              label="PIC Analisator*"
              errors={validation?.tahun}
              widthLabel={"w-3/12"}
              widthForm={"w-9/12"}
            />
          </CardContent>
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalAddProjectEksternal;
