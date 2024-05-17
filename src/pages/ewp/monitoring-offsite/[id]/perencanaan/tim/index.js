import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/monitoring-offsite";
import { LandingLayoutEWPMonOff } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useDispatch } from "react-redux";
import {
  setObjData,
  setValidationErrors,
  resetObjData,
  resetValidationErrors,
} from "@/slices/ewp/monitoring-offsite/perencanaan/timEWPMonoffSlice";
import { useSelector } from "react-redux";
import { useTim } from "@/data/ewp/monitoring-offsite/perencanaan/tim";
import { CardTeam } from "@/components/molecules/ewp/monitoring-offsite/perencanaan/tim-timeplan";
import { fetchApi, loadingSwal, setErrorValidation } from "@/helpers";
import _ from "lodash";
import timEWPMonoffSchema from "@/helpers/schemas/ewp/monitoring-offsite/perencanaan/timEWPMonoffSchema";

const routes = [
  {
    name: "Tim Audit",
    slug: "tim",
  },
  {
    name: "UKER Assessment",
    slug: "uker-assessment",
  },
];

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const baseUrl = `/ewp/monitoring-offsite/${id}`;
  const pathName = `${baseUrl}/perencanaan`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const payload = useSelector((state) => state.timEWPMonoff.objData);
  const validation = useSelector(
    (state) => state.timEWPMonoff.validationErrors
  );

  const { projectDetail } = useProjectDetail({ id });
  const { tim, timMutate, timError } = useTim({
    id,
  });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      {
        name: "Monitoring Offsite / Overview",
        path: "/ewp/monitoring-offsite",
      },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()} / Perencanaan Kegiatan`,
        path: baseUrl,
      },
      {
        name: `Tim Audit`,
        path: `${baseUrl}/perencanaan/tim`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (!timError) {
      const mappingInitiator = [projectDetail?.data?.project_info?.initiator];
      const mappingAuditor = tim?.data?.tim_audit?.auditor?.length
        ? tim?.data?.tim_audit?.auditor?.map((v) => {
            const { pn, nama, is_initiator } = v;
            return {
              pn,
              nama,
              is_initiator,
            };
          })
        : [];

      const mappingAuditee = tim?.data?.tim_audit?.auditee?.length
        ? tim?.data?.tim_audit?.auditee?.map((v) => {
            const { pn, nama, is_initiator } = v;
            return {
              pn,
              nama,
              is_initiator,
            };
          })
        : [];

      const mappingATA = tim?.data?.tim_audit?.ata?.length
        ? tim?.data?.tim_audit?.ata?.map((v) => {
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
  }, [tim, projectDetail]);

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
      schema: timEWPMonoffSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };
    const validate = setErrorValidation(payload, dispatch, schemaMapping);

    if (validate) {
      loadingSwal();
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/monoff/mapa/tim_audit/${id}`,
        { tim_audit: _.omit(payload, ["initiator"]) }
      );
      timMutate();
      loadingSwal("close");
    }
  };

  return (
    <LandingLayoutEWPMonOff>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Tim Audit" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          nextUrl={"/uker-assessment"}
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
            title={"Anggota"}
            textColorTitle={"text-atlasian-green"}
            handleAdd={handleAddObjectInsideArray}
            handleDelete={handleDeleteObjectInsideArray}
            handleChangeSelect={handleChangeSelectValueObjectInsideArray}
            handleChangeText={handleChangeTextValueObjectInsideArray}
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
    </LandingLayoutEWPMonOff>
  );
};

export default index;
