import {
  ButtonField,
  Card,
  DatepickerStartEnd,
  DivButton,
  Modal,
  TextAreaField,
  TextInput,
  TextInputDecimal,
} from "@/components/atoms";
import { useState, useEffect } from "react";
import {
  confirmationSwal,
  errorSwal,
  loadingSwal,
  useDeleteData,
} from "@/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  ModalHeader,
  ModalFooter,
  ContentSampleCSV,
  ContentSampleFile,
} from "./modal/sample-risk";
import {
  FormWithLabel,
  TeknikSamplingSelect,
} from "@/components/molecules/commons";
import {
  setPayloadSample,
  setDataTables,
  setPayloadUploadSample,
  resetPayloadUploadSample,
} from "@/slices/ewp/konvensional/mapa/planningAnalysisMapaEWPSlice";
import { SubModalPickDataCSV } from "./modal/sample-risk/sample-csv";
import {
  usePlanningAnalysisEWP,
  useSamplePoolMapaEWP,
  useSampleUploadMapaEWP,
} from "@/data/ewp/konvensional/mapa/analisis-perencanaan";
import { useRouter } from "next/router";

const ModalAddSampleRisk = ({
  headerTextRiskIssue,
  showModal,
  setShowModal,
  mutate,
  selectedRiskIssue,
}) => {
  const { id } = useRouter().query;
  const classNavbar = `font-semibold text-base z-10 flex justify-center pb-1`;
  const classNavbarActive = `border-b-[5px] border-atlasian-blue-light text-atlasian-blue-light`;
  const dispatch = useDispatch();

  const [currentModalStage, setCurrentModalStage] = useState(1);
  const [currentSubModalStage, setCurrentSubModalStage] = useState(1);
  const [isPickDataModal, setIsPickDataModal] = useState(false);
  const [isSelectedSamplePool, setIsSelectedSamplePool] = useState(false);
  const [selectedSamplePoolId, setSelectedSamplePoolId] = useState(0);
  const [selectedDeleteSample, setSelectedDeleteSample] = useState([]);
  const [typeSamplePool, setTypeSamplePool] = useState("sample_csv"); // default csv

  const dataTables = useSelector(
    (state) => state.planningAnalysisMapaEWP.dataTables
  );
  const payloadSample = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadSample
  );
  const payloadUploadSample = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadUploadSample
  );

  const { sampleUploadMapaEWP, sampleUploadMapaEWPMutate } =
    useSampleUploadMapaEWP({
      mapa_uker_mcr_id: selectedRiskIssue,
    });

  const { samplePoolMapaEWP, samplePoolMapaEWPMutate } = useSamplePoolMapaEWP(
    typeSamplePool,
    {
      id,
      mapa_uker_mcr_id: selectedRiskIssue,
    }
  );

  const {
    planningAnalysisEWP,
    planningAnalysisEWPError,
    planningAnalysisEWPMutate,
  } = usePlanningAnalysisEWP("risk_issue_detail", {
    risk_id: selectedRiskIssue,
  });

  useEffect(() => {
    const response = planningAnalysisEWP?.data;
    if (!planningAnalysisEWPError) {
      dispatch(
        setPayloadSample({
          sample_sumber_info: response?.sample_sumber_info || "",
          sample_jumlah_populasi: response?.sample_jumlah_populasi || "",
          sample_jumlah_sample: response?.sample_jumlah_sample || "",
          sample_periode_start: response?.sample_periode_start || "",
          sample_periode_end: response?.sample_periode_end || "",
          sample_uraian: response?.sample_uraian || "",
          sample_ref_teknik_sampling_kode:
            response?.sample_ref_teknik_sampling_kode || "",
          sample_ref_teknik_sampling_name:
            response?.sample_ref_teknik_sampling_name || "",
        })
      );
    }
  }, [planningAnalysisEWP?.data]);

  useEffect(() => {
    let type;
    switch (currentModalStage) {
      case 1:
        type = "sample_csv";
        break;
      case 2:
        type = "sample_file";
        break;
      case 3:
        type = "sample_frd";
        break;
      case 4:
        type = "sample_monber";
        break;
    }
    setTypeSamplePool(type);
  }, [currentModalStage]);

  useEffect(() => {
    const calculateTotalJumlahSample = () => {
      let total = 0;
      if (sampleUploadMapaEWP?.data) {
        const keys = Object.keys(sampleUploadMapaEWP.data);

        keys.forEach((key) => {
          if (sampleUploadMapaEWP.data[key]) {
            sampleUploadMapaEWP.data[key].forEach((item) => {
              if (item?.jumlah_sample) {
                total += item.jumlah_sample;
              }
            });
          }
        });
      }

      return total;
    };

    handleChange("sample_jumlah_sample", calculateTotalJumlahSample());
  }, [sampleUploadMapaEWP]);

  const handleChange = (property, value) => {
    const updatedData = {
      ...payloadSample,
      [property]: value,
    };
    dispatch(setPayloadSample(updatedData));
  };

  const handleChangeTehnikSampling = (e) => {
    const updatedData = {
      ...payloadSample,
      sample_ref_teknik_sampling_kode: e.value,
      sample_ref_teknik_sampling_name: e.label,
    };
    dispatch(setPayloadSample(updatedData));
  };

  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setCurrentModalStage(1);
    setShowModal(false);
    setIsPickDataModal(false);
    setIsSelectedSamplePool(false);
    dispatch(resetPayloadUploadSample());
  };

  // Untuk delete sample
  const handleDeleteSample = async () => {
    if (!selectedDeleteSample.length) {
      await errorSwal("Silahkan pilih data yang ingin dihapus");
      return;
    }

    const confirm = await confirmationSwal(
      "Apakah Anda yakin untuk mengahapus data ini?"
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();

    let url;
    switch (currentModalStage) {
      case 1:
        url = `sample_csv`;
        break;
      case 2:
        url = `sample_file`;
        break;
    }
    await useDeleteData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/${selectedRiskIssue}/${url}`,
      selectedDeleteSample
    );

    loadingSwal("close");
    sampleUploadMapaEWPMutate();
  };

  // Untuk hapus sample pool
  const handleClickDeleteSamplePool = async (samplePoolId) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin untuk mengahapus sample data ini?"
    );

    if (!confirm.value) {
      return;
    }

    let type;
    switch (currentModalStage) {
      case 1:
        type = "sample_csv";
        break;
      case 2:
        type = "sample_file";
        break;
    }

    loadingSwal();
    await useDeleteData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${samplePoolId}/${type}/pool`
    );
    samplePoolMapaEWPMutate();
    loadingSwal("close");
  };

  // Untuk pilih sample data dengan komponen checkbox yang akan di hapus
  const handleSelectedSample = (isChecked, sampleId) => {
    if (isChecked) {
      const findId = selectedDeleteSample.some(
        (objek) => objek.objek_sample_id === sampleId
      );
      if (!findId) {
        setSelectedDeleteSample((prevState) => [
          ...prevState,
          { objek_sample_id: sampleId },
        ]);
      }
    } else {
      setSelectedDeleteSample((prevState) =>
        prevState.filter((objek) => objek.objek_sample_id !== sampleId)
      );
    }
  };

  // Untuk custom agar bisa menyisipkan data kedalam state yang di klik pada DynamicTable
  const extendRows = (rows, onClick) => {
    return rows.map((row, index) => ({
      ...row,
      onClick: (e) => onClick(e, row?.cells[0]?.content, index),
    }));
  };

  // Untuk pilih sample data yang ada di DynamicTable yang mana samplenya akan di upload
  const handleRowClick = (e, key, index) => {
    const updateDataTables = [...dataTables.tableSelectedRows];
    const updatePayloadSample = [...payloadUploadSample.values];
    const existingIndex = updateDataTables.findIndex((item) => {
      return item === index;
    });

    if (existingIndex > -1) {
      updatePayloadSample.splice(existingIndex, 1);
      updateDataTables.splice(existingIndex, 1);
    } else {
      updatePayloadSample.push(key);
      updateDataTables.push(index);
    }

    dispatch(
      setDataTables({ ...dataTables, tableSelectedRows: updateDataTables })
    );
    dispatch(
      setPayloadUploadSample({
        ...payloadUploadSample,
        values: updatePayloadSample,
      })
    );
  };

  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          headerText={"Tambah Sample Risk"}
          handleCloseModal={handleCloseModal}
          showModal={showModal}
        />
      }
      footer={
        <ModalFooter
          isPickDataModal={isPickDataModal}
          setIsPickDataModal={setIsPickDataModal}
          isSelectedSamplePool={isSelectedSamplePool}
          setIsSelectedSamplePool={setIsSelectedSamplePool}
          currentModalStage={currentModalStage}
          setCurrentModalStage={setCurrentModalStage}
          currentSubModalStage={currentSubModalStage}
          setCurrentSubModalStage={setCurrentSubModalStage}
          selectedRiskIssue={selectedRiskIssue}
          mutate={mutate}
          setShowModal={setShowModal}
          sampleMutate={sampleUploadMapaEWPMutate}
          sampleInfoMutate={planningAnalysisEWPMutate}
          typeSamplePool={typeSamplePool}
        />
      }
      withoutFooter={
        (!isSelectedSamplePool && currentSubModalStage === 1) ||
        (isSelectedSamplePool && currentSubModalStage === 1)
          ? false
          : true
      }
    >
      <div className="w-[75rem]">
        {isPickDataModal ? (
          <SubModalPickDataCSV
            selectedRiskIssue={selectedRiskIssue}
            currentSubModalStage={currentSubModalStage}
            currentModalStage={currentModalStage}
            setCurrentSubModalStage={setCurrentSubModalStage}
            setIsPickDataModal={setIsPickDataModal}
            isSelectedSamplePool={isSelectedSamplePool}
            setIsSelectedSamplePool={setIsSelectedSamplePool}
            selectedSamplePoolId={selectedSamplePoolId}
            setSelectedSamplePoolId={setSelectedSamplePoolId}
            samplePoolData={samplePoolMapaEWP?.data}
            handleClickDeleteSamplePool={handleClickDeleteSamplePool}
            handleRowClick={handleRowClick}
            extendRows={extendRows}
          />
        ) : (
          <div className="px-3 py-1 flex gap-3">
            <div className="w-[45%]">
              <div>
                <Card>
                  <div className="px-6 w-full">
                    <div className="mb-4 text-base font-semibold text-atlasian-blue-light">
                      {headerTextRiskIssue}
                    </div>
                    <FormWithLabel
                      form={
                        <TextInput
                          placeholder="Sumber Informasi"
                          onChange={(e) =>
                            handleChange("sample_sumber_info", e.target.value)
                          }
                          value={payloadSample?.sample_sumber_info}
                        />
                      }
                      label="Sumber Informasi"
                      widthLabel={"w-2/5"}
                      widthForm={"w-3/5"}
                    />
                    <FormWithLabel
                      form={
                        <TextInputDecimal
                          placeholder="Jumlah Populasi"
                          onChange={(value) =>
                            handleChange("sample_jumlah_populasi", value)
                          }
                          value={payloadSample.sample_jumlah_populasi}
                        />
                      }
                      label="Jumlah Populasi"
                      widthLabel={"w-2/5"}
                      widthForm={"w-3/5"}
                    />
                    <FormWithLabel
                      form={
                        <DatepickerStartEnd
                          placeholderStart="Tanggal"
                          placeholderEnd="Tanggal"
                          handlerChangeStart={(e) =>
                            handleChange("sample_periode_start", e)
                          }
                          handlerChangeEnd={(e) =>
                            handleChange("sample_periode_end", e)
                          }
                          valueStart={payloadSample?.sample_periode_start}
                          valueEnd={payloadSample?.sample_periode_end}
                          pastDate={true}
                          format={"DD/MM/YYYY"}
                        />
                      }
                      label="Periode"
                      widthLabel={"w-2/5"}
                      widthForm={"w-3/5"}
                      labelPositionTop={true}
                    />
                    <FormWithLabel
                      form={
                        <TextInput
                          isDisabled={true}
                          value={payloadSample.sample_jumlah_sample}
                        />
                      }
                      label="Jumlah Sample"
                      widthLabel={"w-2/5"}
                      widthForm={"w-3/5"}
                    />
                    <FormWithLabel
                      form={
                        <TeknikSamplingSelect
                          handleChange={(e) => handleChangeTehnikSampling(e)}
                          selectedValue={{
                            label:
                              payloadSample.sample_ref_teknik_sampling_name,
                            value:
                              payloadSample.sample_ref_teknik_sampling_name,
                          }}
                          placeholder={"Tehnik Sampling"}
                        />
                      }
                      label="Tehnik Sampling"
                      widthLabel={"w-2/5"}
                      widthForm={"w-3/5"}
                    />
                    <FormWithLabel
                      form={
                        <TextAreaField
                          placeholder="Uraian Sample.."
                          resize="auto"
                          handleChange={(e) =>
                            handleChange("sample_uraian", e.target.value)
                          }
                          value={payloadSample?.sample_uraian}
                        />
                      }
                      label="Uraian Sample"
                      widthLabel={"w-2/5"}
                      widthForm={"w-3/5"}
                      labelPositionTop={true}
                    />
                  </div>
                </Card>
              </div>
            </div>
            <div className="w-[55%]">
              <Card>
                <div className="grid grid-cols-4 gap-10">
                  <DivButton
                    className={`${classNavbar} ${
                      currentModalStage === 1 && classNavbarActive
                    }`}
                    handleClick={() => setCurrentModalStage(1)}
                  >
                    Sample CSV
                  </DivButton>
                  <DivButton
                    className={`${classNavbar} ${
                      currentModalStage === 2 && classNavbarActive
                    }`}
                    handleClick={() => setCurrentModalStage(2)}
                  >
                    Sample File
                  </DivButton>
                  <DivButton
                    className={`${classNavbar} ${
                      currentModalStage === 3 && classNavbarActive
                    }`}
                    handleClick={() => setCurrentModalStage(3)}
                  >
                    Sample FRD
                  </DivButton>
                  <DivButton
                    className={`${classNavbar} ${
                      currentModalStage === 4 && classNavbarActive
                    }`}
                    handleClick={() => setCurrentModalStage(4)}
                  >
                    Sample Monber
                  </DivButton>
                </div>
                <div className="-mt-0.5 border-t border-[#00000040] border-t-opacity-100 w-full"></div>
                {currentModalStage === 1 ? (
                  <ContentSampleCSV
                    data={sampleUploadMapaEWP?.data?.csv}
                    setCurrentModalStage={setCurrentModalStage}
                    handleSelectedSample={handleSelectedSample}
                  />
                ) : currentModalStage === 2 ? (
                  <ContentSampleFile
                    data={sampleUploadMapaEWP?.data?.file}
                    setCurrentModalStage={setCurrentModalStage}
                    handleSelectedSample={handleSelectedSample}
                  />
                ) : currentModalStage === 3 ? (
                  // <ContentSampleCSV
                  //   data={sampleUploadMapaEWP?.data?.csv}
                  //   setCurrentModalStage={setCurrentModalStage}
                  //   mutate={sampleUploadMapaEWPMutate}
                  // />
                  <div>test 3</div>
                ) : (
                  currentModalStage === 4 && (
                    // <ContentSampleCSV
                    //   data={sampleUploadMapaEWP?.data?.csv}
                    //   setCurrentModalStage={setCurrentModalStage}
                    //   mutate={sampleUploadMapaEWPMutate}
                    // />

                    <div>test 4</div>
                  )
                )}
                <div className="px-4 pb-2 flex justify-between w-full">
                  <div className="w-[7.5rem] bg-atlasian-blue-light rounded">
                    <ButtonField
                      text="Pilih Data"
                      handler={() => setIsPickDataModal(true)}
                    />
                  </div>
                  <div className="w-[7.5rem] bg-atlasian-red rounded">
                    <ButtonField text="Hapus" handler={handleDeleteSample} />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalAddSampleRisk;
