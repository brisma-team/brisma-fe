import { Breadcrumbs, ButtonField, PageTitle } from "@/components/atoms";
import LayoutSurveyReference from "@/layouts/reference/LayoutSurveyReference";
import { useEffect, useState } from "react";
import { NavigationTab } from "@/components/molecules/commons";
import { useRouter } from "next/router";
import {
  TabScore,
  TabRespondenGrade,
  TabSurveyNote,
} from "@/components/molecules/survey/initiator/penilaian";
import { usePenilaian } from "@/data/survey/initiator/penilaian";
import { useDispatch } from "react-redux";
import { setObjData } from "@/slices/survey/initiator/penilaianSurveySlice";
import { Workbook } from "exceljs";
import { useSelector } from "react-redux";

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Survei", path: "/survey" },
    { name: "Penilaian", path: `/survey/initiator/overview/${id}` },
  ];
  const navigationTabItems = [
    { idx: 1, title: "Score" },
    { idx: 2, title: "Catatan Survey" },
    { idx: 3, title: "Nilai Responden" },
  ];

  const [currentContentStage, setCurrentContentStage] = useState(1);

  const dataTableScore = useSelector((state) => state.penilaianSurvey.objData);

  const { penilaian } = usePenilaian({ id });

  useEffect(() => {
    dispatch(setObjData(penilaian?.data));
  }, [penilaian]);

  useEffect(() => {
    console.log("dataTableScore => ", dataTableScore);
  }, [penilaian]);

  const handleConvertToExcel = async () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    const headers = [
      "pn_responden",
      "nama_responden",
      ...Object.keys(dataTableScore?.nilai_responden[0]).filter((header) =>
        /^q\d+$|^a\d+$/.test(header)
      ),
    ];

    worksheet.addRow(headers);

    dataTableScore?.nilai_responden?.forEach((row) => {
      const values = headers.map((header) => {
        if (header.startsWith("a")) {
          // Jika kolom 'a' dan berupa array, gabungkan ke satu kolom
          return Array.isArray(row[header])
            ? row[header].join(", ")
            : row[header];
        }
        return row[header];
      });
      worksheet.addRow(values);
    });

    // Save workbook to file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `test123.xlsx`;
    link.click();
  };

  return (
    <LayoutSurveyReference>
      <div className="w-[71rem] max-h-screen overflow-y-scroll pb-16">
        <div className="pl-0.5 pt-4 pr-4 pb-6">
          <Breadcrumbs data={breadcrumbs} />
          <div className="mb-4">
            <PageTitle text={"Penilaian"} />
          </div>
          <div className="flex justify-between items-center">
            <NavigationTab
              width={"w-80"}
              items={navigationTabItems}
              currentStage={currentContentStage}
              setCurrentStage={setCurrentContentStage}
            />
            {currentContentStage === 3 ? (
              <div className="w-32 rounded bg-atlasian-green mb-2">
                <ButtonField text={"Download"} handler={handleConvertToExcel} />
              </div>
            ) : (
              ""
            )}
          </div>
          {currentContentStage === 1 ? (
            <TabScore />
          ) : currentContentStage === 2 ? (
            <TabSurveyNote />
          ) : (
            <TabRespondenGrade />
          )}
        </div>
      </div>
      {/* End Content */}
    </LayoutSurveyReference>
  );
};

export default index;
