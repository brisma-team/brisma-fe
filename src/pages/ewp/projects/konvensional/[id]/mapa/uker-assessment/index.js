import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { LandingLayoutEWP } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUkerAssessmentData,
  setValidationErrors,
  resetValidationErrors,
} from "@/slices/ewp/konvensional/mapa/ukerAssessmentMapaEWPSlice";
import { errorSwal, setErrorValidation, usePostData } from "@/helpers";
import {
  BranchSelect,
  CardTypeCount,
  DescriptionModal,
  ModalAssessmentInfo,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import { IconPlus } from "@/components/icons";
import ukerAssessmentMapaEWPSchema from "@/helpers/schemas/ewp/konvensional/mapa/ukerAssessmentMapaEWPSchema";
import { useMapaEWP } from "@/data/ewp/konvensional/mapa";
import _ from "lodash";
import { TableUkerAssessment } from "@/components/molecules/ewp/konvensional/uker-assessment";

const routes = [
  {
    name: "Latar Belakang",
    slug: "latar-belakang",
  },
  {
    name: "Tujuan",
    slug: "tujuan",
  },
  { name: "Sumber Informasi", slug: "sumber-informasi" },
  { name: "Tim Audit", slug: "tim-audit" },
  { name: "UKER Assessment", slug: "uker-assessment" },
  { name: "Analisis", slug: "analisis-perencanaan" },
  { name: "Penugasan", slug: "penugasan" },
  { name: "Jadwal Audit", slug: "jadwal-audit" },
  { name: "Anggaran", slug: "anggaran" },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const baseUrl = `/ewp/projects/konvensional/${id}/mapa`;
  const [showDescModal, setShowDescModal] = useState(false);
  const [showAssessmentInfoModal, setShowAssessmentInfoModal] = useState(false);
  const [openDescIdx, setOpenDescIdx] = useState(null);
  const [showBranch, setShowBranch] = useState(false);
  const [countType, setCountType] = useState([]);
  const ukerAssessmentData = useSelector(
    (state) => state.ukerAssessmentMapaEWP.ukerAssessmentData
  );

  const { mapaEWP } = useMapaEWP("uker_assesment", { id });
  const { auditorEWP } = useAuditorEWP({ id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / MAPA`,
      path: `${baseUrl}`,
    },
    {
      name: "UKER Assessment",
      path: `${baseUrl}/uker-assessment`,
    },
  ];

  useEffect(() => {
    const mapping = mapaEWP?.data
      ?.map((v) => {
        return _.pick(v, [
          "id",
          "ref_auditee_branch_kode",
          "ref_auditee_branch_name",
          "ref_auditee_orgeh_kode",
          "ref_auditee_orgeh_name",
          "tipe_uker",
          "gross_profit",
          "desc",
        ]);
      })
      .map((item) => {
        return { ...item, description: item.desc };
      });
    dispatch(setUkerAssessmentData(mapping));
  }, [mapaEWP]);

  useEffect(() => {
    const totalCount = ukerAssessmentData?.length;
    if (totalCount) {
      const typeCounts = {};
      ukerAssessmentData?.forEach((item) => {
        const type = item.tipe_uker;
        if (type) {
          typeCounts[type] = (typeCounts[type] || 0) + 1;
        }
      });

      const total = Object.values(typeCounts).reduce(
        (acc, count) => acc + count,
        0
      );

      const result = Object.keys(typeCounts).map((type) => {
        const count = typeCounts[type];
        const percent = ((count / total) * 100).toFixed(0);
        return { type, count, percent };
      });

      setCountType(result);
    }
  }, [ukerAssessmentData]);

  const schemaMappings = {
    schema: ukerAssessmentMapaEWPSchema,
    resetErrors: resetValidationErrors,
    setErrors: setValidationErrors,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const buttonName = e.target.offsetParent.name;
    const validate = setErrorValidation(
      ukerAssessmentData,
      dispatch,
      schemaMappings
    );

    if (!ukerAssessmentData?.length) {
      await errorSwal("Minimal harus ada 1 data UKER");
    }

    if (buttonName === "save" && validate) {
      await usePostData(
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/uker_assesment/${id}`,
        ukerAssessmentData
      );
    }
  };

  const handleChange = (property, index, value) => {
    const ukerData = [...ukerAssessmentData];
    const updatedData = { ...ukerData[index] };
    updatedData[property] = value;
    ukerData[index] = updatedData;
    dispatch(setUkerAssessmentData(ukerData));
  };

  const handleAddUker = async (e) => {
    if (e?.value) {
      const branchKodeToAdd = e?.value?.branch_kode;
      const isDuplicate = ukerAssessmentData.some(
        (item) => item.ref_auditee_branch_kode === branchKodeToAdd
      );

      if (isDuplicate) {
        await errorSwal("Branch yang anda pilih sudah terdaftar");
      } else {
        const newData = [...ukerAssessmentData];
        newData.push({
          id: null,
          ref_auditee_orgeh_kode: "",
          ref_auditee_orgeh_name: "",
          ref_auditee_branch_kode: e?.value?.branch_kode,
          ref_auditee_branch_name: e?.value?.branch_name,
          tipe_uker: "",
          description: "",
          gross_profit: "",
        });
        dispatch(setUkerAssessmentData(newData));
        setShowBranch(false);
      }
    }
  };

  return (
    <LandingLayoutEWP>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle text="Unit Kerja Assessment" />
        <PrevNextNavigation
          baseUrl={baseUrl}
          routes={routes}
          prevUrl={"/tim-audit"}
          nextUrl={"/analisis-perencanaan"}
          marginLeft={"-60px"}
        />
      </div>
      <div className="w-full">
        <Card>
          <div className="w-full px-6 py-4">
            <div className="w-full flex flex-wrap mb-4">
              {countType.map((v, i) => {
                return (
                  <CardTypeCount
                    key={i}
                    title={v.type?.toUpperCase()}
                    total={v.count}
                    percent={v.percent}
                    width={"w-[12rem]"}
                    style={"m-1"}
                  />
                );
              })}
            </div>
            <TableUkerAssessment
              handleChange={handleChange}
              setOpenDescIdx={setOpenDescIdx}
              setShowDescModal={setShowDescModal}
              setShowAssessmentInfoModal={setShowAssessmentInfoModal}
            />
            <DescriptionModal
              showModal={showDescModal}
              setShowModal={setShowDescModal}
              value={
                openDescIdx !== null
                  ? ukerAssessmentData[openDescIdx]?.description
                  : ""
              }
              handleConfirm={(value) =>
                handleChange("description", openDescIdx, value)
              }
            />
            <ModalAssessmentInfo
              showModal={showAssessmentInfoModal}
              setShowModal={setShowAssessmentInfoModal}
            />
            <div className="flex gap-3 items-center mt-3">
              <div className="w-40 text-sm font-semibold">
                <ButtonField
                  iconAfter={
                    <div className="text-atlasian-purple">
                      <IconPlus size="medium" />
                    </div>
                  }
                  text={"Tambah Uker"}
                  textColor={"purple"}
                  handler={() => setShowBranch(true)}
                />
              </div>
              {showBranch && (
                <div className="w-40 mb-2">
                  <BranchSelect
                    placeholder="Select an option"
                    handleChange={handleAddUker}
                  />
                </div>
              )}
            </div>
          </div>
        </Card>
        <div className="w-full flex justify-end mt-4">
          <div className="w-32 text-sm font-bold bg-atlasian-green rounded ">
            <ButtonField
              text={"Simpan"}
              type={"submit"}
              name={"save"}
              handler={handleSubmit}
            />
          </div>
        </div>
      </div>
    </LandingLayoutEWP>
  );
};

export default index;
