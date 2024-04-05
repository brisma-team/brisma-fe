import { ButtonIcon, Card, ModalScroll } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  ButtonEdit,
  CustomSelect,
  FormWithLabel,
  ModalFooter,
  ModalHeader,
} from "@/components/molecules/commons";
import CardContent from "../../../overview/CardContent";
import Link from "next/link";
import shortenWord from "@/helpers/shortenWord";

const ModalEditControl = ({
  selectedId,
  data,
  dataPIC,
  pathName,
  validation,
  showModal,
  handleChangeSelectPIC,
  handleResetPIC,
  handleClickEditUraian,
  handleCloseModal,
  handleSubmit,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          showModal={showModal}
          headerText={"Ubah Control"}
          handleCloseModal={handleCloseModal}
        />
      }
      footer={<ModalFooter handleSubmit={handleSubmit} />}
      positionCenter
    >
      <div className="w-[31rem]">
        <div className="flex flex-col gap-3 w-full">
          <Card>
            <div className="px-4 w-full">
              <FormWithLabel
                form={
                  <CardContent>
                    <div className="min-h-[1.3rem]">
                      <p>{data?.judul_lingkup_pemeriksaan || "-"}</p>
                    </div>
                  </CardContent>
                }
                label="Lingkup Pemeriksaan"
                widthLabel={"w-2/5"}
                widthForm={"w-3/5"}
              />
              <FormWithLabel
                form={
                  <CardContent>
                    <div className="min-h-[1.3rem]">
                      <p>
                        {data?.risk
                          ? `${data?.risk?.abbr} - ${data?.risk?.nama}`
                          : "-"}
                      </p>
                    </div>
                  </CardContent>
                }
                label="Risk Issue"
                widthLabel={"w-2/5"}
                widthForm={"w-3/5"}
              />
              <FormWithLabel
                form={
                  <CardContent>
                    <div className="min-h-[1.3rem]">
                      <p>
                        {data?.risk
                          ? `${data?.control?.abbr} - ${data?.control?.nama}`
                          : "-"}
                      </p>
                    </div>
                  </CardContent>
                }
                label="Control"
                widthLabel={"w-2/5"}
                widthForm={"w-3/5"}
              />
              <FormWithLabel
                form={
                  <CustomSelect
                    optionValue={dataPIC}
                    selectedValue={
                      data?.pn_pic
                        ? {
                            label: data?.nama_pic,
                            value: { pn: data?.pn_pic, name: data?.nama_pic },
                          }
                        : null
                    }
                    customIcon={
                      <ButtonIcon
                        icon={<IconClose />}
                        handleClick={handleResetPIC}
                      />
                    }
                    handleChange={(e) => handleChangeSelectPIC(e.value)}
                    placeholder={"Pilih P.I.C"}
                  />
                }
                errors={validation?.pn_pic}
                label="Auditor"
                widthLabel={"w-2/5"}
                widthForm={"w-3/5"}
              />
              <FormWithLabel
                form={
                  <div className="flex gap-4">
                    <Link
                      href={`${pathName}/${selectedId}`}
                      className="underline"
                    >
                      {shortenWord(data?.uraian, 0, 30)}
                    </Link>
                    <ButtonIcon
                      handleClick={handleClickEditUraian}
                      icon={<ButtonEdit />}
                    />
                  </div>
                }
                errors={validation?.pn_pic}
                label="Uraian"
                widthLabel={"w-2/5"}
                widthForm={"w-3/5"}
              />
            </div>
          </Card>
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalEditControl;
