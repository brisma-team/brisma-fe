import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
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
  setObjData,
  setObjPayloadLingkupPemeriksaan,
  setObjPayloadRisk,
  setObjPayloadControl,
  setValidationErrorsLingkupPemeriksaan,
  setValidationErrorsRisk,
  setValidationErrorsControl,
  resetObjData,
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
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import {
  ModalAddControl,
  ModalAddLingkupPemeriksaan,
  ModalAddRisk,
  TablePemeriksaan,
} from "@/components/molecules/ewp/konsulting/perencanaan/program-kerja";
import { useLingkupPemeriksaan } from "@/data/ewp/konsulting/perencanaan/program-kerja";
import {
  addLingkupPemeriksaanSchema,
  addRiskSchema,
  addControlSchema,
} from "@/helpers/schemas/ewp/konsulting/perencanaan/programKerjaEWPKonsultingSchema";

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
  const navigationTabItems = [
    { idx: 1, title: "Pemeriksaan" },
    { idx: 2, title: "Ringkasan" },
  ];

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [expansionMap, setExpansionMap] = useState({});
  const [showModalLingkupPemeriksaan, setShowModalLingkupPemeriksaan] =
    useState(false);
  const [showModalRisk, setShowModalRisk] = useState(false);
  const [showModalControl, setShowModalControl] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [currentContentStage, setCurrentContentStage] = useState(1);

  const [selectedId, setSelectedId] = useState("");
  const [selectedLingkupPemeriksaan, setSelectedLingkupPemeriksaan] =
    useState("");
  const [selectedRisk, setSelectedRisk] = useState("");

  const data = useSelector((state) => state.programKerjaEWPKonsulting.objData);
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

  const { projectDetail } = useProjectDetail({ id });
  const { lingkupPemeriksaan, lingkupPemeriksaanMutate } =
    useLingkupPemeriksaan({ id });

  useEffect(() => {
    console.log("data => ", data);
  }, [data]);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting/overview" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `${baseUrl}/${projectDetail?.data?.project_info?.project_id}`,
      },
      {
        name: `Perencanaan Kegiatan`,
        path: `${baseUrl}/${projectDetail?.data?.project_info?.project_id}/perencanaan`,
      },
      {
        name: `Program Kerja`,
        path: `${baseUrl}/${projectDetail?.data?.project_info?.project_id}/perencanaan/anggaran`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (lingkupPemeriksaan?.data?.length) {
      const mappingLingkupPemeriksaan = lingkupPemeriksaan?.data?.map(
        (parent) => {
          return {
            id: parent?.id,
            name: parent?.judul_lingkup_pemeriksaan,
            is_review: parent?.is_review,
            role: "parent",
            children: parent?.mapa_uker_mcr?.length
              ? parent?.mapa_uker_mcr?.map((parent_child) => {
                  return {
                    id: parent_child?.id,
                    name: `${parent_child?.ref_risk_issue_kode} - ${parent_child?.ref_risk_issue_name}`,
                    is_review: parent_child?.is_review,
                    role: "parent-child",
                    children: parent_child?.mapa_uker_mcr_control?.length
                      ? parent_child?.mapa_uker_mcr_control?.map((child) => {
                          return {
                            id: child?.id,
                            name: `${child?.mtd_control_kode} - ${child?.mtd_control?.nama}`,
                            is_review: child?.is_review,
                            role: "child",
                            pic: child?.nama_pic,
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
      dispatch(setObjData(mappingLingkupPemeriksaan));
    } else {
      dispatch(resetObjData());
    }
  }, [lingkupPemeriksaan]);

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
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/lingkup_pemeriksaan/${id}`,
        payloadLingkupPemeriksaan
      );

      lingkupPemeriksaanMutate();
      setShowModalLingkupPemeriksaan(false);
      dispatch(resetObjPayloadLingkupPemeriksaan());
      dispatch(resetValidationErrorsLingkupPemeriksaan());
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
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/lingkup_pemeriksaan/risk/${selectedId}`,
        payload
      );

      lingkupPemeriksaanMutate();
      setShowModalRisk(false);
      dispatch(resetObjPayloadRisk());
      dispatch(resetValidationErrorsRisk());
    }
  };
  // [ END ] handler for modal risk

  // [ START ] handler for modal control
  const handleAddControl = (id) => {
    setShowModalControl(true);
    setSelectedId(id);
  };

  const handleAddSelectControl = () => {
    const updatedData = [...payloadControl];
    updatedData.push({ kode: "", nama: "" });
    dispatch(setObjPayloadControl(updatedData));
  };

  const handleChangeSelectControl = (index, value) => {
    const updatedData = [...payloadControl];
    updatedData[index] = value;
    dispatch(setObjPayloadControl(updatedData));
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
      const payload = payloadControl?.map((v) => {
        const { kode } = v;
        return { kode };
      });

      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/lingkup_pemeriksaan/control/${selectedId}`,
        payload
      );

      lingkupPemeriksaanMutate();
      setShowModalControl(false);
      dispatch(resetObjPayloadControl());
      dispatch(resetValidationErrorsControl());
    }
  };
  // [ END ] handler for modal control

  // [ START ] handler for table
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
      { id }
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
      { id }
    );

    lingkupPemeriksaanMutate();
    loadingSwal("close");
  };
  // [ END ] handler for table

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
        setCurrentStage={setCurrentContentStage}
        width={"w-48"}
      />
      {/* Start Content */}
      <div className="w-full">
        <Card>
          <div className="px-4 py-2 w-full">
            <TablePemeriksaan
              data={data}
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
        showModal={showModalControl}
        selectedRisk={selectedRisk}
        validation={validationErrorsControl}
        handleAddSelect={handleAddSelectControl}
        handleChangeSelect={handleChangeSelectControl}
        handleDeleteSelect={handleDeleteSelectControl}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmitControl}
      />
    </LandingLayoutEWPConsulting>
  );
};

export default index;
