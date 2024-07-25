import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PrevNextNavigation } from "@/components/molecules/commons";
import {
  setObjData,
  setObjDataTeam,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjDataTeam,
  resetObjPayload,
  resetValidationErrors,
} from "@/slices/ewp/quality-assurance/perencanaan/penugasanEWPQualityAssuranceSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  confirmationSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import { useLandingStatus } from "@/data/ewp/common";
import useUser from "@/data/useUser";
import {
  usePenugasan,
  usePetugas,
} from "@/data/ewp/quality-assurance/perencanaan/penugasan";
import _ from "lodash";
import {
  ModalDetailPetugas,
  ModalEditPetugas,
  TablePenugasan,
} from "@/components/molecules/ewp/quality-assurance/perencanaan/penugasan";
import penugasanEWPQualityAssuranceSchema from "@/helpers/schemas/ewp/quality-assurance/penugasanEWPQualityAssuranceSchema";
import { useTim } from "@/data/ewp/quality-assurance/perencanaan/tim";

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
  const [showModalDetailPetugas, setShowModalDetailPetugas] = useState(false);
  const [showModalEditPetugas, setShowModalEditPetugas] = useState(false);
  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isInitiator, setIsInitiator] = useState(true);
  const [isOnProgress, setIsOnProgress] = useState(true);

  const [expansionMap, setExpansionMap] = useState({});
  const [selectedId, setSelectedId] = useState(0);

  const data = useSelector(
    (state) => state.penugasanEWPQualityAssurance.objData
  );
  const dataTeam = useSelector(
    (state) => state.penugasanEWPQualityAssurance.objDataTeam
  );
  const payload = useSelector(
    (state) => state.penugasanEWPQualityAssurance.objPayload
  );
  const validation = useSelector(
    (state) => state.penugasanEWPQualityAssurance.validationErrors
  );

  const { user } = useUser();
  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { landingStatus } = useLandingStatus({
    module: "qa",
    submodule: "mapa",
    id: params?.id,
  });
  const { penugasan, penugasanMutate } = usePenugasan({
    id: params?.id,
  });
  const { tim } = useTim({ id: params?.id });
  const { petugas } = usePetugas({ id: selectedId });

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
        name: `Penugasan`,
        path: `${pathName}/penugasan`,
      },
    ]);

    setIsCloseSubmodule(
      Boolean(auditInfo?.data?.realisasi?.penyusunan_mapa_real_end)
    );
    setIsInitiator(
      Boolean(auditInfo?.data?.project_info?.initiator?.pn === user?.data?.pn)
    );
  }, [auditInfo, user]);

  useEffect(() => {
    if (landingStatus?.data) {
      setIsOnProgress(
        Boolean(landingStatus?.data?.status_persetujuan_name == "On Progress")
      );
    }
  }, [landingStatus]);

  useEffect(() => {
    if (penugasan?.data?.length) {
      const mapping = penugasan?.data?.map((uker) => {
        return {
          id: uker?.id,
          branch_kode: uker?.ref_auditee_branch_kode,
          branch_name: uker?.ref_auditee_branch_name,
          orgeh_kode: uker?.ref_auditee_orgeh_kode,
          orgeh_name: uker?.ref_auditee_orgeh_name,
          role: "parent",
          children: uker?.mapa_project_audit?.length
            ? uker?.mapa_project_audit?.map((project) => {
                return {
                  ..._.pick(project, [
                    "id",
                    "project_id",
                    "project_name",
                    "tahun",
                    "mtd_tipe",
                    "mtd_jenis",
                    "analisa",
                  ]),
                  role: "child",
                  pic: { pn: project?.pn_pic, name: project?.name_pic },
                  petugas: project?.mapa_project_petugas,
                };
              })
            : [],
        };
      });
      dispatch(setObjData(mapping));
    } else {
      dispatch(resetObjData());
    }
  }, [penugasan]);

  useEffect(() => {
    if (tim?.data?.tim_audit) {
      const timAuditInfo = tim?.data?.tim_audit;
      const mappingKTA = timAuditInfo?.kta?.length
        ? timAuditInfo?.kta?.map((v) => {
            const { pn, nama } = v;
            return {
              pn,
              nama,
            };
          })
        : [];

      const mappingATA = timAuditInfo?.ata?.length
        ? timAuditInfo?.ata?.map((v) => {
            const { pn, nama } = v;
            return {
              pn,
              nama,
            };
          })
        : [];

      const mergeMapping = [...mappingKTA, ...mappingATA];
      const mapping = mergeMapping?.length
        ? mergeMapping?.map((v) => {
            return { label: v?.nama, value: { pn: v?.pn, name: v?.nama } };
          })
        : [];

      dispatch(setObjDataTeam(mapping));
    } else {
      dispatch(resetObjDataTeam());
    }
  }, [tim]);

  useEffect(() => {
    if (petugas?.data?.length) {
      const mapping = petugas?.data?.map((petugas) => {
        const { pn, nama } = petugas;
        return { pn, nama };
      });
      dispatch(setObjPayload(mapping));
    } else {
      dispatch(resetObjPayload());
    }
  }, [petugas, showModalEditPetugas, showModalDetailPetugas]);

  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModalEditPetugas(false);
    setShowModalDetailPetugas(false);
    dispatch(resetObjPayload());
  };

  // [ START ] handler for modal edit petugas
  const handleAddPetugas = () => {
    const newPetugas = [...payload];
    newPetugas.push({ pn: "", nama: "" });
    dispatch(setObjPayload(newPetugas));
  };

  const handleDeletePetugas = (index) => {
    const newPetugas = [...payload];
    newPetugas.splice(index, 1);
    dispatch(setObjPayload(newPetugas));
  };

  const handleChangePayload = (index, value) => {
    const newData = [...payload];
    const updated = {
      ...newData[index],
      pn: value?.pn,
      nama: value?.name,
    };
    newData[index] = updated;
    dispatch(setObjPayload(newData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const objPayload = { petugas: payload };
    const schemaMapping = {
      schema: penugasanEWPQualityAssuranceSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };
    const validate = setErrorValidation(objPayload, dispatch, schemaMapping);

    if (validate) {
      loadingSwal();
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/mapa/penugasan/petugas/${selectedId}`,
        objPayload
      );

      setShowModalEditPetugas(false);
      penugasanMutate();
      dispatch(resetObjPayload());
      dispatch(resetValidationErrors());
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal edit petugas

  // [ START ] handler for table penugasan
  const handleToggleExpansion = (kode, role) => {
    setExpansionMap((prevState) => ({
      ...prevState,
      [`${kode}-${role}`]: !prevState[`${kode}-${role}`],
    }));
  };

  const handleClickEdit = (id) => {
    setShowModalEditPetugas(true);
    setSelectedId(id);
  };

  const handleClickFieldPetugas = (id) => {
    setShowModalDetailPetugas(true);
    setSelectedId(id);
  };
  // [ END ] handler for table penugasan

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Penugasan" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/analisis-perencanaan"}
          nextUrl={"/jadwal"}
          marginLeft={"-70px"}
        />
      </div>
      {/* Start Content */}
      <TablePenugasan
        isInitiator={isInitiator}
        data={data}
        user={user?.data}
        expansionMap={expansionMap}
        pathName={`/ewp/quality-assurance/${params?.id}/perencanaan/analisis-perencanaan`}
        withoutButton={!(isOnProgress && !isCloseSubmodule && isInitiator)}
        handleClickToggleExpansion={handleToggleExpansion}
        handleClickEdit={handleClickEdit}
        handleClickFieldPetugas={handleClickFieldPetugas}
      />
      <ModalEditPetugas
        dataTeam={dataTeam}
        showModal={showModalEditPetugas}
        payload={payload}
        validation={validation}
        handleCloseModal={handleCloseModal}
        handleClickAdd={handleAddPetugas}
        handleClickDelete={handleDeletePetugas}
        handleChangePayload={handleChangePayload}
        handleSubmit={handleSubmit}
      />
      <ModalDetailPetugas
        payload={payload}
        showModal={showModalDetailPetugas}
        handleCloseModal={handleCloseModal}
      />
      {/* End Content */}
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;
