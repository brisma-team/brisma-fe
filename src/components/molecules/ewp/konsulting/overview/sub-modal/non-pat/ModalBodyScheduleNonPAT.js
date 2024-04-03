import { useEffect } from "react";
import { FormWithLabel } from "@/components/molecules/commons";
import {
  ButtonIcon,
  DatepickerField,
  DatepickerStartEnd,
  ErrorValidation,
  Select,
  TextInput,
  UploadButton,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { useState } from "react";
import { useJenis, useMetode, useTema, useTipe } from "@/data/reference";
import {
  addDaysToDate,
  dateNow,
  loadingSwal,
  usePostFileData,
} from "@/helpers";
import CardContent from "../../CardContent";
import Link from "next/link";

const ModalBodyScheduleNonPAT = ({
  data,
  validationErrors,
  setCurrentModalStage,
  isDisabled,
  handleChangeText,
  handleChangeSelect,
  handleUpload,
}) => {
  const [selectedMetode, setSelectedMetode] = useState(null);
  const [selectedTipe, setSelectedTipe] = useState(null);
  const [selectedJenis, setSelectedJenis] = useState(null);

  const { metode } = useMetode("all", 2);
  const { tipe } = useTipe("all", selectedMetode);
  const { jenis } = useJenis("all", selectedTipe);
  const { tema } = useTema("all", selectedJenis);

  const [optionMetode, setOptionMetode] = useState([]);
  const [optionTipe, setOptionTipe] = useState([]);
  const [optionJenis, setOptionJenis] = useState([]);
  const [optionTema, setOptionTema] = useState([]);

  useEffect(() => {
    const mappingMetode = metode?.data?.map((v) => ({
      label: v.nama,
      value: { kode: v.kode, nama: v.nama },
    }));
    setOptionMetode(mappingMetode);

    if (tipe) {
      const mappingTipe = tipe.data?.map((v) => ({
        label: v.nama,
        value: { kode: v.kode, nama: v.nama },
      }));
      setOptionTipe(mappingTipe);
    }

    if (jenis) {
      const mappingJenis = jenis.data?.map((v) => ({
        label: v.nama,
        value: { kode: v.kode, nama: v.nama },
      }));
      setOptionJenis(mappingJenis);
    }

    if (tema) {
      const mappingTema = tema.data?.map((v) => ({
        label: v.nama,
        value: { kode: v.kode, nama: v.nama },
      }));
      setOptionTema(mappingTema);
    }
  }, [metode, tipe, jenis, tema]);

  useEffect(() => {
    setCurrentModalStage(2);
  }, []);

  const handleChangeRef = (property, value) => {
    handleChangeSelect(property, value);
    switch (property) {
      case "ref_metode":
        setSelectedMetode(value.kode);
        break;
      case "ref_tipe":
        setSelectedTipe(value.kode);
        break;
      case "ref_jenis":
        setSelectedJenis(value.kode);
        break;
    }
  };

  const handleUploadFile = async (e) => {
    loadingSwal();
    const files = e?.target?.files;
    if (files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;

      const response = await usePostFileData(
        url,
        {
          file: files[0],
          modul: "ewp",
        },
        true
      );

      handleUpload({ url: response.url[0], fileName: files[0].name });
    }
    loadingSwal("close");
  };

  return (
    <div className="w-[61rem] pb-4">
      <CardContent>
        <div className="p-2">
          <TextInput
            icon={
              <ButtonIcon
                handleClick={() => handleChangeText("project_name", "")}
                icon={<IconClose size="medium" />}
              />
            }
            className={"font-bold text-xl rounded text-brisma"}
            style={{ fontSize: "1.25rem" }}
            onChange={(e) => handleChangeText("project_name", e.target.value)}
            value={data.project_name}
            placeholder={"Masukkan Nama Project"}
          />
          {validationErrors && validationErrors["project_name"] ? (
            <ErrorValidation
              message={validationErrors["project_name"]}
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
                      <Select
                        optionValue={optionMetode}
                        isSearchable={false}
                        onChange={(e) => handleChangeRef("ref_metode", e.value)}
                        value={
                          data?.ref_metode?.nama
                            ? {
                                label: data?.ref_metode?.nama,
                                value: data?.ref_metode?.kode,
                              }
                            : null
                        }
                        isDisabled={isDisabled}
                        placeholder="Metode Audit"
                      />
                    }
                    label="Metode Audit*"
                    widthLabel={"w-3/12"}
                    widthForm={"w-9/12"}
                    errors={
                      validationErrors && validationErrors["ref_metode.kode"]
                    }
                  />
                  <FormWithLabel
                    form={
                      <Select
                        optionValue={optionTipe}
                        isSearchable={false}
                        onChange={(e) => handleChangeRef("ref_tipe", e.value)}
                        value={
                          data?.ref_tipe?.nama
                            ? {
                                label: data?.ref_tipe?.nama,
                                value: data?.ref_tipe?.kode,
                              }
                            : null
                        }
                        isDisabled={isDisabled}
                        placeholder="Tipe Audit"
                      />
                    }
                    label="Tipe Audit*"
                    widthLabel={"w-3/12"}
                    widthForm={"w-9/12"}
                    errors={
                      validationErrors && validationErrors["ref_tipe.kode"]
                    }
                  />
                  <FormWithLabel
                    form={
                      <Select
                        optionValue={optionJenis}
                        isSearchable={false}
                        onChange={(e) => handleChangeRef("ref_jenis", e.value)}
                        value={
                          data.ref_jenis?.nama
                            ? {
                                label: data.ref_jenis?.nama,
                                value: data.ref_jenis?.kode,
                              }
                            : ""
                        }
                        isDisabled={isDisabled}
                        placeholder="Jenis Audit"
                      />
                    }
                    label="Jenis Audit*"
                    widthLabel={"w-3/12"}
                    widthForm={"w-9/12"}
                    errors={
                      validationErrors && validationErrors["ref_jenis.kode"]
                    }
                  />
                  <FormWithLabel
                    form={
                      <Select
                        optionValue={optionTema}
                        isSearchable={false}
                        onChange={(e) => handleChangeRef("ref_tema", e.value)}
                        value={
                          data.ref_tema?.nama
                            ? {
                                label: data.ref_tema?.nama,
                                value: data.ref_tema?.kode,
                              }
                            : ""
                        }
                        isDisabled={isDisabled}
                        placeholder="Tema Audit"
                      />
                    }
                    label="Tema Audit"
                    widthLabel={"w-3/12"}
                    widthForm={"w-9/12"}
                  />
                  <FormWithLabel
                    form={
                      <DatepickerStartEnd
                        valueStart={data.info_periode_pelaksanaan_start}
                        valueEnd={data.info_periode_pelaksanaan_end}
                        handlerChangeStart={(e) =>
                          handleChangeText("info_periode_pelaksanaan_start", e)
                        }
                        handlerChangeEnd={(e) =>
                          handleChangeText("info_periode_pelaksanaan_end", e)
                        }
                        placeholderStart="Pilih Tanggal"
                        placeholderEnd="Pilih Tanggal"
                        isDisabled={isDisabled}
                        format={"DD/MM/YYYY"}
                        minDateStart={dateNow()}
                        maxDateStart={
                          addDaysToDate(
                            data?.info_periode_pelaksanaan_end,
                            "-",
                            1
                          ) || null
                        }
                        minDateEnd={
                          addDaysToDate(
                            data?.info_periode_pelaksanaan_start,
                            "+",
                            1
                          ) ||
                          addDaysToDate(dateNow(), "+", 1) ||
                          null
                        }
                        validationStart={
                          validationErrors &&
                          validationErrors["info_periode_pelaksanaan_start"]
                        }
                        validationEnd={
                          validationErrors &&
                          validationErrors["info_periode_pelaksanaan_end"]
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
            <div className="w-1/2">
              <CardContent>
                <div className="px-2">
                  <FormWithLabel
                    form={
                      <TextInput
                        icon={
                          <ButtonIcon
                            handleClick={() => handleChangeText("no_surat", "")}
                            icon={<IconClose size="medium" />}
                          />
                        }
                        onChange={(e) =>
                          handleChangeText("no_surat", e.target.value)
                        }
                        value={data.no_surat}
                        placeholder={"Nomor Surat"}
                        isDisabled={isDisabled}
                      />
                    }
                    label="Nomor Surat*"
                    widthLabel={"w-1/3"}
                    widthForm={"w-2/3"}
                    errors={validationErrors?.no_surat}
                  />
                  <FormWithLabel
                    form={
                      <TextInput
                        icon={
                          <ButtonIcon
                            handleClick={() => handleChangeText("perihal", "")}
                            icon={<IconClose size="medium" />}
                          />
                        }
                        onChange={(e) =>
                          handleChangeText("perihal", e.target.value)
                        }
                        value={data.perihal}
                        placeholder={"Perihal"}
                        isDisabled={isDisabled}
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
                            handleChangeText("tanggal_surat", e)
                          }
                          value={data.tanggal_surat}
                          isDisabled={isDisabled}
                        />
                      </div>
                    }
                    label="Tanggal Surat*"
                    widthLabel={"w-1/3"}
                    widthForm={"w-2/3"}
                    errors={validationErrors?.tanggal_surat}
                  />
                  <FormWithLabel
                    form={
                      <UploadButton
                        text={"Upload"}
                        handleUpload={handleUploadFile}
                      />
                    }
                    label="Lampiran Surat*"
                    widthLabel={"w-1/3"}
                    widthForm={"w-2/3"}
                    errors={validationErrors?.url_file_surat}
                  />
                  <FormWithLabel
                    form={
                      <div className="flex items-center h-full">
                        <Link
                          className="font-medium text-base underline"
                          href={data?.url_file_surat}
                          target="_blank"
                        >
                          {data?.nama_file_surat}
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
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default ModalBodyScheduleNonPAT;
