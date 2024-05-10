import {
  Breadcrumbs,
  ButtonField,
  Card,
  ErrorValidation,
  PageTitle,
} from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useDispatch } from "react-redux";
import {
  setObjData,
  setValidationErrors,
  resetObjData,
  resetValidationErrors,
} from "@/slices/ewp/quality-assurance/perencanaan/tim/timEWPQualityAssuranceSlice";
import { useSelector } from "react-redux";
import { useTim } from "@/data/ewp/quality-assurance/perencanaan/tim";
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
import timEWPQualityAssuranceSchema from "@/helpers/schemas/ewp/quality-assurance/tim/timEWPQualityAssuranceSchema";
import useUser from "@/data/useUser";
import { useLandingStatus } from "@/data/ewp/common";

const routes = [
  {
    name: "Latar Belakang",
    slug: "latar-belakang",
  },
  {
    name: "Tujuan",
    slug: "tujuan",
  },
  { name: "Analisa", slug: "analisa" },
  { name: "Tim", slug: "tim" },
  { name: "UKER Assessment", slug: "uker-assessment" },
  { name: "Analisis Perencanaan", slug: "analisis-perencanaan" },
  { name: "Penugasan", slug: "penugasan" },
  { name: "Jadwal", slug: "jadwal" },
  { name: "Anggaran", slug: "anggaran" },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const pathName = `${baseUrl}/perencanaan`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);
  const [isOnProgress, setIsOnProgress] = useState(false);

  const payload = useSelector((state) => state.timEWPQualityAssurance.objData);
  const validation = useSelector(
    (state) => state.timEWPQualityAssurance.validationErrors
  );

  const { user } = useUser();
  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { landingStatus } = useLandingStatus({
    module: "qa",
    submodule: "mapa",
    id: params?.id,
  });
  const { tim, timMutate, timError } = useTim({
    id: params?.id,
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/quality-assurance" },
      {
        name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
        path: baseUrl + "/info",
      },
      {
        name: `Perencanaan Kegiatan`,
        path: pathName,
      },
      {
        name: `Tim Review`,
        path: `${pathName}/tim`,
      },
    ]);
    setIsCloseSubmodule(
      Boolean(auditInfo?.data?.realisasi?.penyusunan_mapa_real_end)
    );
  }, [auditInfo]);

  useEffect(() => {
    if (landingStatus?.data) {
      setIsOnProgress(
        Boolean(landingStatus?.data?.status_persetujuan_name == "On Progress")
      );
    }
  }, [landingStatus]);

  useEffect(() => {
    if (!timError) {
      const mappingInitiator = [auditInfo?.data?.project_info?.initiator];
      const mappingKTA = tim?.data?.tim_audit?.kta?.length
        ? tim?.data?.tim_audit?.kta?.map((v) => {
            const { pn, nama, is_initiator } = v;
            return {
              pn,
              nama,
              is_initiator,
            };
          })
        : [];
      const mappingMA = tim?.data?.tim_audit?.ma?.length
        ? tim?.data?.tim_audit?.ma?.map((v) => {
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
              mandays: convertIntegerToDecimal(mandays).decimal,
              deskripsi,
            };
          })
        : [];
      dispatch(
        setObjData({
          initiator: mappingInitiator,
          kta: mappingKTA,
          ma: mappingMA,
          ata: mappingATA,
        })
      );
      setIsInitiator(
        Boolean(auditInfo?.data?.project_info?.initiator?.pn === user?.data?.pn)
      );
    } else {
      dispatch(resetObjData());
      setIsInitiator(false);
    }
  }, [tim, auditInfo, user]);

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
      schema: timEWPQualityAssuranceSchema,
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
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/mapa/tim_audit/${params?.id}`,
        { tim_audit: _.omit(objPayload, ["initiator"]) }
      );
      timMutate();
      loadingSwal("close");
    }
  };

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Tim Review" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/analisa"}
          nextUrl={"/uker-assessment"}
          marginLeft={"-67px"}
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
            property={"ma"}
            title={"Manajer Review"}
            textColorTitle={"text-atlasian-blue-light"}
            handleAdd={handleAddObjectInsideArray}
            handleDelete={handleDeleteObjectInsideArray}
            handleChangeSelect={handleChangeSelectValueObjectInsideArray}
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
            property={"kta"}
            title={"Ketua Tim Review"}
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
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;
