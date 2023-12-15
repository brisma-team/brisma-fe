import { useEffect, useState } from "react";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import {
  Breadcrumbs,
  ButtonField,
  Card,
  CustomPagination,
  TableField,
} from "@/components/atoms";
import { IconArrowRight } from "@/components/icons";
import { infoSwal, loadingSwal, successSwal } from "@/helpers";
import usePostKKPTQuery from "@/helpers/usePostKKPTQuery";
import shortenWord from "@/helpers/shortenWord";
import CodeMirror from "@uiw/react-codemirror";
import { StandardSQL, sql } from "@codemirror/lang-sql";
import { xcodeLight } from "@uiw/codemirror-theme-xcode";

const index = () => {
  const breadcrumbs = [
    { name: "Catalogue", path: "/catalogue" },
    {
      name: "Pencarian Dokumen KKPT",
      path: "/catalogue/advance-filter/kkpt",
    },
  ];

  const [params, setParams] = useState({
    page: 1,
    limit: 5,
    total_data: 0,
    total_page: 0,
  });
  const [catPat, setCatPat] = useState([]);
  const [whereClause, setWhereClause] = useState([]);
  const [dataList, setDataList] = useState([]);

  const few = [
    {
      "Nama Kolom": "KKPTID",
      "Tipe Data": "UUID",
    },
    {
      "Nama Kolom": "ProjectID",
      "Tipe Data": "UUID",
    },
    {
      "Nama Kolom": "ProjectYear",
      "Tipe Data": "Int16",
    },
    {
      "Nama Kolom": "ProjectName",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "AuditTypeName",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "RiskIssueCode",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "RiskIssueName",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "SubMajorProcessCode",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "SubMajorProcessName",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "MajorProcessName",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "MegaProcessName",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "SubActivity",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "Activity",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "OrgehCode",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "OrgehName",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "PersonalNumber",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "PersonalName",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "KKPTTitle",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "FindingLevel",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "FindingType",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "RiskType",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "ProductName",
      "Tipe Data": "String",
    },
    {
      "Nama Kolom": "SampleNumber",
      "Tipe Data": "Int32",
    },
    {
      "Nama Kolom": "ImpactScore",
      "Tipe Data": "Int32",
    },
    {
      "Nama Kolom": "LikelihoodScore",
      "Tipe Data": "Int32",
    },
  ];

  // It works, but it's supposed to accomodate whole schema, not just columns.
  const colObject = {};
  few.forEach((v) => {
    colObject[v["Nama Kolom"]] = [];
  });

  useEffect(() => {
    if (dataList != undefined) {
      const mappingCatPat = dataList.map((v, key) => {
        return {
          No: (params.page - 1) * 5 + key + 1,
          KKPTID: v?.KKPTID,
          "Nama Project": shortenWord(v?.ProjectName, 0, 20),
          "Tahun Audit": v?.ProjectYear,
          "Tipe Audit": v?.AuditTypeName,
          Aktivitas: v?.Activity,
          "Sub Aktivitas": v?.SubActivity,
          Aksi: (
            <div className="rounded-full overflow-hidden border-2 border-atlasian-blue-light w-7 h-7 pt-0.5 mx-auto active:bg-slate-100">
              <Link
                href={
                  "/catalogue/advance-filter/kkpt/" +
                  v?.Source +
                  "x1c-" +
                  v?.KKPTID +
                  "x1c-" +
                  v?.ProjectYear
                }
              >
                <ButtonField
                  className={"bottom-1.5"}
                  icon={<IconArrowRight primaryColor="#0051CB" size="medium" />}
                />
              </Link>
            </div>
          ),
        };
      });
      setCatPat(mappingCatPat);
    }
  }, [dataList]);

  const handleSubmit = async (page = 1) => {
    loadingSwal();
    const url = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/advfilter/kkpt`;
    await usePostKKPTQuery(url, {
      whereclause: whereClause != "" ? `WHERE ` + whereClause : "",
      year: 2023,
      page: page,
      limit: params.limit,
    })
      .then((res) => {
        successSwal(res.messages);
        setDataList(res.data.kkptlist);
        setParams({
          ...params,
          page: res.data.current_page,
          total_page: res.data.total_page,
          total_data: res.data.total_data,
          limit: res.data.limit,
        });
      })
      .catch((err) => {
        infoSwal(err.message);
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
                  <ButtonField
                    text={"Eksekusi"}
                    handler={() => handleSubmit(params.page)}
                  />
                </div>
              </div>
            </div>
            <div
              className="p-6 w-full h-full rounded-lg border-[1.5px] border-[#83606025]"
              style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.20)" }}
            >
              <CodeMirror
                value="ProjectYear = ..."
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
          </div>
        </div>
        <div className="mt-5 mr-40 flex gap-1">
          <div className="w-[10rem]">
            <div className="bg-slate-800 shadow rounded-md p-1.5">
              <p className="text-white px-10">{params.total_data} KKPTs</p>
            </div>
          </div>
        </div>
        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dokumen KKPT</div>
              <div className="max-h-[29rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={[
                    "No",
                    "KKPTID",
                    "Nama Project",
                    "Tahun Audit",
                    "Tipe Audit",
                    "Aktivitas",
                    "Sub Aktivitas",
                    "Aksi",
                  ]}
                  columnWidths={[
                    "5%",
                    "20%",
                    "20%",
                    "10%",
                    "10%",
                    "10%",
                    "15%",
                    "10%",
                  ]}
                  items={catPat}
                />
              </div>
              <div className="flex justify-center mt-5">
                <CustomPagination
                  defaultCurrentPage={1}
                  perPage={5}
                  totalData={params.total_data}
                  handleClick={handleSubmit}
                  handleSetPagination={async (start, end, pageNow) =>
                    setParams((prev) => {
                      return {
                        ...prev,
                        page: pageNow,
                      };
                    })
                  }
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
