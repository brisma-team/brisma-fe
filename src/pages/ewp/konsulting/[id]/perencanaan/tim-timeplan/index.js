import {
  Breadcrumbs,
  ButtonField,
  Card,
  ErrorValidation,
  PageTitle,
} from "@/components/atoms";
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
import {
  CardMemberTeam,
  CardTeam,
} from "@/components/molecules/ewp/konsulting/perencanaan/tim-timeplan";
import {
  convertIntegerToDecimal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import _ from "lodash";
import timTimeplanEWPKonsultingSchema from "@/helpers/schemas/ewp/konsulting/perencanaan/timTimeplanEWPKonsultingSchema";
import useUser from "@/data/useUser";
import { useLandingStatus } from "@/data/ewp/konsulting/landing";

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
  const baseUrl = `/ewp/konsulting/${id}`;
  const pathName = `${baseUrl}/perencanaan`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);
  const [isOnProgress, setIsOnProgress] = useState(false);

  const payload = useSelector(
    (state) => state.timTimePlanEWPKonsulting.objData
  );
  const validation = useSelector(
    (state) => state.timTimePlanEWPKonsulting.validationErrors
  );

  const { user } = useUser();
  const { projectDetail } = useProjectDetail({ id });
  const { landingStatus } = useLandingStatus({ type: "mapa", id });
  const { timTimeplan, timTimeplanMutate, timTimeplanError } = useTimTimeplan({
    id,
  });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: baseUrl + "/info",
      },
      {
        name: `Perencanaan Kegiatan`,
        path: pathName,
      },
      {
        name: `Team & Timeplan`,
        path: `${pathName}tim-timeplan`,
      },
    ]);
    setIsCloseSubmodule(
      Boolean(projectDetail?.data?.realisasi?.penyusunan_mapa_real_end)
    );
  }, [projectDetail]);

  useEffect(() => {
    if (landingStatus?.data) {
      setIsOnProgress(
        Boolean(landingStatus?.data?.status_persetujuan_name == "On Progress")
      );
    }
  }, [landingStatus]);

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
              mandays: convertIntegerToDecimal(mandays).decimal,
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
      setIsInitiator(
        Boolean(
          projectDetail?.data?.project_info?.initiator?.pn === user?.data?.pn
        )
      );
    } else {
      dispatch(resetObjData());
      setIsInitiator(false);
    }
  }, [timTimeplan, projectDetail, user]);

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
      const mappingATA = payload.ata.map((v) => {
        return {
          ..._.omit(v, ["mandays"]),
          mandays: convertIntegerToDecimal(v?.mandays).integer,
        };
      });
      const objPayload = {
        ..._.omit(payload, ["ata"]),
        ata: mappingATA,
      };
      loadingSwal();
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/tim_audit/${id}`,
        { tim_audit: _.omit(objPayload, ["initiator"]) }
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
            withoutButton
            isDisabled
          />
          <CardTeam
            isUserSKAI
            data={payload}
            validation={validation}
            withoutButton={
              isCloseSubmodule ? true : !isOnProgress ? true : !isInitiator
            }
            isDisabled={
              isCloseSubmodule ? true : !isOnProgress ? true : !isInitiator
            }
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
            withoutButton={
              isCloseSubmodule ? true : !isOnProgress ? true : !isInitiator
            }
            isDisabled={
              isCloseSubmodule ? true : !isOnProgress ? true : !isInitiator
            }
            property={"auditee"}
            title={"P.I.C Auditee"}
            textColorTitle={"text-atlasian-red"}
            handleAdd={handleAddObjectInsideArray}
            handleDelete={handleDeleteObjectInsideArray}
            handleChangeSelect={handleChangeSelectValueObjectInsideArray}
          />
        </div>
        <div className="p-5 w-full">
          <Card>
            <div className="px-4 py-2 flex flex-col gap-4 w-full">
              {isInitiator && !isCloseSubmodule && isOnProgress ? (
                <div className="bg-atlasian-purple rounded w-fit">
                  <ButtonField
                    text={"Tambah Anggota Tim"}
                    handler={() => handleAddObjectInsideArray("ata")}
                  />
                </div>
              ) : (
                ""
              )}
              {validation["ata"] ? (
                <ErrorValidation
                  className={"mt-3"}
                  message={validation["ata"]}
                />
              ) : (
                ""
              )}
              <CardMemberTeam
                title={"Anggota Tim Audit"}
                textColorTitle={"text-atlasian-green"}
                property={"ata"}
                data={payload}
                validation={validation}
                withoutButton={
                  isCloseSubmodule ? true : !isInitiator && !isOnProgress
                }
                isDisabled={
                  isCloseSubmodule ? true : !isInitiator && !isOnProgress
                }
                handleDelete={handleDeleteObjectInsideArray}
                handleChangeSelect={handleChangeSelectValueObjectInsideArray}
                handleChangeText={handleChangeTextValueObjectInsideArray}
              />
            </div>
          </Card>
        </div>
      </Card>
      {isInitiator && !isCloseSubmodule && isOnProgress ? (
        <div className="mt-3 flex justify-end">
          <div className="w-36 bg-atlasian-green rounded">
            <ButtonField text={"Simpan"} handler={handleSubmit} />
          </div>
        </div>
      ) : (
        ""
      )}
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;
