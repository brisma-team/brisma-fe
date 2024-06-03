import {
  CardContentHeaderFooter,
  FormWithLabel,
  ModalHeader,
  ModalFooter,
} from "@/components/molecules/commons";
import CardContent from "../overview/CardContent";
import {
  ButtonIcon,
  DatepickerField,
  DatepickerStartEnd,
  ErrorValidation,
  ModalScroll,
  TextInput,
  UploadButton,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { addDaysToDate, dateNow } from "@/helpers";
import Link from "next/link";

const ModalEditProject = ({
  showModal,
  payload,
  isPAT,
  validation,
  handleChange,
  handleReset,
  handleUploadSurat,
  handleCloseModal,
  handleSubmit,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          handleCloseModal={handleCloseModal}
          showModal={showModal}
          headerText={"Ubah Proyek"}
          title={
            <p className="text-atlasian-blue-light text-base font-bold">
              Electronic Working Paper Non-Audit Kegiatan
            </p>
          }
          titleClassName={"mt-0"}
        />
      }
      withoutFooter
    >
      <div>
        <div className="w-[61rem] pb-4">
          <CardContentHeaderFooter>
            <div className="p-4">
              <TextInput
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("project_name")}
                    icon={<IconClose size="medium" />}
                  />
                }
                className={"font-bold text-xl rounded text-brisma"}
                style={{ fontSize: "1.25rem" }}
                onChange={(e) => handleChange("project_name", e.target.value)}
                value={payload?.project_name}
                placeholder={"Masukkan Nama Project"}
              />
              {validation && validation["project_name"] ? (
                <ErrorValidation
                  message={validation["project_name"]}
                  className="ml-1 mt-1"
                />
              ) : (
                ""
              )}
              <div className="flex gap-3 mt-3">
                <div className="w-1/2">
                  <CardContent>
                    <div className="px-2">
                      <FormWithLabel
                        form={
                          <CardContent>
                            <div className="min-h-[1.3rem]">
                              <p>{payload?.ref_metode?.nama || "-"}</p>
                            </div>
                          </CardContent>
                        }
                        label="Metode Audit"
                        widthLabel={"w-3/12"}
                        widthForm={"w-9/12"}
                      />
                      <FormWithLabel
                        form={
                          <CardContent>
                            <div className="min-h-[1.3rem]">
                              <p>{payload?.ref_tipe?.nama || "-"}</p>
                            </div>
                          </CardContent>
                        }
                        label="Tipe Audit"
                        widthLabel={"w-3/12"}
                        widthForm={"w-9/12"}
                      />
                      <FormWithLabel
                        form={
                          <CardContent>
                            <div className="min-h-[1.3rem]">
                              <p>{payload?.ref_jenis?.nama || "-"}</p>
                            </div>
                          </CardContent>
                        }
                        label="Jenis Audit"
                        widthLabel={"w-3/12"}
                        widthForm={"w-9/12"}
                      />
                      <FormWithLabel
                        form={
                          <CardContent>
                            <div className="min-h-[1.3rem]">
                              <p>{payload?.ref_tema?.nama || "-"}</p>
                            </div>
                          </CardContent>
                        }
                        label="Tema Audit"
                        widthLabel={"w-3/12"}
                        widthForm={"w-9/12"}
                      />
                      <FormWithLabel
                        form={
                          <DatepickerStartEnd
                            valueStart={payload?.info_periode_pelaksanaan_start}
                            valueEnd={payload?.info_periode_pelaksanaan_end}
                            handlerChangeStart={(value) =>
                              handleChange(
                                "info_periode_pelaksanaan_start",
                                value
                              )
                            }
                            handlerChangeEnd={(value) =>
                              handleChange(
                                "info_periode_pelaksanaan_end",
                                value
                              )
                            }
                            placeholderStart="Pilih Tanggal"
                            placeholderEnd="Pilih Tanggal"
                            format={"DD/MM/YYYY"}
                            minDateStart={dateNow()}
                            maxDateStart={
                              addDaysToDate(
                                payload?.info_periode_pelaksanaan_end,
                                "-",
                                1
                              ) || null
                            }
                            minDateEnd={
                              addDaysToDate(
                                payload?.info_periode_pelaksanaan_start,
                                "+",
                                1
                              ) ||
                              addDaysToDate(dateNow(), "+", 1) ||
                              null
                            }
                            validationStart={
                              validation &&
                              validation["info_periode_pelaksanaan_start"]
                            }
                            validationEnd={
                              validation &&
                              validation["info_periode_pelaksanaan_end"]
                            }
                          />
                        }
                        label="Periode Kegiatan*"
                        widthLabel={"w-3/12"}
                        widthForm={"w-9/12"}
                      />
                    </div>
                  </CardContent>
                </div>
                {!isPAT ? (
                  <div className="w-1/2">
                    <CardContent>
                      <div className="px-2">
                        <FormWithLabel
                          form={
                            <TextInput
                              icon={
                                <ButtonIcon
                                  handleClick={() =>
                                    handleChange("no_surat", "")
                                  }
                                  icon={<IconClose size="medium" />}
                                />
                              }
                              onChange={(e) =>
                                handleChange("no_surat", e.target.value)
                              }
                              value={payload?.no_surat}
                              placeholder={"Nomor Surat"}
                            />
                          }
                          label="Nomor Surat*"
                          widthLabel={"w-1/3"}
                          widthForm={"w-2/3"}
                          errors={validation?.no_surat}
                        />
                        <FormWithLabel
                          form={
                            <TextInput
                              icon={
                                <ButtonIcon
                                  handleClick={() =>
                                    handleChange("perihal", "")
                                  }
                                  icon={<IconClose size="medium" />}
                                />
                              }
                              onChange={(e) =>
                                handleChange("perihal", e.target.value)
                              }
                              value={payload?.perihal}
                              placeholder={"Perihal"}
                            />
                          }
                          label="Perihal"
                          widthLabel={"w-1/3"}
                          widthForm={"w-2/3"}
                        />
                        <FormWithLabel
                          form={
                            <div className="w-36">
                              <DatepickerField
                                placeholder="Tanggal Surat"
                                handleChange={(e) =>
                                  handleChange("tanggal_surat", e)
                                }
                                value={payload?.tanggal_surat}
                              />
                            </div>
                          }
                          label="Tanggal Surat*"
                          widthLabel={"w-1/3"}
                          widthForm={"w-2/3"}
                          errors={validation?.tanggal_surat}
                        />
                        <FormWithLabel
                          form={
                            <UploadButton
                              text={"Upload"}
                              handleUpload={handleUploadSurat}
                            />
                          }
                          label="Lampiran Surat*"
                          widthLabel={"w-1/3"}
                          widthForm={"w-2/3"}
                          errors={validation?.url_file_surat}
                        />
                        <FormWithLabel
                          form={
                            <div className="flex items-center h-full">
                              <Link
                                className="font-medium text-base underline"
                                href={payload?.url_file_surat}
                                target="_blank"
                              >
                                {payload?.nama_file_surat}
                              </Link>
                            </div>
                          }
                          label=""
                          widthLabel={"w-1/3"}
                          widthForm={"w-2/3"}
                        />
                      </div>
                    </CardContent>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </CardContentHeaderFooter>
        </div>
        <ModalFooter handleSubmit={handleSubmit} buttonText={"Simpan"} />
      </div>
    </ModalScroll>
  );
};

export default ModalEditProject;
