import {
  ButtonField,
  Card,
  DatepickerStartEnd,
  DivButton,
  Modal,
  Select,
  TextAreaField,
  TextInput,
} from "@/components/atoms";
import { useState } from "react";
import { confirmationSwal } from "@/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  ModalHeader,
  ModalFooter,
  ContentSampleCSV,
} from "./modal/sample-risk";
import { FormWithLabel } from "@/components/molecules/commons";
import { setPayloadSample } from "@/slices/ewp/konvensional/mapa/planningAnalysisMapaEWPSlice";
import { SubModalPickDataCSV } from "./modal/sample-risk/sample-csv";
import { useSampleUploadMapaEWP } from "@/data/ewp/konvensional/mapa/analisis-perencanaan";
import { useEffect } from "react";

const ModalAddSampleRisk = ({
  showModal,
  setShowModal,
  mutate,
  selectedRiskIssue,
}) => {
  const classNavbar = `font-semibold text-base z-10 flex justify-center pb-1`;
  const classNavbarActive = `border-b-[5px] border-atlasian-blue-light text-atlasian-blue-light`;
  const dispatch = useDispatch();

  const [currentModalStage, setCurrentModalStage] = useState(1);
  const [currentSubModalStage, setCurrentSubModalStage] = useState(1);
  const [isPickDataModal, setIsPickDataModal] = useState(false);
  const [isSelectedSamplePool, setIsSelectedSamplePool] = useState(false);
  const payloadSample = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadSample
  );

  const { sampleUploadMapaEWP, sampleUploadMapaEWPMutate } =
    useSampleUploadMapaEWP({
      mapa_uker_mcr_id: selectedRiskIssue,
    });

  useEffect(() => {
    console.log("payloadSample => ", payloadSample);
  }, [payloadSample]);

  const handleChange = (property, value) => {
    const updatedData = {
      ...payloadSample,
      [property]: value,
    };
    dispatch(setPayloadSample(updatedData));
  };

  const handleChangeTehnikSampling = (value) => {
    console.log("e => ", value);
    const updatedData = {
      ...payloadSample,
      sample_ref_teknik_sampling_kode: value.kode,
      sample_ref_teknik_sampling_name: value.nama,
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
  };

  const optionValue = [{ label: "Test", value: { kode: "1", nama: "Test" } }];

  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          headerText={"Tambah Sample Risk"}
          handleCloseModal={handleCloseModal}
        />
      }
      footer={
        <ModalFooter
          isPickDataModal={isPickDataModal}
          setIsPickDataModal={setIsPickDataModal}
          isSelectedSamplePool={isSelectedSamplePool}
          setCurrentModalStage={setCurrentModalStage}
          currentSubModalStage={currentSubModalStage}
          setCurrentSubModalStage={setCurrentSubModalStage}
          selectedRiskIssue={selectedRiskIssue}
          mutate={mutate}
          setShowModal={setShowModal}
          sampleMutate={sampleUploadMapaEWPMutate}
        />
      }
    >
      <div className="w-[67rem]">
        {isPickDataModal ? (
          <SubModalPickDataCSV
            currentSubModalStage={currentSubModalStage}
            setCurrentSubModalStage={setCurrentSubModalStage}
            setIsPickDataModal={setIsPickDataModal}
            isSelectedSamplePool={isSelectedSamplePool}
            setIsSelectedSamplePool={setIsSelectedSamplePool}
            selectedRiskIssue={selectedRiskIssue}
          />
        ) : (
          <div className="px-3 py-1 flex gap-3">
            <div className="w-2/5">
              <Card>
                <div className="px-6 w-full">
                  <div className="mb-4 text-base font-semibold text-atlasian-blue-light">
                    Likuidutas
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
                      <TextInput
                        placeholder="Jumlah Populasi"
                        isDisabled={true}
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
                      // isDisabled={true}
                      // onChange={(e) =>
                      //   handleChange("sample_jumlah_sample", e.target.value)
                      // }
                      // value={payloadSample.sample_jumlah_sample}
                      />
                    }
                    label="Jumlah Sample"
                    widthLabel={"w-2/5"}
                    widthForm={"w-3/5"}
                  />
                  <FormWithLabel
                    form={
                      <Select
                        optionValue={optionValue}
                        placeholder="Tehnik Sampling"
                        onChange={(e) => handleChangeTehnikSampling(e.value)}
                        value={{
                          label: payloadSample.sample_ref_teknik_sampling_name,
                          value: {
                            kode: payloadSample.sample_ref_teknik_sampling_kode,
                            name: payloadSample.sample_ref_teknik_sampling_name,
                          },
                        }}
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
            <div className="w-3/5">
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
                <ContentSampleCSV
                  data={sampleUploadMapaEWP?.data?.csv}
                  setCurrentModalStage={setCurrentModalStage}
                  mutate={sampleUploadMapaEWPMutate}
                />
                <div className="px-4 flex justify-between w-full">
                  <div className="w-[7.5rem] bg-atlasian-blue-light rounded">
                    <ButtonField
                      text="Pilih Data"
                      handler={() => setIsPickDataModal(true)}
                    />
                  </div>
                  <div className="w-[7.5rem] bg-atlasian-red rounded">
                    <ButtonField text="Hapus" />
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
