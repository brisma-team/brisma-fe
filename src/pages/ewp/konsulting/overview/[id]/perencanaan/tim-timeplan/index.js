import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useDispatch } from "react-redux";
import {
  setObjData,
  setValidationErrors,
  resetObjData,
  resetValidationErrors,
} from "@/slices/ewp/konsulting/perencanaan/timTimePlanEWPKonsultingSlice";
import { useSelector } from "react-redux";
import { useTimTimeplan } from "@/data/ewp/konsulting/perencanaan/tim-timeplan";
import { CardTeam } from "@/components/molecules/ewp/konsulting/perencanaan/tim-timeplan";
import { fetchApi, loadingSwal, setErrorValidation } from "@/helpers";
import _ from "lodash";
import timTimeplanEWPKonsultingSchema from "@/helpers/schemas/ewp/konsulting/perencanaan/timTimeplanEWPKonsultingSchema";

const routes = [
  {
    name: "Sumber Informasi",
    slug: "sumber-informasi",
  },
  {
    name: "Tim & Timeplan",
    slug: "tim-timeplan",
  },
  { name: "Anggaran", slug: "anggaran" },
  { name: "Program Kerja", slug: "program-kerja" },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const pathName = `${baseUrl}/perencanaan`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const payload = useSelector(
    (state) => state.timTimePlanEWPKonsulting.objData
  );
  const validation = useSelector(
    (state) => state.timTimePlanEWPKonsulting.validationErrors
  );

  const { projectDetail } = useProjectDetail({ id });
  const { timTimeplan, timTimeplanMutate, timTimeplanError } = useTimTimeplan({
    id,
  });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting/overview" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()} / Perencanaan Kegiatan`,
        path: baseUrl,
      },
      {
        name: `Team & Timeplan`,
        path: `${baseUrl}/perencanaan/tim-timeplan`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (!timTimeplanError) {
      const mappingInitiator = [projectDetail?.data?.project_info?.initiator];
      const mappingAuditor = timTimeplan?.data?.tim_audit?.auditor?.length
        ? timTimeplan?.data?.tim_audit?.auditor?.map((v) => {
            const { pn, nama, is_initiator } = v;
            return {
              pn,
              nama,
              is_initiator,
            };
          })
        : [];

      const mappingAuditee = timTimeplan?.data?.tim_audit?.auditee?.length
        ? timTimeplan?.data?.tim_audit?.auditee?.map((v) => {
            const { pn, nama, is_initiator } = v;
            return {
              pn,
              nama,
              is_initiator,
            };
          })
        : [];

      const mappingATA = timTimeplan?.data?.tim_audit?.ata?.length
        ? timTimeplan?.data?.tim_audit?.ata?.map((v) => {
            const { pn, nama, is_initiator, mandays, deskripsi } = v;
            return {
              pn,
              nama,
              is_initiator,
              mandays,
              deskripsi,
            };
          })
        : [];

      dispatch(
        setObjData({
          initiator: mappingInitiator,
          auditor: mappingAuditor,
          auditee: mappingAuditee,
          ata: mappingATA,
        })
      );
    } else {
      dispatch(resetObjData());
    }
  }, [timTimeplan, projectDetail]);

  const handleAddObjectInsideArray = (property) => {
    const newTimAudit = [...payload[property]];
    newTimAudit.push({ pn: "", nama: "", is_initiator: false });
    dispatch(setObjData({ ...payload, [property]: newTimAudit }));
  };

  const handleDeleteObjectInsideArray = (index, property) => {
    const newData = [...payload[property]];
    newData.splice(index, 1);
    dispatch(setObjData({ ...payload, [property]: newData }));
  };

  const handleChangeSelectValueObjectInsideArray = (property, index, value) => {
    const newData = [...payload[property]];
    const updated = {
      ...newData[index],
      pn: value?.pn,
      nama: value?.name,
    };
    newData[index] = updated;
    dispatch(
      setObjData({
        ...payload,
        [property]: newData,
      })
    );
  };

  const handleChangeTextValueObjectInsideArray = (
    property,
    propertyObj,
    index,
    value
  ) => {
    const newData = [...payload[property]];
    const updated = {
      ...newData[index],
      [propertyObj]: value,
    };
    newData[index] = updated;
    dispatch(
      setObjData({
        ...payload,
        [property]: newData,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: timTimeplanEWPKonsultingSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };
    const validate = setErrorValidation(payload, dispatch, schemaMapping);

    if (validate) {
      loadingSwal();
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/tim_audit/${id}`,
        { tim_audit: _.omit(payload, ["initiator"]) }
      );
      timTimeplanMutate();
      loadingSwal("close");
    }
  };

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Team & Time plan" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/sumber-informasi"}
          nextUrl={"/anggaran"}
          marginLeft={"-60px"}
        />
      </div>
      {/* Start Content */}
      <Card>
        <div className="p-5 grid grid-cols-3 gap-3 w-full h-full">
          <CardTeam
            data={payload}
            validation={validation}
            property={"initiator"}
            title={"Initiator"}
            textColorTitle={"text-atlasian-yellow"}
            handleAdd={handleAddObjectInsideArray}
            handleDelete={handleDeleteObjectInsideArray}
            handleChangeSelect={handleChangeSelectValueObjectInsideArray}
            withoutButton
            isDisabled
          />
          <CardTeam
            data={payload}
            validation={validation}
            property={"auditor"}
            title={"P.I.C Auditor"}
            textColorTitle={"text-atlasian-blue-light"}
            handleAdd={handleAddObjectInsideArray}
            handleDelete={handleDeleteObjectInsideArray}
            handleChangeSelect={handleChangeSelectValueObjectInsideArray}
          />
          <CardTeam
            data={payload}
            validation={validation}
            property={"auditee"}
            title={"P.I.C Auditee"}
            textColorTitle={"text-atlasian-red"}
            handleAdd={handleAddObjectInsideArray}
            handleDelete={handleDeleteObjectInsideArray}
            handleChangeSelect={handleChangeSelectValueObjectInsideArray}
          />
        </div>
        <div className="px-5 pb-5 w-full">
          <CardTeam
            data={payload}
            validation={validation}
            property={"ata"}
            title={"Anggota Tim Audit"}
            textColorTitle={"text-atlasian-green"}
            handleAdd={handleAddObjectInsideArray}
            handleDelete={handleDeleteObjectInsideArray}
            handleChangeSelect={handleChangeSelectValueObjectInsideArray}
            handleChangeText={handleChangeTextValueObjectInsideArray}
            withMandays
            withDescription
          />
        </div>
      </Card>
      <div className="mt-3 flex justify-end">
        <div className="w-36 bg-atlasian-green rounded">
          <ButtonField text={"Simpan"} handler={handleSubmit} />
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;
