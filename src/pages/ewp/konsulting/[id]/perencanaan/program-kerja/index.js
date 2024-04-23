import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  PrevNextNavigation,
  NavigationTab,
} from "@/components/molecules/commons";
import { useDispatch } from "react-redux";
import {
  setObjDataPemeriksaan,
  setObjDataRingkasan,
  setObjDataPicControl,
  setObjPayloadLingkupPemeriksaan,
  setObjPayloadRisk,
  setObjPayloadControl,
  setValidationErrorsLingkupPemeriksaan,
  setValidationErrorsRisk,
  setValidationErrorsControl,
  resetObjDataPemeriksaan,
  resetObjDataRingkasan,
  resetObjDataPicControl,
  resetObjPayloadLingkupPemeriksaan,
  resetObjPayloadRisk,
  resetObjPayloadControl,
  resetValidationErrorsLingkupPemeriksaan,
  resetValidationErrorsRisk,
  resetValidationErrorsControl,
} from "@/slices/ewp/konsulting/perencanaan/programKerjaEWPKonsultingSlice";
import { useSelector } from "react-redux";
import {
  confirmationSwal,
  fetchApi,
  infoSwal,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import {
  ModalAddControl,
  ModalAddLingkupPemeriksaan,
  ModalAddRisk,
  TablePemeriksaan,
  CardFilterTable,
  TableRingkasan,
} from "@/components/molecules/ewp/konsulting/perencanaan/program-kerja";
import {
  useLingkupPemeriksaan,
  useListControl,
  useRingkasan,
} from "@/data/ewp/konsulting/perencanaan/program-kerja";
import {
  addLingkupPemeriksaanSchema,
  addRiskSchema,
  addControlSchema,
} from "@/helpers/schemas/ewp/konsulting/perencanaan/programKerjaEWPKonsultingSchema";
import _ from "lodash";
import useUser from "@/data/useUser";
import { useTimTimeplan } from "@/data/ewp/konsulting/perencanaan/tim-timeplan";

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
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/konsulting/${params?.id}`;
  const pathName = `${baseUrl}/perencanaan`;
  const navigationTabItems = [
    { idx: 1, title: "Pemeriksaan" },
    { idx: 2, title: "Ringkasan" },
  ];

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [expansionMap, setExpansionMap] = useState({});
  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [showModalLingkupPemeriksaan, setShowModalLingkupPemeriksaan] =
    useState(false);
  const [showModalRisk, setShowModalRisk] = useState(false);
  const [showModalControl, setShowModalControl] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);

  const [selectedId, setSelectedId] = useState("");
  const [selectedLingkupPemeriksaan, setSelectedLingkupPemeriksaan] =
    useState("");
  const [selectedRiskId, setSelectedRiskId] = useState("");
  const [selectedRisk, setSelectedRisk] = useState("");

  const [filter, setFilter] = useState({
    judul_lingkup: "",
    pic: "",
    risk: "",
    control: "",
  });
  const [paramsFilter, setParamsFilter] = useState({
    judul_lingkup: "",
    pic: "",
    risk: "",
    control: "",
  });

  const dataPemeriksaan = useSelector(
    (state) => state.programKerjaEWPKonsulting.objDataPemeriksaan
  );
  const dataRingkasan = useSelector(
    (state) => state.programKerjaEWPKonsulting.objDataRingkasan
  );
  const dataPIC = useSelector(
    (state) => state.programKerjaEWPKonsulting.objDataPicControl
  );
  const payloadLingkupPemeriksaan = useSelector(
    (state) => state.programKerjaEWPKonsulting.objPayloadLingkupPemeriksaan
  );
  const payloadRisk = useSelector(
    (state) => state.programKerjaEWPKonsulting.objPayloadRisk
  );
  const payloadControl = useSelector(
    (state) => state.programKerjaEWPKonsulting.objPayloadControl
  );
  const validationErrorsLingkupPemeriksaan = useSelector(
    (state) =>
      state.programKerjaEWPKonsulting.validationErrorsLingkupPemeriksaan
  );
  const validationErrorsRisk = useSelector(
    (state) => state.programKerjaEWPKonsulting.validationErrorsRisk
  );
  const validationErrorsControl = useSelector(
    (state) => state.programKerjaEWPKonsulting.validationErrorsControl
  );

  const { user } = useUser();
  const { projectDetail } = useProjectDetail({ id: params?.id });
  const { lingkupPemeriksaan, lingkupPemeriksaanMutate } =
    useLingkupPemeriksaan({ id: params?.id, ...paramsFilter });
  const { ringkasan } = useRingkasan({ id: params?.id, ...paramsFilter });
  const { timTimeplan, timTimeplanError } = useTimTimeplan({
    id: params?.id,
  });
  const { listControl, listControlMutate } = useListControl({
    id: selectedRiskId,
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
        name: `Program Kerja`,
        path: `${pathName}/program-kerja`,
      },
    ]);
    setIsCloseSubmodule(
      Boolean(projectDetail?.data?.realisasi?.penyusunan_mapa_real_end)
    );
    setIsInitiator(
      Boolean(
        projectDetail?.data?.project_info?.initiator?.pn === user?.data?.pn
      )
    );
  }, [projectDetail, user]);

  useEffect(() => {
    if (lingkupPemeriksaan?.data?.length) {
      const mappingLingkupPemeriksaan = lingkupPemeriksaan?.data?.map(
        (parent) => {
          return {
            id: parent?.id,
            lingkup_pemeriksaan: parent?.judul_lingkup_pemeriksaan,
            is_review: parent?.is_review,
            role: "parent",
            children: parent?.mapa_uker_mcr?.length
              ? parent?.mapa_uker_mcr?.map((parent_child) => {
                  return {
                    id: parent_child?.id,
                    risk: {
                      kode: parent_child?.ref_risk_issue_kode,
                      abbr: parent_child?.mtd_risk_issue?.abbr,
                      nama: parent_child?.mtd_risk_issue?.nama,
                    },
                    is_review: parent_child?.is_review,
                    role: "parent-child",
                    children: parent_child?.mapa_uker_mcr_control?.length
                      ? parent_child?.mapa_uker_mcr_control?.map((child) => {
                          return {
                            id: child?.id,
                            control: {
                              kode: child?.mtd_control_kode,
                              abbr: child?.mtd_control?.abbr,
                              nama: child?.mtd_control?.nama,
                            },
                            is_review: child?.is_review,
                            role: "child",
                            pic: { pn: child?.pn_pic, nama: child?.nama_pic },
                            uraian: child?.uraian,
                          };
                        })
                      : [],
                  };
                })
              : [],
          };
        }
      );
      dispatch(setObjDataPemeriksaan(mappingLingkupPemeriksaan));
    } else {
      dispatch(resetObjDataPemeriksaan());
    }
  }, [lingkupPemeriksaan]);

  useEffect(() => {
    if (ringkasan?.data?.length) {
      const mapping = ringkasan?.data?.map((v) => {
        return {
          id: v?.id,
          auditor: { pn: v?.pn_pic, nama: v?.nama_pic },
          lingkup_pemeriksaan:
            v?.mapa_uker_mcr?.lingkup_pemeriksaan?.judul_lingkup_pemeriksaan,
          risk: {
            abbr: v?.mapa_uker_mcr?.mtd_risk_issue?.abbr,
            nama: v?.mapa_uker_mcr?.mtd_risk_issue?.nama,
          },
          control: { abbr: v?.mtd_control?.abbr, nama: v?.mtd_control?.nama },
          uraian: v?.uraian,
        };
      });
      dispatch(setObjDataRingkasan(mapping));
    } else {
      dispatch(resetObjDataRingkasan());
    }
  }, [ringkasan]);

  useEffect(() => {
    if (!timTimeplanError) {
      const timAuditInfo = timTimeplan?.data?.tim_audit;
      const mappingAuditor = timAuditInfo?.auditor?.length
        ? timAuditInfo?.auditor?.map((v) => {
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

      const mergeMapping = [...mappingAuditor, ...mappingATA];
      const mapping = mergeMapping?.length
        ? mergeMapping?.map((v) => {
            return { label: v?.nama, value: { pn: v?.pn, name: v?.nama } };
          })
        : [];
      dispatch(setObjDataPicControl(mapping));
    } else {
      dispatch(resetObjDataPicControl());
    }
  }, [timTimeplan]);

  useEffect(() => {
    const handleSearch = () => {
      setParamsFilter(filter);
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  useEffect(() => {
    if (showModalControl && listControl?.data?.length) {
      const mappingControl = listControl?.data?.map((control) => {
        const { mtd_control, pn_pic, nama_pic } = control;
        return {
          kode: mtd_control?.kode,
          abbr: mtd_control?.abbr,
          nama: mtd_control?.nama,
          pn_pic,
          nama_pic,
          is_default: true,
        };
      });
      dispatch(setObjPayloadControl(mappingControl));
    } else {
      dispatch(resetObjPayloadControl());
    }
  }, [showModalControl, listControl]);

  const handleChangeTab = (index) => {
    setFilter({
      judul_lingkup: "",
      pic: "",
      risk: "",
      control: "",
    });
    setShowFilter(false);
    setCurrentContentStage(index);
  };

  const handleToggleExpansion = (kode, role) => {
    setExpansionMap((prevState) => ({
      ...prevState,
      [`${kode}-${role}`]: !prevState[`${kode}-${role}`],
    }));
  };

  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setSelectedId(0);
    setSelectedLingkupPemeriksaan("");
    setSelectedRisk("");
    setShowModalLingkupPemeriksaan(false);
    setShowModalRisk(false);
    setShowModalControl(false);
    dispatch(resetObjPayloadLingkupPemeriksaan());
    dispatch(resetObjPayloadRisk());
    dispatch(resetObjPayloadControl());
    dispatch(resetValidationErrorsLingkupPemeriksaan());
    dispatch(resetValidationErrorsRisk());
    dispatch(resetValidationErrorsControl());
  };

  const handleClickReview = async (e, id, role) => {
    let type;
    if (role === "parent") {
      type = "lingkup";
    } else if (role === "parent-child") {
      type = "risk";
    } else if (role === "child") {
      type = "control";
    }

    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/lingkup_pemeriksaan/review/${id}?type=${type}`,
      {},
      true
    );

    lingkupPemeriksaanMutate();
  };

  // [ START ] handler for filter
  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };

  const handleResetFilter = (props) => {
    setFilter({ ...filter, [props]: "" });
  };
  // [ END ] handler for filter

  // [ START ] handler for modal lingkup pemeriksaan
  const handleAddLingkupPemeriksaan = (id) => {
    setShowModalLingkupPemeriksaan(true);
    setSelectedId(id);
  };

  const handleChangeTextLingkupPemeriksaan = (property, value) => {
    const updatedData = {
      ...payloadLingkupPemeriksaan,
      [property]: value,
    };
    dispatch(setObjPayloadLingkupPemeriksaan(updatedData));
  };

  const handleSubmitLingkupPemeriksaan = async (e) => {
    e.preventDefault();
    if (payloadLingkupPemeriksaan?.judul_lingkup_pemeriksaan?.length > 255) {
      await infoSwal("Jumlah karakter melebihi batas!");
      return;
    }

    const schemaMappings = {
      schema: addLingkupPemeriksaanSchema,
      resetErrors: resetValidationErrorsLingkupPemeriksaan,
      setErrors: setValidationErrorsLingkupPemeriksaan,
    };

    const validate = setErrorValidation(
      payloadLingkupPemeriksaan,
      dispatch,
      schemaMappings
    );

    if (validate) {
      loadingSwal();
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/lingkup_pemeriksaan/${params?.id}`,
        payloadLingkupPemeriksaan
      );

      lingkupPemeriksaanMutate();
      setShowModalLingkupPemeriksaan(false);
      dispatch(resetObjPayloadLingkupPemeriksaan());
      dispatch(resetValidationErrorsLingkupPemeriksaan());
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal lingkup pemeriksaan

  // [ START ] handler for modal risk
  const handleAddRisk = (id) => {
    setShowModalRisk(true);
    setSelectedId(id);
  };

  const handleChangeSelectRisk = (e) => {
    dispatch(setObjPayloadRisk(e.value));
  };

  const handleResetRisk = (e) => {
    dispatch(setObjPayloadRisk(e.value));
  };

  const handleSubmitRisk = async (e) => {
    e.preventDefault();
    const schemaMappings = {
      schema: addRiskSchema,
      resetErrors: resetValidationErrorsRisk,
      setErrors: setValidationErrorsRisk,
    };

    const payload = { kode: payloadRisk?.kode?.toString() };
    const validate = setErrorValidation(payload, dispatch, schemaMappings);

    if (validate) {
      loadingSwal();
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/lingkup_pemeriksaan/risk/${selectedId}`,
        payload
      );

      lingkupPemeriksaanMutate();
      setShowModalRisk(false);
      dispatch(resetObjPayloadRisk());
      dispatch(resetValidationErrorsRisk());
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal risk

  // [ START ] handler for modal control
  const handleAddControl = (id) => {
    setShowModalControl(true);
    setSelectedRiskId(id);
  };

  const handleAddSelectControl = () => {
    const updatedData = [...payloadControl];
    updatedData.push({ kode: "", nama: "", abbr: "" });
    dispatch(setObjPayloadControl(updatedData));
  };

  const handleChangeSelectControl = (index, value) => {
    const newData = [...payloadControl];
    const updatedData = {
      ...newData[index],
      kode: value.kode,
      nama: value.nama,
      abbr: value.abbr,
    };
    newData[index] = updatedData;
    dispatch(setObjPayloadControl(newData));
  };

  const handleChangeSelectPIC = (index, value) => {
    const newData = [...payloadControl];
    const updatedData = {
      ...newData[index],
      pn_pic: value.pn,
      nama_pic: value.name,
    };
    newData[index] = updatedData;
    dispatch(setObjPayloadControl(newData));
  };

  const handleDeleteSelectControl = (index) => {
    const updatedData = [...payloadControl];
    updatedData.splice(index, 1);
    dispatch(setObjPayloadControl(updatedData));
  };

  const handleSubmitControl = async (e) => {
    e.preventDefault();
    const schemaMappings = {
      schema: addControlSchema,
      resetErrors: resetValidationErrorsControl,
      setErrors: setValidationErrorsControl,
    };

    const validate = setErrorValidation(
      payloadControl,
      dispatch,
      schemaMappings
    );

    if (validate) {
      loadingSwal();
      const payload = payloadControl?.map((v) => {
        const { kode, pn_pic, nama_pic } = v;
        return { kode, pn_pic, nama_pic };
      });

      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/lingkup_pemeriksaan/control/${selectedId}`,
        payload
      );

      lingkupPemeriksaanMutate();
      listControlMutate();
      setShowModalControl(false);
      dispatch(resetObjPayloadControl());
      dispatch(resetValidationErrorsControl());
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal control

  // [ START ] handler for table pemeriksaan
  const handleSelectedLingkupPemeriksaan = (id, name) => {
    setSelectedId(id);
    setSelectedLingkupPemeriksaan(name);
  };

  const handleSelectedRisk = (id, name) => {
    setSelectedId(id);
    setSelectedRisk(name);
  };

  const handleClickDeleteLingkupPemeriksaan = async (lingkup_id) => {
    const confirm = await confirmationSwal(
      "Menghapus LINGKUP PEMERIKSAAN akan menghapus seluruh RESIKO dan CONTROL yang terkait."
    );

    if (!confirm.value) {
      return;
    }
    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/lingkup_pemeriksaan/delete/${lingkup_id}`,
      {}
    );

    lingkupPemeriksaanMutate();
    loadingSwal("close");
  };

  const handleClickDeleteRisk = async (risk_id) => {
    const confirm = await confirmationSwal(
      "Menghapus RESIKO akan menghapus seluruh Risk Issue terkait."
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/lingkup_pemeriksaan/risk/delete/${risk_id}`,
      { id: params?.id }
    );

    lingkupPemeriksaanMutate();
    loadingSwal("close");
  };

  const handleClickDeleteControl = async (control_id) => {
    const confirm = await confirmationSwal(
      "Menghapus CONTROL akan menghapus seluruh dokumen terkait."
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/lingkup_pemeriksaan/control/delete/${control_id}`,
      { id: params?.id }
    );

    lingkupPemeriksaanMutate();
    listControlMutate();
    loadingSwal("close");
  };
  // [ END ] handler for table pemeriksaan

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle text="Program Kerja" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/anggaran"}
          nextUrl={"/dokumen"}
          marginLeft={"-60px"}
        />
      </div>
      <NavigationTab
        items={navigationTabItems}
        currentStage={currentContentStage}
        width={"w-48"}
        handleChange={handleChangeTab}
      />
      <div className="w-36 rounded bg-atlasian-blue-light -mt-1">
        <ButtonField
          handler={() => setShowFilter(!showFilter)}
          text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
        />
      </div>
      <CardFilterTable
        filter={filter}
        showFilter={showFilter}
        handleChange={handleChangeFilter}
        handleReset={handleResetFilter}
      />
      {/* Start Content */}
      <div className="w-full mt-4">
        {currentContentStage === 1 ? (
          <Card>
            <div className="px-4 py-2 w-full">
              <TablePemeriksaan
                data={dataPemeriksaan}
                user={user?.data}
                isInitiator={isInitiator}
                withoutButton={!(isInitiator && !isCloseSubmodule)}
                pathName={`/ewp/konsulting/${params?.id}/perencanaan/program-kerja`}
                expansionMap={expansionMap}
                handleSelectedLingkupPemeriksaan={
                  handleSelectedLingkupPemeriksaan
                }
                handleSelectedRisk={handleSelectedRisk}
                handleClickToggleExpansion={handleToggleExpansion}
                handleClickReview={handleClickReview}
                handleClickAddLingkupPemeriksaan={handleAddLingkupPemeriksaan}
                handleClickAddRisk={handleAddRisk}
                handleClickAddControl={handleAddControl}
                handleClickDeleteLingkupPemeriksaan={
                  handleClickDeleteLingkupPemeriksaan
                }
                handleClickDeleteRisk={handleClickDeleteRisk}
                handleClickDeleteControl={handleClickDeleteControl}
              />
            </div>
          </Card>
        ) : (
          <TableRingkasan
            data={dataRingkasan}
            user={user?.data}
            isInitiator={isInitiator}
            pathName={`/ewp/konsulting/${params?.id}/perencanaan/program-kerja`}
          />
        )}
      </div>

      {/* End Content */}
      <ModalAddLingkupPemeriksaan
        data={payloadLingkupPemeriksaan}
        showModal={showModalLingkupPemeriksaan}
        validation={validationErrorsLingkupPemeriksaan}
        handleChangeText={handleChangeTextLingkupPemeriksaan}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmitLingkupPemeriksaan}
      />
      <ModalAddRisk
        data={payloadRisk}
        showModal={showModalRisk}
        selectedLingkupPemeriksaan={selectedLingkupPemeriksaan}
        validation={validationErrorsRisk}
        handleAdd
        handleChangeSelect={handleChangeSelectRisk}
        handleResetSelect={handleResetRisk}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmitRisk}
      />
      <ModalAddControl
        data={payloadControl}
        dataPIC={dataPIC}
        showModal={showModalControl}
        selectedRisk={selectedRisk}
        validation={validationErrorsControl}
        handleAddSelect={handleAddSelectControl}
        handleChangeSelectControl={handleChangeSelectControl}
        handleChangeSelectPIC={handleChangeSelectPIC}
        handleDeleteSelect={handleDeleteSelectControl}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmitControl}
      />
    </LandingLayoutEWPConsulting>
  );
};

export default index;
