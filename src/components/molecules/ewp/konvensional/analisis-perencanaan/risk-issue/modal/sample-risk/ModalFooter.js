import { ButtonField, UploadButton } from "@/components/atoms";
import {
  errorSwal,
  loadingSwal,
  setErrorValidation,
  usePostData,
  usePostFileData,
} from "@/helpers";
import Papa from "papaparse";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDataTables,
  resetPayloadUploadSample,
  resetValidationErrorsPayloadSample,
  setDataTables,
  setPayloadUploadSample,
  setValidationErrorsPayloadSample,
} from "@/slices/ewp/konvensional/mapa/planningAnalysisMapaEWPSlice";
import { useRouter } from "next/router";
import { riskIssueSampleMapaEWPSchema } from "@/helpers/schemas/ewp/konvensional/mapa/planningAnalysisMapaEWPSchema";

const ModalFooter = ({
  isPickDataModal,
  setIsPickDataModal,
  isSelectedSamplePool,
  setIsSelectedSamplePool,
  currentModalStage,
  setCurrentModalStage,
  currentSubModalStage,
  setCurrentSubModalStage,
  selectedRiskIssue,
  mutate,
  setShowModal,
  sampleMutate,
  sampleInfoMutate,
  typeSamplePool,
}) => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const payloadUploadSample = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadUploadSample
  );
  const payloadSample = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadSample
  );
  const dataTables = useSelector(
    (state) => state.planningAnalysisMapaEWP.dataTables
  );

  const schemaMappings = {
    schema: riskIssueSampleMapaEWPSchema,
    resetErrors: resetValidationErrorsPayloadSample,
    setErrors: setValidationErrorsPayloadSample,
  };

  const handleConvertFromCSV = async (url, file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const arrColumns = Object.keys(result.data[0]);
        const mappingColumns = arrColumns.map((column) => {
          return { content: column };
        });

        const mappingRows = result.data.map((item) => ({
          cells: arrColumns.map((key) => ({
            content: item[key],
          })),
        }));

        if (result?.data) {
          dispatch(
            setDataTables({
              ...dataTables,
              fileName: file?.name,
              tableRows: mappingRows,
              tableColumns: { cells: mappingColumns },
            })
          );

          dispatch(
            setPayloadUploadSample({
              url,
              filename: file?.name,
              values: [],
              jumlah_baris: result?.data?.length.toString(),
              uniq_column: arrColumns[0],
            })
          );
        }
      },
    });
  };

  const handleUpload = async (e) => {
    loadingSwal();
    if (e?.target?.files) {
      // Tidak bisa upload CSV jika currentStageModal === 2
      if (currentModalStage === 2) {
        if (
          e.target.files[0]?.type === "application/vnd.ms-excel" ||
          !e.target.files[0]?.type
        ) {
          await errorSwal(`Format .csv tidak didukung`);
          return;
        }
      }

      const upload = await usePostFileData(
        `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`,
        {
          file: e?.target?.files[0],
          modul: "ewp",
        }
      );
      switch (currentModalStage) {
        case 1:
          break;
        case 2:
          dispatch(
            setPayloadUploadSample({
              url: upload?.url[0],
              filename: e?.target?.files[0]?.name,
              description: "",
            })
          );
          break;
      }
      await handleConvertFromCSV(upload?.url[0], e?.target?.files[0]);
    }

    loadingSwal("close");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = setErrorValidation(
      payloadSample,
      dispatch,
      schemaMappings
    );

    if (isPickDataModal) {
      await usePostData(
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/${selectedRiskIssue}/${typeSamplePool}/upload`,
        payloadUploadSample
      );
      sampleMutate();
      sampleInfoMutate();
      setIsPickDataModal(false);
      setIsSelectedSamplePool(false);
    } else {
      if (validate) {
        await usePostData(
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/${selectedRiskIssue}/sample_info`,
          payloadSample
        );
        mutate();
        setShowModal(false);
      }
    }

    setCurrentModalStage(1);
    setCurrentSubModalStage(1);
    dispatch(resetPayloadUploadSample());
    dispatch(resetDataTables());
  };

  return (
    <div className="w-full flex justify-end gap-3 -my-1">
      {!isSelectedSamplePool &&
        isPickDataModal &&
        currentSubModalStage === 1 && (
          <div>
            <UploadButton
              handleUpload={handleUpload}
              text="Upload"
              className="rounded w-28 h-8 bg-atlasian-blue-light text-white flex justify-center items-center"
            />
          </div>
        )}
      {(!isSelectedSamplePool && currentSubModalStage === 1) ||
      (isSelectedSamplePool && currentSubModalStage === 1) ? (
        <div className="rounded w-28 bg-atlasian-green">
          <ButtonField
            text={"Simpan"}
            handler={handleSubmit}
            type={"submit"}
            name={"saveButton"}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ModalFooter;
