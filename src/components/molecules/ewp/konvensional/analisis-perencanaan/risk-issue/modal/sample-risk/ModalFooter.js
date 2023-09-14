import { ButtonField, UploadButton } from "@/components/atoms";
import { loadingSwal, usePostData, usePostFileData } from "@/helpers";
import Papa from "papaparse";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDataTables,
  resetPayloadSample,
  setDataTables,
  setPayloadSample,
} from "@/slices/ewp/konvensional/mapa/planningAnalysisMapaEWPSlice";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ModalFooter = ({
  isPickDataModal,
  setIsPickDataModal,
  isSelectedSamplePool,
  setCurrentModalStage,
  currentSubModalStage,
  setCurrentSubModalStage,
  selectedRiskIssue,
  mutate,
  setShowModal,
  sampleMutate,
}) => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const [typeModal, setTypeModal] = useState("");
  const payloadSample = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadSample
  );

  console.log("isPickDataModal => ", isPickDataModal);

  useEffect(() => {
    if (isPickDataModal) {
      setTypeModal("pickData");
    }
  }, [isPickDataModal]);

  const handleConvertFromCSV = async (url, file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const rowsArray = [];

        result?.data?.map((d) => {
          rowsArray.push(Object.keys(d));
        });

        if (result?.data) {
          dispatch(
            setDataTables({
              fileName: file?.name,
              tableValues: result.data,
              tableRows: rowsArray[0],
            })
          );

          dispatch(
            setPayloadSample({
              url,
              filename: file?.name,
              values: [],
              jumlah_baris: result?.data?.length.toString(),
              uniq_column: rowsArray[0][0],
            })
          );
        }
      },
    });
  };

  const handleUpload = async (e) => {
    loadingSwal();
    // if (e?.target?.files) {
    //   const upload = await usePostFileData(
    //     `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`,
    //     {
    //       file: e?.target?.files[0],
    //       modul: "ewp",
    //     }
    //   );
    // await handleConvertFromCSV(upload?.url[0], e?.target?.files[0]);
    // }

    await handleConvertFromCSV("upload?.url[0]", e?.target?.files[0]);

    loadingSwal("close");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await usePostData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/${selectedRiskIssue}/sample_csv/upload`,
      payloadSample
    );

    setCurrentModalStage(1);
    setCurrentSubModalStage(1);
    dispatch(resetPayloadSample());
    dispatch(resetDataTables());

    switch (typeModal) {
      case "pickData":
        sampleMutate();
        setIsPickDataModal(false);
        break;
      default:
        mutate();
        setShowModal(false);

        console.log("tidak masuk pick sample");
        break;
    }
  };

  return (
    <div className="w-full flex justify-end gap-3 -my-1">
      {!isSelectedSamplePool &&
        isPickDataModal &&
        currentSubModalStage === 1 && (
          <div>
            <UploadButton
              fileAccept=".csv"
              handleUpload={handleUpload}
              text="Upload"
              className="rounded w-28 h-8 bg-atlasian-blue-light text-white flex justify-center items-center"
            />
          </div>
        )}
      <div className="rounded w-28 bg-atlasian-green">
        <ButtonField
          text={"Simpan"}
          handler={handleSubmit}
          type={"submit"}
          name={"saveButton"}
        />
      </div>
    </div>
  );
};

export default ModalFooter;

// const mappingColumn = {
//   cells: [
//     {
//       content: "Aksi",
//     },
//     ...Object.keys(result?.data[0]).map((key) => ({
//       content: <div className="w-20">{key}</div>,
//     })),
//   ],
// };

// const mappingRows = [];
// result?.data.forEach((item) => {
//   const transformedItem = {
//     cells: [
//       {
//         content: <ButtonIcon />,
//         column: "aksi",
//       },
//     ],
//   };

//   Object.keys(item).forEach((key) => {
//     const content = item[key];
//     const column = key;

//     transformedItem.cells.push({
//       key: Math.random(),
//       content: <div className="w-20">{content}</div>,
//       column,
//     });
//   });

//   mappingRows.push(transformedItem);
// });

// result?.data?.map((item) => {
//   const cells = Object.keys(item).map((key, index) => {
//     return {
//       content: item[key],
//     };
//   });

//   return {
//     cells: [
//       {
//         content: (
//           <CheckboxField
//             // isChecked={payloadSample.values.includes(
//             //   data[dataTables.tableRows[0]]
//             // )}
//             // handleChange={(e) =>
//             //   handleChangeCheckbox(
//             //     e.target.checked,
//             //     data[dataTables.tableRows[0]]
//             //   )
//             // }
//             handleChange={(e) =>
//               console.log("target => ", e.target.checked)
//             }
//           />
//         ),
//       },
//       ...cells,
//     ],
//   };
// });
