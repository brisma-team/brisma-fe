import {
  ButtonField,
  ButtonIcon,
  Card,
  DatepickerStartEnd,
  ErrorValidation,
  ModalScroll,
  TextAreaField,
  TextInput,
} from "@/components/atoms";
import { IconClose, IconPlus } from "@/components/icons";
import {
  MeetingTypeSelect,
  ModalHeader,
  PekerjaSelect,
} from "@/components/molecules/commons";
import { addDaysToDate, dateNow } from "@/helpers";

const CardBody = ({ title, titleColor, isScrollY, height, children }) => {
  return (
    <div
      className={`px-0.5 py-0.5 ${
        isScrollY ? `overflow-y-scroll ${height}` : height || "h-fit"
      }`}
    >
      <Card>
        <div className={`w-full h-full py-2 px-4 flex flex-col gap-3`}>
          <p className={`font-semibold text-sm ${titleColor}`}>{title}</p>
          {children}
        </div>
      </Card>
    </div>
  );
};

const ModalAddMeeting = ({
  showModal,
  data,
  validation,
  handleChangeText,
  handleChangeSelect,
  handleReset,
  handleSubmit,
  handleClickAddPIC,
  handleClickAddPembicara,
  handleClickDeletePIC,
  handleClickDeletePembicara,
  handleCloseModal,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          headerText={"Buat Meeting EWP Kegiatan Konsulting"}
          showModal={showModal}
          width={"w-[58rem]"}
          handleCloseModal={handleCloseModal}
        />
      }
    >
      <div className="w-[58rem] p-4 flex flex-col gap-4">
        <Card>
          <div className="px-4 py-2 w-full flex flex-col gap-4">
            <div>
              <TextInput
                placeholder="Ketik Judul Meeting"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("judul_meeting")}
                    icon={<IconClose />}
                  />
                }
                onChange={(e) =>
                  handleChangeText("judul_meeting", e.target.value)
                }
                value={data?.judul_meeting}
              />
              {validation?.judul_meeting ? (
                <ErrorValidation
                  message={validation?.judul_meeting}
                  className={"ml-1 mt-10"}
                />
              ) : (
                ""
              )}
            </div>
            <div className="flex gap-4">
              <div className="w-1/3">
                <CardBody title={"PIC"} titleColor={"text-atlasian-blue-light"}>
                  {data?.pic_meeting?.length
                    ? data?.pic_meeting?.map((v, i) => {
                        return (
                          <PekerjaSelect
                            key={i}
                            customIcon={
                              <ButtonIcon
                                handleClick={() => handleClickDeletePIC(i)}
                                icon={<IconClose />}
                              />
                            }
                            handleChange={(e) =>
                              handleChangeSelect("pic_meeting", i, {
                                pn: e?.value?.pn,
                                nama: e?.value?.name,
                                jabatan: e?.value?.jabatan,
                              })
                            }
                            placeholder={"P.I.C"}
                            selectedValue={
                              v?.pn ? { label: v?.nama, value: v } : null
                            }
                          />
                        );
                      })
                    : ""}
                  {validation?.pic_meeting ? (
                    <ErrorValidation
                      message={validation?.pic_meeting}
                      className={"ml-1"}
                    />
                  ) : (
                    ""
                  )}
                  <div className="w-full flex justify-end">
                    <div className="w-48 text-sm font-semibold p-2 my-1">
                      <ButtonField
                        iconAfter={
                          <div className="text-atlasian-purple">
                            <IconPlus size="medium" />
                          </div>
                        }
                        text={"Tambah P.I.C"}
                        textColor={"purple"}
                        handler={handleClickAddPIC}
                      />
                    </div>
                  </div>
                </CardBody>
              </div>
              <div className="w-1/3">
                <CardBody title={"Pembicara"} titleColor={"text-atlasian-red"}>
                  {data?.pembicara_meeting?.length
                    ? data?.pembicara_meeting?.map((v, i) => {
                        return (
                          <PekerjaSelect
                            key={i}
                            customIcon={
                              <ButtonIcon
                                handleClick={() =>
                                  handleClickDeletePembicara(i)
                                }
                                icon={<IconClose />}
                              />
                            }
                            handleChange={(e) =>
                              handleChangeSelect("pembicara_meeting", i, {
                                pn: e?.value?.pn,
                                nama: e?.value?.name,
                                jabatan: e?.value?.jabatan,
                              })
                            }
                            placeholder={"Pembicara"}
                            selectedValue={
                              v?.pn ? { label: v?.nama, value: v } : null
                            }
                          />
                        );
                      })
                    : ""}
                  {validation?.pembicara_meeting ? (
                    <ErrorValidation
                      message={validation?.pembicara_meeting}
                      className={"ml-1"}
                    />
                  ) : (
                    ""
                  )}
                  <div className="w-full flex justify-end">
                    <div className="w-48 text-sm font-semibold p-2 my-1">
                      <ButtonField
                        iconAfter={
                          <div className="text-atlasian-purple">
                            <IconPlus size="medium" />
                          </div>
                        }
                        text={"Tambah Pembicara"}
                        textColor={"purple"}
                        handler={handleClickAddPembicara}
                      />
                    </div>
                  </div>
                </CardBody>
              </div>
              <div className="flex flex-col gap-4 w-1/3">
                <CardBody
                  title={"Metode Meeting"}
                  titleColor={"text-atlasian-purple"}
                >
                  <MeetingTypeSelect
                    handleChange={(e) =>
                      handleChangeText("metode_meeting", e?.value)
                    }
                    customIcon={
                      <ButtonIcon
                        handleClick={() => handleReset("metode_meeting")}
                        icon={<IconClose />}
                      />
                    }
                    placeholder={"Metode Meeting"}
                    selectedValue={
                      data?.metode_meeting?.kode
                        ? {
                            label: data?.metode_meeting?.nama,
                            value: data?.metode_meeting,
                          }
                        : null
                    }
                  />
                  {validation["metode_meeting.kode"] ? (
                    <ErrorValidation
                      message={validation["metode_meeting.kode"]}
                      className={"ml-1"}
                    />
                  ) : (
                    ""
                  )}
                </CardBody>
                <CardBody
                  title={"Periode Meeting"}
                  titleColor={"text-atlasian-yellow"}
                >
                  <DatepickerStartEnd
                    valueStart={data?.periode_start}
                    valueEnd={data?.periode_end}
                    handlerChangeStart={(value) =>
                      handleChangeText("periode_start", value)
                    }
                    handlerChangeEnd={(value) =>
                      handleChangeText("periode_end", value)
                    }
                    placeholderStart="Mulai"
                    placeholderEnd="Selesai"
                    format={"DD/MM/YYYY"}
                    minDateStart={dateNow()}
                    maxDateStart={
                      addDaysToDate(data?.periode_end, "-", 1) || null
                    }
                    minDateEnd={
                      addDaysToDate(data?.periode_start, "+", 1) ||
                      addDaysToDate(dateNow(), "+", 1) ||
                      null
                    }
                    validationStart={validation?.periode_start}
                    validationEnd={validation?.periode_end}
                  />
                </CardBody>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="px-4 py-2 flex gap-4 w-full">
            <div className="w-2/3">
              <TextAreaField
                handleChange={(e) => handleChangeText("desc", e?.target?.value)}
                value={data?.desc}
                placeholder={"Deskripsi Meeting"}
                className={"min-h-[10rem]"}
              />
            </div>
            <div className="w-1/3">
              <CardBody
                title={"Link Meeting (optional)"}
                titleColor={"text-atlasian-blue-light"}
              >
                <TextInput
                  placeholder="Masukkan Link"
                  icon={
                    <ButtonIcon
                      handleClick={() => handleReset("link_meeting")}
                      icon={<IconClose />}
                    />
                  }
                  onChange={(e) =>
                    handleChangeText("link_meeting", e.target.value)
                  }
                  value={data?.link_meeting}
                />
              </CardBody>
            </div>
          </div>
        </Card>
        <div className="w-full flex justify-end items-center">
          <div className="w-40 bg-atlasian-green rounded flex items-center">
            <ButtonField
              text={"Selesai"}
              handler={handleSubmit}
              name="BUAT MEETING"
            />
          </div>
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalAddMeeting;
