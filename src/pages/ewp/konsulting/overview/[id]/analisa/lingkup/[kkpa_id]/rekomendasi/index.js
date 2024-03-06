import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import _ from "lodash";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { fetchApi, loadingSwal, setErrorValidation } from "@/helpers";
import { useRekomendasi } from "@/data/ewp/konsulting/analisa/lingkup/rekomendasi";
import { useSelector, useDispatch } from "react-redux";
import {
  setObjData,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} from "@/slices/ewp/konsulting/analisa/rekomendasiEWPKonsultingSlice";
import {
  CardAddRekomendasi,
  DataTables,
} from "@/components/molecules/ewp/konsulting/analisa/rekomendasi";
import rekomendasiEWPKonsultingSchema from "@/helpers/schemas/ewp/konsulting/analisa/rekomendasiEWPKonsultingSchema";

const routes = [
  {
    name: "Analisa Data",
    slug: "analisa-data",
  },
  {
    name: "Resume",
    slug: "resume",
  },
  { name: "Hasil Analisa", slug: "hasil-analisa" },
  { name: "Rekomendasi", slug: "rekomendasi" },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const dispatch = useDispatch();
  const { id, kkpa_id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const pathNameSubModulAnalisa = `${baseUrl}/analisa`;
  const pathNameLandingPage = `${baseUrl}/analisa/lingkup/${kkpa_id}`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const data = useSelector((state) => state.rekomendasiEWPKonsulting.objData);
  const payload = useSelector(
    (state) => state.rekomendasiEWPKonsulting.objPayload
  );
  const validation = useSelector(
    (state) => state.rekomendasiEWPKonsulting.validationErrors
  );

  const { projectDetail } = useProjectDetail({ id });
  const { rekomendasi, rekomendasiMutate } = useRekomendasi({ id: kkpa_id });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting/overview" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `${baseUrl}/info`,
      },
      {
        name: `Analisa / Lingkup Konsulting Ringkasan`,
        path: `${pathNameSubModulAnalisa}/lingkup`,
      },
      {
        name: `Kertas Kerja`,
        path: `${pathNameLandingPage}`,
      },
      {
        name: `Rekomendasi`,
        path: `${pathNameLandingPage}/rekomendasi`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (rekomendasi?.data?.length) {
      const mappingRekomendasi = rekomendasi?.data?.map((v) => {
        return _.pick(v, ["id", "deadline", "desc"]);
      });
      dispatch(setObjData(mappingRekomendasi));
    } else {
      dispatch(resetObjData());
    }
  }, [rekomendasi]);

  const handleClickDelete = async (rekomendasi_id) => {
    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpa/rekomendasi/delete/${rekomendasi_id}`,
      {}
    );

    rekomendasiMutate();
    loadingSwal("close");
  };

  const handleChangePayload = (property, value) => {
    const updatedData = {
      ...payload,
      [property]: value,
    };
    dispatch(setObjPayload(updatedData));
  };

  const handleSubmit = async () => {
    const schemaMapping = {
      schema: rekomendasiEWPKonsultingSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };

    const validate = setErrorValidation(payload, dispatch, schemaMapping);
    if (validate) {
      loadingSwal();
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpa/rekomendasi`,
        { kkpa_id, ...payload }
      );
      dispatch(resetObjPayload());
      rekomendasiMutate();
      loadingSwal("close");
    }
  };

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Rekomendasi" />
        <PrevNextNavigation
          baseUrl={pathNameLandingPage}
          routes={routes}
          prevUrl={"/hasil-analisa"}
          nextUrl={"/dokumen"}
          marginLeft={"-60px"}
        />
      </div>
      {/* Start Content */}
      <div className="flex flex-col gap-4">
        <Card>
          <div className="w-full px-4 pb-2">
            <p className="text-base font-bold">Daftar Penyebab</p>
            <div className="w-full mt-2">
              <DataTables data={data} handleClickDelete={handleClickDelete} />
            </div>
          </div>
        </Card>
        <CardAddRekomendasi
          data={payload}
          validation={validation}
          handleChange={handleChangePayload}
        />
        <div className="w-full flex justify-end">
          <div className="w-48 rounded bg-atlasian-green">
            <ButtonField text={"Tambah Rekomendasi"} handler={handleSubmit} />
          </div>
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;
