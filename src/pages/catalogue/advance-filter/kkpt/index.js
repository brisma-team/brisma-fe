import { useEffect, useState } from "react";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, ButtonField, Card, TableField } from "@/components/atoms";
import { IconArrowRight } from "@/components/icons";
import Button from "@atlaskit/button";
import { loadingSwal, successSwal } from "@/helpers";
import usePostKKPTQuery from "@/helpers/usePostKKPTQuery";
import shortenWord from "@/helpers/shortenWord";
import CodeMirror from "@uiw/react-codemirror";
import { StandardSQL, sql } from "@codemirror/lang-sql";
import { xcodeLight } from "@uiw/codemirror-theme-xcode";
// import * as XLSX from "xlsx";

const index = () => {
  const breadcrumbs = [
    { name: "Catalogue", path: "/catalogue" },
    {
      name: "Pencarian Dokumen KKPT",
      path: "/catalogue/advance-filter/kkpt",
    },
  ];

  const [catPat, setCatPat] = useState([]);
  const [whereClause, setWhereClause] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2022);
  const few = [
    {
      "Nama Kolom": "kkptid",
      "Tipe Data": "UUID",
    },
    {
      "Nama Kolom": "auditprojectid",
      "Tipe Data": "UUID",
    },
    {
      "Nama Kolom": "audityear",
      "Tipe Data": "Int16",
    },
    {
      "Nama Kolom": "auditprojectname",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "audittypename",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "riskissuecode",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "riskissuename",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "submajorprocesscode",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "submajorprocessname",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "majorprocessname",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "megaprocessname",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "functionalactivity2name",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "functionalactivity1name",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "organizationcode",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "organizationname",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "personalnumber",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "personname",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "kkpttitle",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "findinglevelname",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "findingtypename",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "refrisktypename",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "productname",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "samplenumber",
      "Tipe Data": "Int32",
    },
    {
      "Nama Kolom": "impactscore",
      "Tipe Data": "Int32",
    },
    {
      "Nama Kolom": "likelihoodscore",
      "Tipe Data": "Int32",
    },
  ];

  // It works, but it's supposed to accomodate whole schema, not just columns.
  const colObject = {};
  few.forEach((v) => {
    colObject[v["Nama Kolom"]] = [];
  });

  // const exportToExcel = () => {
  //   const dataToExport = [...dataList]; // Data yang akan diekspor

  //   // Membuat workheet baru
  //   const ws = XLSX.utils.json_to_sheet(dataToExport);

  //   // Membuat workbook baru
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "KKPT Data"); // Nama sheet

  //   // Menghasilkan file Excel (blob)
  //   const blob = XLSX.write(wb, { bookType: "xlsx", type: "blob" });

  //   // Membuat URL untuk blob
  //   const url = URL.createObjectURL(blob);

  //   // Membuat link untuk mengunduh file Excel
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "kkpt_inquiry_log.xlsx"; // Nama file
  //   a.click();

  //   // Membersihkan URL
  //   URL.revokeObjectURL(url);
  // };

  useEffect(() => {
    if (dataList != undefined) {
      const mappingCatPat = dataList.map((v, key) => {
        return {
          No: key + 1,
          KKPTID: v?.KKPTID,
          "Nama Project": shortenWord(v?.ProjectName, 0, 20),
          "Tahun Audit": v?.ProjectYear,
          "Tipe Audit": v?.AuditType,
          Aktivitas: v?.Activity,
          "Sub Aktivitas": v?.SubActivity,
          Aksi: (
            <div className="rounded-full overflow-hidden border-2 border-atlasian-blue-light w-7 h-7 pt-0.5 mx-auto active:bg-slate-100">
              <Link href={"/catalogue/advance-filter/kkpt/" + v?.KKPTID}>
                <Button
                  shouldFitContainer
                  iconBefore={
                    <IconArrowRight primaryColor="#0051CB" size="medium" />
                  }
                  className="bottom-1.5"
                />
              </Link>
            </div>
          ),
        };
      });
      setCatPat(mappingCatPat);
    }
  }, [dataList]);

  const handleSubmit = async () => {
    loadingSwal();
    const url = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/advfilter/kkpt`;
    await usePostKKPTQuery(url, {
      whereclause: whereClause != "" ? `WHERE ` + whereClause : "",
      year: selectedYear,
    }).then((res) => {
      successSwal(res.messages);
      setDataList(res.data);
    });
  };

  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-3xl font-bold">Pencarian Dokumen KKPT</div>
        </div>
        <div className="mt-5 mr-40 grid grid-cols-4 mb-20">
          <div className="col-span-1">
            <div className="mb-2 text-lg">
              <div className="pt-4 font-bold">Kolom Kunci</div>
            </div>
            <Card>
              <div className="w-full h-full px-2">
                <div className="max-h-[22rem] overflow-y-scroll px-2 p-5">
                  <TableField
                    headers={["Nama Kolom", "Tipe Data"]}
                    columnWidths={["55%", "45%"]}
                    items={few}
                  />
                </div>
              </div>
            </Card>
          </div>
          <div className="col-span-3 ml-4">
            <div className="flex justify-between mb-2 text-lg">
              <div className="pt-4 font-bold">Kolom Pencarian</div>
              <div>
                <div className="bg-green-500 shadow rounded-md">
                  <ButtonField text={"Eksekusi"} handler={handleSubmit} />
                </div>
              </div>
            </div>
            <div
              className="p-6 w-full h-full rounded-lg border-[1.5px] border-[#83606025]"
              style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.20)" }}
            >
              <CodeMirror
                value="audityear = ..."
                height="300px"
                theme={xcodeLight}
                extensions={[
                  sql({
                    upperCaseKeywords: true,
                    dialect: StandardSQL,
                    schema: colObject,
                  }),
                ]}
                onChange={(e) => setWhereClause(e)}
                basicSetup={{
                  lineNumbers: false,
                  foldGutter: false,
                  highlightActiveLine: false,
                }}
              />
            </div>
            {/* <textarea
              rows={10}
              placeholder="Masukkan batasan data yang diperlukan..."
              className="p-6 w-full h-full rounded-lg border-[1.5px] border-[#83606025]"
              onChange={(e) => setWhereClause(e.target.value)}
              style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.20)" }}
            >
            </textarea> */}
          </div>
        </div>
        <div className="mt-5 mr-40 flex gap-1">
          <div className="w-[10rem]">
            <div className="bg-slate-800 shadow rounded-md p-1.5">
              <p className="text-white px-10">{catPat.length} KKPTs</p>
            </div>
          </div>
          {/* <div className="w-[12rem]">
            <div className="bg-green-500 shadow rounded-md">
              <ButtonField text={"Export to Excel"} handler={exportToExcel} />
            </div>
          </div> */}
        </div>
        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dokumen KKPT</div>
              <div className="max-h-[29rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={[
                    "Aksi",
                    "No",
                    "KKPTID",
                    "Nama Project",
                    "Tahun Audit",
                    "Tipe Audit",
                    "Aktivitas",
                    "Sub Aktivitas",
                  ]}
                  columnWidths={[
                    "10%",
                    "5%",
                    "20%",
                    "20%",
                    "10%",
                    "10%",
                    "10%",
                    "15%",
                  ]}
                  items={catPat}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;
