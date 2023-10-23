import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { LandingLayoutEWP } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { CardAuditTeam } from "@/components/molecules/ewp/konvensional/tim-audit";
import { useMapaEWP } from "@/data/ewp/konvensional/mapa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuditTeamData,
  setValidationErrors,
  resetValidationErrors,
} from "@/slices/ewp/konvensional/mapa/auditTeamMapaEWPSlice";
import { setErrorValidation, usePostData } from "@/helpers";
import { PrevNextNavigation } from "@/components/molecules/commons";
import auditTeamMapaEWPSchema from "@/helpers/schemas/ewp/konvensional/mapa/auditTeamMapaEWPSchema";

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
  const auditTeamData = useSelector(
    (state) => state.auditTeamMapaEWP.auditTeamData
  );

  const { auditorEWP } = useAuditorEWP({ id });
  const { mapaEWP, mapaEWPMutate } = useMapaEWP("tim_audit", { id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / MAPA`,
      path: `${baseUrl}`,
    },
    {
      name: "Tim Audit",
      path: `${baseUrl}/tim-audit`,
    },
  ];

  const schemaMappings = {
    schema: auditTeamMapaEWPSchema,
    resetErrors: resetValidationErrors,
    setErrors: setValidationErrors,
  };

  useEffect(() => {
    const mapping = {
      ref_tipe_tim: mapaEWP?.data?.ref_tipe_tim || {
        kode: "",
        nama: "",
      },
      tim_audit: {
        ma: mapaEWP?.data?.tim_audit?.ma,
        kta: mapaEWP?.data?.tim_audit?.kta,
        ata: mapaEWP?.data?.tim_audit?.ata,
      },
    };
    dispatch(setAuditTeamData(mapping));
  }, [mapaEWP]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const buttonName = e.target.offsetParent.name;

    const validate = setErrorValidation(
      auditTeamData,
      dispatch,
      schemaMappings
    );

    if (buttonName === "save" && validate) {
      await usePostData(
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/tim_audit/${id}`,
        auditTeamData
      );
      mapaEWPMutate();
    }
  };

  return (
    <LandingLayoutEWP>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle text="Tim Audit" />
        <PrevNextNavigation
          baseUrl={baseUrl}
          routes={routes}
          prevUrl={"/pemetaan-prioritas"}
          nextUrl={"/uker-assessment"}
          marginLeft={"-60px"}
        />
      </div>
      <div className="mt-7 w-[80.5rem]">
        <Card>
          <CardAuditTeam />
        </Card>
        <form className="w-full flex justify-end mt-4" onSubmit={handleSubmit}>
          <div className="w-28 h-8 bg-atlasian-green rounded">
            <ButtonField
              text={"Simpan"}
              type={"submit"}
              name={"save"}
              handler={handleSubmit}
            />
          </div>
        </form>
      </div>
    </LandingLayoutEWP>
  );
};

export default index;
