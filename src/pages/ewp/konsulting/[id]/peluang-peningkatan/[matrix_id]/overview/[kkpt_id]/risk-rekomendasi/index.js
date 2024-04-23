import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useDispatch } from "react-redux";
import {
  useKKPTRekomendasi,
  useKKPTRisk,
  useLandingStatus,
} from "@/data/ewp/konsulting/peluang-peningkatan/matrix/detail";
import useUser from "@/data/useUser";
import { useSelector } from "react-redux";
import {
  resetDataTables,
  resetPayloadNewLingkup,
  resetPayloadNewRekomendasi,
  resetPayloadNewRisk,
  setDataTables,
  setPayloadNewLingkup,
  setPayloadNewRekomendasi,
  setPayloadNewRisk,
} from "@/slices/ewp/konsulting/peluang-peningkatan/riskRekomendasiSlice";
import { confirmationSwal, errorSwal, fetchApi, loadingSwal } from "@/helpers";
import {
  TableRekomendasi,
  TableRiskIssue,
} from "@/components/molecules/ewp/konsulting/peluang-peningkatan/matrix";

const routes = [
  {
    name: "Kondisi",
    slug: "kondisi",
  },
  {
    name: "Sebab",
    slug: "sebab",
  },
  { name: "Tanggapan Client", slug: "tanggapan-client" },
  { name: "Risk & Rekomendasi", slug: "risk-rekomendasi" },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const dispatch = useDispatch();
  const { id, matrix_id, kkpt_id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/${id}`;
  const pathNameBase = `${baseUrl}/peluang-peningkatan`;
  const pathNameOverview = `${baseUrl}/peluang-peningkatan/${matrix_id}/overview`;
  const pathNameContent = `${baseUrl}/peluang-peningkatan/${matrix_id}/overview/${kkpt_id}`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [selectedRiskId, setSelectedRiskId] = useState(0);

  const [isAddNewRow, setIsAddNewRow] = useState(false);
  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);
  const [isAuditor, setIsAuditor] = useState(false);
  const [isOnProgress, setIsOnProgress] = useState(false);

  const dataTables = useSelector((state) => state.riskRekomendasi.dataTables);
  const payloadNewRisk = useSelector(
    (state) => state.riskRekomendasi.payloadNewRisk
  );
  const payloadNewLingkup = useSelector(
    (state) => state.riskRekomendasi.payloadNewLingkup
  );
  const payloadNewRekomendasi = useSelector(
    (state) => state.riskRekomendasi.payloadNewRekomendasi
  );

  const { projectDetail } = useProjectDetail({ id });
  const { riskData, riskMutate } = useKKPTRisk({
    id: kkpt_id,
  });
  const { rekomendasiData, rekomendasiMutate, rekomendasiError } =
    useKKPTRekomendasi({
      id: selectedRiskId,
    });
  const { landingStatus } = useLandingStatus(kkpt_id);
  const { user } = useUser();

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `${baseUrl}/info`,
      },
      {
        name: `Peluang Peningkatan`,
        path: `${pathNameBase}`,
      },
      {
        name: `Overview`,
        path: `${pathNameOverview}`,
      },
      {
        name: `Landing Peluang Peningkatan`,
        path: `${pathNameContent}`,
      },
      {
        name: `Risk Issue & Rekomendasi`,
        path: `${pathNameContent}/risk-rekomendasi`,
      },
    ]);
    setIsCloseSubmodule(
      Boolean(projectDetail?.data?.realisasi?.peluang_peningkatan_real_end)
    );
    setIsInitiator(
      Boolean(
        projectDetail?.data?.project_info?.initiator?.pn === user?.data?.pn
      )
    );
  }, [projectDetail, user]);

  useEffect(() => {
    setIsAuditor(
      Boolean(landingStatus?.data?.info?.auditor?.pn == user?.data?.pn)
    );
    setIsOnProgress(
      Boolean(landingStatus?.data?.info?.status_persetujuan == "On Progress")
    );
  }, [landingStatus, user]);

  useEffect(() => {
    if (riskData?.data?.length) {
      const filterData = riskData.data.filter((v) => v.is_active);
      const mapping = filterData.map((value, index) => {
        const {
          id,
          kkpt_id,
          lingkup_pemeriksaan_name,
          ref_risk_issue_abbr,
          ref_risk_issue_name,
          jumlah_rekomendasi,
        } = value;
        return {
          index,
          kkpt_id,
          kkpt_risk_id: id,
          lingkup_pemeriksaan: lingkup_pemeriksaan_name || "-",
          abbr: ref_risk_issue_abbr,
          rekomendasi_name: ref_risk_issue_name,
          rekomendasi_terpilih: jumlah_rekomendasi || 0,
          is_edit: false,
          is_new: false,
        };
      });
      dispatch(setDataTables({ ...dataTables, riskList: mapping }));
    } else {
      dispatch(setDataTables({ ...dataTables, riskList: [] }));
    }
    dispatch(resetPayloadNewRisk());
    dispatch(resetPayloadNewLingkup());
  }, [riskData]);

  useEffect(() => {
    if (rekomendasiData?.data?.ref_rekomendasi?.length) {
      const mapping = rekomendasiData.data.kkpt_rekomendasi_list.map(
        (data, index) => {
          const { id, deadline, desc, kkpa } = data;
          return {
            index,
            id,
            rekomendasi_name: desc,
            deadline,
            control_code: kkpa?.mapa_uker_mcr_control?.mtd_control?.kode,
            control_abbr: kkpa?.mapa_uker_mcr_control?.mtd_control?.abbr,
            control_name: kkpa?.mapa_uker_mcr_control?.mtd_control?.nama,
            is_edit: false,
            is_new: false,
          };
        }
      );
      dispatch(setDataTables({ ...dataTables, rekomendasiList: mapping }));
    } else {
      dispatch(setDataTables({ ...dataTables, rekomendasiList: [] }));
    }
    setIsAddNewRow(false);
    dispatch(resetPayloadNewRekomendasi());
  }, [rekomendasiData]);

  useEffect(() => {
    if (!rekomendasiError) {
      const mappingDataTablesRekomendasi =
        rekomendasiData?.data?.ref_rekomendasi?.map((value, index) => {
          const { id, deadline, desc, kkpa } = value;
          return {
            index,
            id,
            rekomendasi_name: desc,
            deadline,
            control_code: kkpa?.mapa_uker_mcr_control?.mtd_control?.kode,
            control_abbr: kkpa?.mapa_uker_mcr_control?.mtd_control?.abbr,
            control_name: kkpa?.mapa_uker_mcr_control?.mtd_control?.nama,
          };
        });

      const mappingSelectedResponden =
        rekomendasiData?.data?.kkpt_rekomendasi_list?.map((val, index) => {
          const { kkpa_rekomendasi_id, deadline, desc } = val;
          return {
            index,
            id: parseInt(kkpa_rekomendasi_id),
            rekomendasi_name: desc,
            deadline,
          };
        });

      dispatch(
        setDataTables({
          ...dataTables,
          rekomendasiList: mappingDataTablesRekomendasi,
        })
      );
      dispatch(setPayloadNewRekomendasi(mappingSelectedResponden));
    } else {
      dispatch(setDataTables({ ...dataTables, rekomendasiList: [] }));
      dispatch(resetPayloadNewRekomendasi());
    }
  }, [rekomendasiData]);

  // [START] Handler for Risk Control
  const handleClickAddRow = () => {
    if (!isAddNewRow) {
      const newDataTables = JSON.parse(JSON.stringify(dataTables));
      newDataTables.riskList.push({
        index: newDataTables.riskList.length,
        id: "",
        lingkup_pemeriksaan: "",
        rekomendasi_terpilih: 0,
        is_edit: true,
        is_new: true,
      });
      setIsAddNewRow(true);
      dispatch(setDataTables(newDataTables));
    }
  };

  const handleClickDelete = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menghapus data ini?"
    );

    if (!confirm.value) {
      return;
    }
    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/kkpt_risk/delete/${id}`,
      {}
    );

    rekomendasiMutate();
    setSelectedRiskId(0);
    dispatch(resetDataTables());
    loadingSwal("close");
  };

  const handleClickSave = async () => {
    if (!payloadNewRisk?.risk_kode) {
      await errorSwal("Silahkan pilih risk control terlebih dahulu");
      return;
    }
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/kkpt_risk`,
      {
        kkpt_id,
        risk_kode: payloadNewRisk.risk_kode,
        risk_abbr: payloadNewRisk.risk_abbr,
        risk_name: payloadNewRisk.risk_name,
        lingkup_pemeriksaan_id: payloadNewLingkup.lingkup_pemeriksaan_id,
        lingkup_pemeriksaan_name: payloadNewLingkup.lingkup_pemeriksaan_name,
      }
    );
    riskMutate();
    dispatch(resetPayloadNewRisk());
    dispatch(resetPayloadNewRisk());
    setIsAddNewRow(false);
    loadingSwal("close");
  };

  const handleChangeValue = (value) => {
    const newPayload = {
      ...payloadNewRisk,
      risk_kode: value.kode,
      risk_abbr: value.abbr,
      risk_name: value.nama,
    };

    dispatch(setPayloadNewRisk(newPayload));
  };

  const handleChangeValueLingkup = (value) => {
    const newPayload = {
      ...payloadNewLingkup,
      ...value,
    };

    dispatch(setPayloadNewLingkup(newPayload));
  };

  const handleSelectedValue = (id) => {
    dispatch(resetPayloadNewRisk());
    setSelectedRiskId(id);
  };

  const handleSelectedValueLingkup = (id) => {
    dispatch(resetPayloadNewLingkup());
    dispatch(setPayloadNewLingkup({ lingkup_pemeriksaan_id: id }));
  };
  // [END] Handler for Risk Control

  // [START] Handler add rekomendasi
  const handleChangeChecboxRekomendasi = (isChecked, rekomendasi) => {
    const updatedData = [...payloadNewRekomendasi];

    if (isChecked) {
      const findId = updatedData.some((value) => value?.id === rekomendasi?.id);

      if (!findId) {
        updatedData.push({
          id: rekomendasi?.id,
          deadline: rekomendasi?.deadline,
          rekomendasi_name: rekomendasi?.rekomendasi_name,
        });
      }
    } else {
      const filter = updatedData.filter(
        (value) => value?.id !== rekomendasi?.id
      );
      dispatch(setPayloadNewRekomendasi(filter));
      return;
    }

    dispatch(setPayloadNewRekomendasi(updatedData));
  };

  const handleClickSaveRekomendasi = async () => {
    if (!selectedRiskId) {
      await errorSwal("Silahkan pilih risk control terlebih dahulu");
      return;
    }

    loadingSwal();
    const payload = payloadNewRekomendasi?.map((data) => {
      const { id, deadline, rekomendasi_name } = data;
      return {
        kkpa_rekomendasi_id: id,
        kkpt_id,
        kkpt_risk_id: selectedRiskId,
        deadline,
        desc: rekomendasi_name,
      };
    });
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/kkpt_rekomendasi/${selectedRiskId}`,
      payload
    );
    riskMutate();
    rekomendasiMutate();
    loadingSwal("close");
  };
  // [END] Handler add rekomendasi

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Risk Issue & Rekomendasi" />
        <PrevNextNavigation
          baseUrl={pathNameContent}
          routes={routes}
          prevUrl={"/tanggapan-client"}
          nextUrl={"/dokumen"}
          marginLeft={"-60px"}
        />
      </div>
      {/* Start Content */}
      <div className="my-4 flex gap-6">
        <div className="flex flex-col gap-4 w-full h-fit">
          <TableRiskIssue
            data={dataTables.riskList}
            newLingkup={payloadNewLingkup}
            newRisk={payloadNewRisk}
            selectedEWPId={id}
            selectedLingkupId={payloadNewLingkup?.lingkup_pemeriksaan_id}
            selectedRiskId={selectedRiskId}
            isDisabled={
              !((isInitiator || isAuditor) && !isCloseSubmodule && isOnProgress)
            }
            handleChangeRisk={handleChangeValue}
            handleChangeLingkup={handleChangeValueLingkup}
            handleClickAddRow={handleClickAddRow}
            handleClickDelete={handleClickDelete}
            handleClickSave={handleClickSave}
            handleSelectedRisk={handleSelectedValue}
            handleSelectedLingkup={handleSelectedValueLingkup}
          />
          <TableRekomendasi
            data={dataTables.rekomendasiList}
            selectedRekomendasi={payloadNewRekomendasi}
            isDisabled={
              !((isInitiator || isAuditor) && !isCloseSubmodule && isOnProgress)
            }
            handleChangeCheckbox={handleChangeChecboxRekomendasi}
            handleClickSave={handleClickSaveRekomendasi}
          />
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;
