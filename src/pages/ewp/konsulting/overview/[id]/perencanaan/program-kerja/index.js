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
  setObjPayloadLingkupPemeriksaan,
  setObjPayloadRisk,
  setObjPayloadControl,
  setValidationErrorsLingkupPemeriksaan,
  setValidationErrorsRisk,
  setValidationErrorsControl,
  resetObjDataPemeriksaan,
  resetObjDataRingkasan,
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
  CardFilterTable,
  TableRingkasan,
} from "@/components/molecules/ewp/konsulting/perencanaan/program-kerja";
import {
  useLingkupPemeriksaan,
  useRingkasan,
} from "@/data/ewp/konsulting/perencanaan/program-kerja";
import {
  addLingkupPemeriksaanSchema,
  addRiskSchema,
  addControlSchema,
} from "@/helpers/schemas/ewp/konsulting/perencanaan/programKerjaEWPKonsultingSchema";
import _ from "lodash";

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

  const [filter, setFilter] = useState({
    judul_lingkup: "",
    pn_pic: "",
    risk: "",
    control: "",
  });
  const [params, setParams] = useState({
    judul_lingkup: "",
    pn_pic: "",
    risk: "",
    control: "",
  });

  const dataPemeriksaan = useSelector(
    (state) => state.programKerjaEWPKonsulting.objDataPemeriksaan
  );
  const dataRingkasan = useSelector(
    (state) => state.programKerjaEWPKonsulting.objDataRingkasan
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

  const { projectDetail } = useProjectDetail({ id });
  const { lingkupPemeriksaan, lingkupPemeriksaanMutate } =
    useLingkupPemeriksaan({ id, ...params });
  const { ringkasan } = useRingkasan({ id, ...params });

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
        name: `Program Kerja`,
        path: `${baseUrl}/perencanaan/anggaran`,
      },
    ]);
  }, [projectDetail]);

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
                      nama: parent_child?.ref_risk_issue_name,
                    },
                    is_review: parent_child?.is_review,
                    role: "parent-child",
                    children: parent_child?.mapa_uker_mcr_control?.length
                      ? parent_child?.mapa_uker_mcr_control?.map((child) => {
                          return {
                            id: child?.id,
                            control: {
                              kode: child?.mtd_control_kode,
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
          auditor: v?.nama_pic,
          lingkup_pemeriksaan:
            v?.mapa_uker_mcr?.lingkup_pemeriksaan?.judul_lingkup_pemeriksaan,
          risk: {
            kode: v?.mapa_uker_mcr?.ref_risk_issue_kode,
            nama: v?.mapa_uker_mcr?.ref_risk_issue_name,
          },
          control: { kode: v?.mtd_control_kode, nama: v?.mtd_control?.nama },
          uraian: v?.uraian,
        };
      });
      dispatch(setObjDataRingkasan(mapping));
    } else {
      dispatch(resetObjDataRingkasan());
    }
  }, [ringkasan]);

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  useEffect(() => {
    const findChildrenById = (parentId, currentData) => {
      for (const item of currentData) {
        if (item.id === parentId) {
          if (item.children && item.children.length > 0) {
            const mapping = item.children.map((v) => {
              const { control, pic } = v;
              return {
                kode: control?.kode,
                nama: control?.nama,
                pn_pic: pic?.pn,
                nama_pic: pic?.nama,
                is_default: true,
              };
            });

            return mapping;
          } else {
            return [];
          }
        } else if (item.children && item.children.length > 0) {
          const result = findChildrenById(parentId, item.children);
          if (result.length > 0) {
            return result;
          }
        }
      }
      return [];
    };

    if (showModalControl && selectedId && dataPemeriksaan) {
      const mappingControl = findChildrenById(selectedId, dataPemeriksaan);
      dispatch(setObjPayloadControl(mappingControl));
    } else {
      dispatch(resetObjPayloadControl());
    }
  }, [showModalControl, selectedId, dataPemeriksaan]);

  const handleChangeTab = (index) => {
    setFilter({
      judul_lingkup: "",
      pn_pic: "",
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
  const handleChangeTextFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };

  const handleChangeSelectFilter = (props, value) => {
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
    const newData = [...payloadControl];
    const updatedData = {
      ...newData[index],
      kode: value.kode,
      nama: value.nama,
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
      setShowModalControl(false);
      dispatch(resetObjPayloadControl());
      dispatch(resetValidationErrorsControl());
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
        handleChangeSelect={handleChangeSelectFilter}
        handleChangeText={handleChangeTextFilter}
        handleReset={handleResetFilter}
      />
      {/* Start Content */}
      <div className="w-full mt-4">
        {currentContentStage === 1 ? (
          <Card>
            <div className="px-4 py-2 w-full">
              <TablePemeriksaan
                data={dataPemeriksaan}
                pathName={`/ewp/konsulting/overview/${id}/perencanaan/program-kerja`}
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
          <TableRingkasan data={dataRingkasan} />
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
