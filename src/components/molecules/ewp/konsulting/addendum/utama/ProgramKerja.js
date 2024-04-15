import { ButtonField, Card } from "@/components/atoms";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setObjDataPemeriksaan,
  setObjDataPicControl,
  setObjPayloadLingkupPemeriksaan,
  setObjPayloadRisk,
  setObjPayloadControl,
  setValidationErrorsLingkupPemeriksaan,
  setValidationErrorsRisk,
  setValidationErrorsControl,
  resetObjDataPemeriksaan,
  resetObjDataPicControl,
  resetObjPayloadLingkupPemeriksaan,
  resetObjPayloadRisk,
  resetObjPayloadControl,
  resetValidationErrorsLingkupPemeriksaan,
  resetValidationErrorsRisk,
  resetValidationErrorsControl,
} from "@/slices/ewp/konsulting/addendum/utama/programKerjaAddendumEWPKonsultingSlice";
import {
  confirmationSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import {
  ModalAddLingkupPemeriksaan,
  ModalAddRisk,
  ModalAddControl,
  TablePemeriksaan,
  CardFilterTable,
  ModalEditControl,
  ModalEditUraianControl,
  ModalEditLingkupPemeriksaan,
} from "@/components/molecules/ewp/konsulting/addendum/utama/program-kerja";
import {
  useControlDetail,
  useLingkupDetail,
  useProgramKerja,
  useTimTimeplan,
} from "@/data/ewp/konsulting/addendum/utama";
import {
  addLingkupPemeriksaanSchema,
  addRiskSchema,
  addControlSchema,
  editControlSchema,
} from "@/helpers/schemas/ewp/konsulting/perencanaan/programKerjaEWPKonsultingSchema";
import _ from "lodash";

const ProgramKerja = ({
  id,
  dataUser,
  isInitiator,
  isCloseSubmodule,
  handleLoadFromMapa,
}) => {
  const dispatch = useDispatch();

  const [showFilter, setShowFilter] = useState(false);
  const [expansionMap, setExpansionMap] = useState({});

  const [showModalLingkupPemeriksaan, setShowModalLingkupPemeriksaan] =
    useState(false);
  const [showModalRisk, setShowModalRisk] = useState(false);
  const [showModalControl, setShowModalControl] = useState(false);
  const [showModalEditLingkupPemeriksaan, setShowModalEditLingkupPemeriksaan] =
    useState(false);
  const [showModalEditControl, setShowModalEditControl] = useState(false);
  const [showModalEditUraian, setShowModalEditUraian] = useState(false);
  // const [isUpdateLingkupPemeriksaan, setIsUpdateLingkupPemeriksaan] =
  //   useState(false);

  const [selectedId, setSelectedId] = useState("");
  const [selectedLingkupPemeriksaanId, setSelectedLingkupPemeriksaanId] =
    useState("");
  const [selectedControlId, setSelectedControlId] = useState("");
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
    (state) => state.programKerjaAddendumEWPKonsulting.objDataPemeriksaan
  );
  const dataPIC = useSelector(
    (state) => state.programKerjaAddendumEWPKonsulting.objDataPicControl
  );
  const payloadLingkupPemeriksaan = useSelector(
    (state) =>
      state.programKerjaAddendumEWPKonsulting.objPayloadLingkupPemeriksaan
  );
  const payloadRisk = useSelector(
    (state) => state.programKerjaAddendumEWPKonsulting.objPayloadRisk
  );
  const payloadControl = useSelector(
    (state) => state.programKerjaAddendumEWPKonsulting.objPayloadControl
  );
  const validationErrorsLingkupPemeriksaan = useSelector(
    (state) =>
      state.programKerjaAddendumEWPKonsulting.validationErrorsLingkupPemeriksaan
  );
  const validationErrorsRisk = useSelector(
    (state) => state.programKerjaAddendumEWPKonsulting.validationErrorsRisk
  );
  const validationErrorsControl = useSelector(
    (state) => state.programKerjaAddendumEWPKonsulting.validationErrorsControl
  );

  const { programKerja, programKerjaMutate } = useProgramKerja({
    id,
    ...params,
  });
  const { timTimeplan, timTimeplanError } = useTimTimeplan({
    id,
  });
  const { lingkupDetail } = useLingkupDetail({
    id: selectedLingkupPemeriksaanId,
  });
  const { controlDetail } = useControlDetail({ id: selectedControlId });

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
    if (programKerja?.data?.lingkup_pemeriksaan?.length) {
      const listUpdated = programKerja?.data?.list_updated;
      const mappingLingkupPemeriksaan =
        programKerja?.data?.lingkup_pemeriksaan?.map((parent) => {
          return {
            id: parent?.id,
            lingkup_pemeriksaan: parent?.judul_lingkup_pemeriksaan,
            role: "parent",
            is_edit: listUpdated?.updated_lingkup?.find(
              (id) => id == parent?.id
            ),
            is_new: Boolean(!parent?.lingkup_origin_id),
            children: parent?.mapa_uker_mcr_adendum?.length
              ? parent?.mapa_uker_mcr_adendum?.map((parent_child) => {
                  return {
                    id: parent_child?.id,
                    is_new: Boolean(!parent_child?.mcr_origin_id),
                    is_delete: Boolean(!parent_child?.is_active),
                    risk: {
                      kode: parent_child?.ref_risk_issue_kode,
                      abbr: parent_child?.mtd_risk_issue?.abbr,
                      nama: parent_child?.mtd_risk_issue?.nama,
                    },
                    role: "parent-child",
                    children: parent_child?.mcr_control_adendum?.length
                      ? parent_child?.mcr_control_adendum?.map((child) => {
                          return {
                            id: child?.id,
                            is_new: Boolean(!child?.control_origin_id),
                            is_edit: listUpdated?.updated_control?.find(
                              (id) => id == child?.id
                            ),
                            is_delete: Boolean(!child?.is_active),
                            control: {
                              kode: child?.mtd_control_kode,
                              abbr: child?.mtd_control?.abbr,
                              nama: child?.mtd_control?.nama,
                            },
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
        });
      dispatch(setObjDataPemeriksaan(mappingLingkupPemeriksaan));
    } else {
      dispatch(resetObjDataPemeriksaan());
    }
  }, [programKerja]);

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
    const findChildrenById = (parentId, currentData) => {
      for (const item of currentData) {
        if (item.id === parentId) {
          if (item.children && item.children.length > 0) {
            const mapping = item.children.map((v) => {
              const { control, pic } = v;
              return {
                kode: control?.kode,
                abbr: control?.abbr,
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

  useEffect(() => {
    if (lingkupDetail?.data) {
      dispatch(
        setObjPayloadLingkupPemeriksaan({
          judul_lingkup_pemeriksaan:
            lingkupDetail?.data?.judul_lingkup_pemeriksaan,
        })
      );
    } else {
      dispatch(resetObjPayloadLingkupPemeriksaan());
    }
  }, [showModalEditLingkupPemeriksaan, lingkupDetail]);

  useEffect(() => {
    if (controlDetail?.data) {
      const response = controlDetail?.data;
      const { pn_pic, nama_pic, uraian } = response;
      const mapping = {
        judul_lingkup_pemeriksaan:
          response?.mapa_uker_mcr_adendum?.lingkup_adendum
            ?.judul_lingkup_pemeriksaan,
        risk: response?.mapa_uker_mcr_adendum?.mtd_risk_issue,
        control: response?.mtd_control,
        pn_pic,
        nama_pic,
        uraian,
      };
      dispatch(setObjPayloadControl(mapping));
    } else {
      dispatch(resetObjPayloadControl());
    }
  }, [showModalEditControl, controlDetail]);

  useEffect(() => {
    console.log("payloadControl => ", payloadControl);
  }, [payloadControl]);

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
    setShowModalEditLingkupPemeriksaan(false);
    setShowModalEditControl(false);
    dispatch(resetObjPayloadLingkupPemeriksaan());
    dispatch(resetObjPayloadRisk());
    dispatch(resetObjPayloadControl());
    dispatch(resetValidationErrorsLingkupPemeriksaan());
    dispatch(resetValidationErrorsRisk());
    dispatch(resetValidationErrorsControl());
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
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/program_kerja/lingkup/${id}`,
        payloadLingkupPemeriksaan
      );

      programKerjaMutate();
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
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/program_kerja/risk/${selectedId}`,
        payload
      );

      programKerjaMutate();
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
      const payload = payloadControl?.map((v) => {
        const { kode, pn_pic, nama_pic } = v;
        return { kode, pn_pic, nama_pic };
      });

      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/program_kerja/control/${selectedId}`,
        payload
      );

      programKerjaMutate();
      setShowModalControl(false);
      dispatch(resetObjPayloadControl());
      dispatch(resetValidationErrorsControl());
    }
  };
  // [ END ] handler for modal control

  // [ START ] handler for modal lingkup pemeriksaan
  const handleCloseModalEditLingkupPemeriksaan = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setSelectedLingkupPemeriksaanId(0);
    setShowModalEditLingkupPemeriksaan(false);
  };

  const handleChangeTextModalEditLingkupPemeriksaan = (property, value) => {
    const updatedData = {
      ...payloadLingkupPemeriksaan,
      [property]: value,
    };
    dispatch(setObjPayloadLingkupPemeriksaan(updatedData));
  };

  const handleSubmitModalEditLingkupPemeriksaan = async (e) => {
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
        "PATCH",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/program_kerja/lingkup/${id}`,
        {
          ...payloadLingkupPemeriksaan,
          lingkup_id: selectedLingkupPemeriksaanId,
        }
      );

      programKerjaMutate();
      setShowModalEditLingkupPemeriksaan(false);
      dispatch(resetObjPayloadLingkupPemeriksaan());
      dispatch(resetValidationErrorsLingkupPemeriksaan());
    }
  };
  // [ END ] handler for modal lingkup pemeriksaan

  // [ START ] handler for modal edit control
  const handleCloseModalEditControl = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setSelectedControlId(0);
    setShowModalEditControl(false);
    dispatch(resetObjPayloadControl());
    dispatch(resetValidationErrorsControl());
  };

  const handleChangePICModalEditControl = (value) => {
    dispatch(
      setObjPayloadControl({
        ...payloadControl,
        pn_pic: value?.pn,
        nama_pic: value?.name,
      })
    );
  };

  const handleChangeUraianModalEditControl = (value) => {
    dispatch(setObjPayloadControl({ ...payloadControl, uraian: value }));
  };

  const handleResetPICModalEditControl = () => {
    dispatch(
      setObjPayloadControl({
        ...payloadControl,
        pn_pic: "",
        nama_pic: "",
      })
    );
  };

  const handleClickUraianModalEditControl = () => {
    setShowModalEditUraian(true);
  };

  const handleSubmitModalEditControl = async (e) => {
    e.preventDefault();
    const payload = _.pick(payloadControl, ["pn_pic", "nama_pic", "uraian"]);
    const schemaMappings = {
      schema: editControlSchema,
      resetErrors: resetValidationErrorsControl,
      setErrors: setValidationErrorsControl,
    };

    const validate = setErrorValidation(payload, dispatch, schemaMappings);

    if (validate) {
      loadingSwal();
      await fetchApi(
        "PATCH",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/program_kerja/control/update/${selectedControlId}`,
        payload
      );

      setShowModalEditControl(false);
      setSelectedControlId(0);
      dispatch(resetObjPayloadControl());
      dispatch(resetValidationErrorsControl());
      programKerjaMutate();
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal edit control

  // [ START ] handler for modal edit uraian control
  const handleCloseModalEditUraianControl = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModalEditUraian(false);
  };

  const handleSubmitModalEditUraianControl = (value) => {
    handleChangeUraianModalEditControl(value);
    setShowModalEditUraian(false);
  };
  // [ END ] handler for modal edit uraian control

  // [ START ] handler for table pemeriksaan
  const handleToggleExpansion = (kode, role) => {
    setExpansionMap((prevState) => ({
      ...prevState,
      [`${kode}-${role}`]: !prevState[`${kode}-${role}`],
    }));
  };

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
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/program_kerja/lingkup/delete/${lingkup_id}`,
      {}
    );

    programKerjaMutate();
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
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/program_kerja/risk/delete/${risk_id}`,
      { id }
    );

    programKerjaMutate();
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
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/program_kerja/control/delete/${control_id}`,
      { id }
    );

    programKerjaMutate();
    loadingSwal("close");
  };

  const handleClickRestoreRisk = async (risk_id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin mengembalikan perubahan data Risk seperti semula?"
    );

    if (!confirm.value) {
      return;
    }
    loadingSwal();
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/program_kerja/risk/restore/${risk_id}`,
      {}
    );

    programKerjaMutate();
    loadingSwal("close");
  };

  const handleClickRestoreControl = async (control_id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin mengembalikan perubahan data Control seperti semula?"
    );

    if (!confirm.value) {
      return;
    }
    loadingSwal();
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/program_kerja/control/restore/${control_id}`,
      {}
    );

    programKerjaMutate();
    loadingSwal("close");
  };

  const handleClickEditLingkupPemeriksaan = (id) => {
    setSelectedLingkupPemeriksaanId(id);
    setShowModalEditLingkupPemeriksaan(true);
  };

  const handleClickEditControl = (id) => {
    setSelectedControlId(id);
    setShowModalEditControl(true);
  };
  // [ END ] handler for table pemeriksaan

  const handleClickHandleFromMapa = async () => {
    await handleLoadFromMapa("program_kerja");
    programKerjaMutate();
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="w-36 rounded bg-atlasian-blue-light">
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
      <Card>
        <div className="px-4 py-2 w-full">
          <TablePemeriksaan
            data={dataPemeriksaan}
            user={dataUser}
            isInitiator={isInitiator}
            withoutButton={!(isInitiator && !isCloseSubmodule)}
            pathName={`/ewp/konsulting/${id}/addendum/utama`}
            expansionMap={expansionMap}
            handleSelectedLingkupPemeriksaan={handleSelectedLingkupPemeriksaan}
            handleSelectedRisk={handleSelectedRisk}
            handleClickToggleExpansion={handleToggleExpansion}
            handleClickAddLingkupPemeriksaan={handleAddLingkupPemeriksaan}
            handleClickAddRisk={handleAddRisk}
            handleClickAddControl={handleAddControl}
            handleClickDeleteLingkupPemeriksaan={
              handleClickDeleteLingkupPemeriksaan
            }
            handleClickDeleteRisk={handleClickDeleteRisk}
            handleClickDeleteControl={handleClickDeleteControl}
            handleClickEditLingkupPemeriksaan={
              handleClickEditLingkupPemeriksaan
            }
            handleClickEditControl={handleClickEditControl}
            handleClickRestoreRisk={handleClickRestoreRisk}
            handleClickRestoreControl={handleClickRestoreControl}
          />
        </div>
      </Card>
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
      <ModalEditLingkupPemeriksaan
        data={payloadLingkupPemeriksaan}
        showModal={showModalEditLingkupPemeriksaan}
        validation={validationErrorsLingkupPemeriksaan}
        handleChangeText={handleChangeTextModalEditLingkupPemeriksaan}
        handleCloseModal={handleCloseModalEditLingkupPemeriksaan}
        handleSubmit={handleSubmitModalEditLingkupPemeriksaan}
      />
      <ModalEditControl
        pathName={`/ewp/konsulting/${id}/addendum/utama`}
        selectedId={selectedControlId}
        data={payloadControl}
        dataPIC={dataPIC}
        validation={validationErrorsControl}
        showModal={showModalEditControl}
        handleCloseModal={handleCloseModalEditControl}
        handleChangeSelectPIC={handleChangePICModalEditControl}
        handleResetPIC={handleResetPICModalEditControl}
        handleClickEditUraian={handleClickUraianModalEditControl}
        handleSubmit={handleSubmitModalEditControl}
      />
      <ModalEditUraianControl
        showModal={showModalEditUraian}
        data={payloadControl?.uraian}
        handleCloseModal={handleCloseModalEditUraianControl}
        handleSubmit={handleSubmitModalEditUraianControl}
      />
      <div className="w-full flex justify-end gap-3 -my-1">
        <div className="bg-atlasian-yellow rounded">
          <ButtonField
            text={"Load from MAPA"}
            handler={handleClickHandleFromMapa}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgramKerja;
