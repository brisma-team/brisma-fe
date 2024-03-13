import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
// import { useRespondenByPnSurvey } from "@/data/survey/initiator/responden";
// import { useKKPTRisk } from "@/data/ewp/konsulting/peluang-peningkatan/matrix/detail";
import {
  resetDataTables,
  resetPayloadNewRisk,
  resetPayloadNewLingkup,
  resetPayloadNewRekomendasi,
  setDataTables,
  setPayloadNewRisk,
  setPayloadNewLingkup,
  setPayloadNewRekomendasi,
} from "@/slices/ewp/konsulting/peluang-peningkatan/riskRekomendasiSlice";
import { confirmationSwal, errorSwal, fetchApi, loadingSwal } from "@/helpers";
import {
  TableRekomendasi,
  TableRiskIssue,
} from "@/components/molecules/ewp/konsulting/peluang-peningkatan/matrix";
import { PrevNextNavigation } from "@/components/molecules/commons";
import {
  useKKPTRisk,
  useKKPTRekomendasi,
} from "@/data/ewp/konsulting/peluang-peningkatan/matrix/detail";

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
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const pathNameBase = `${baseUrl}/peluang-peningkatan`;
  const pathNameContent = `${baseUrl}/peluang-peningkatan/${matrix_id}`;

  const { projectDetail } = useProjectDetail({ id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    { name: "Overview", path: "/ewp/konsulting/overview" },
    {
      name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
      path: `${baseUrl}/info`,
    },
    {
      name: `Peluang Peningkatan`,
      path: `${pathNameBase}`,
    },
    {
      name: `Risk Issue & Rekomendasi`,
      path: `${pathNameContent}/risk-rekomendasi`,
    },
  ];

  const [isAddNewRow, setIsAddNewRow] = useState(false);

  const [selectedRiskId, setSelectedRiskId] = useState(0);
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
  const { riskData, riskMutate } = useKKPTRisk({
    id: kkpt_id,
  });
  const { rekomendasiData, rekomendasiMutate, rekomendasiError } =
    useKKPTRekomendasi({
      id: selectedRiskId,
    });
  useEffect(() => {
    if (riskData?.data?.length) {
      setSelectedRiskId(riskData?.data[0]?.id || 0);
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
          lingkup_pemeriksaan: lingkup_pemeriksaan_name || "N/A",
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
          const { id, deadline, desc } = val;
          return {
            index,
            id,
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
    // dispatch(resetPayloadNewResponden());
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
      dispatch(setDataTables(newDataTables));
      riskMutate();
      setIsAddNewRow(true);
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

    // respondenByPnSurveyMutate();
    // respondenByUkerPnSurveyMutate();
    rekomendasiMutate();
    setSelectedRiskId(0);
    dispatch(resetDataTables());
    loadingSwal("close");
  };

  const handleClickSave = async () => {
    loadingSwal();
    if (!payloadNewRisk.risk_kode) {
      await errorSwal("Silahkan pilih uker terlebih dahulu");
      return;
    }
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
    dispatch(resetDataTables());
    setSelectedRiskId(0);
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
      lingkup_pemeriksaan_id: value.lingkup_pemeriksaan_id,
      lingkup_pemeriksaan_name: value.lingkup_pemeriksaan_name,
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
  // [END] Handler for uker

  // [START] Handler add responden by uker pn
  const handleChangeChecboxRekomendasi = (isChecked, responden) => {
    const updatedData = [...payloadNewRekomendasi];

    if (isChecked) {
      const findId = updatedData.some((value) => value?.id === responden?.id);

      if (!findId) {
        updatedData.push({
          id: responden?.id,
          deadline: responden?.deadline,
          rekomendasi_name: responden?.rekomendasi_name,
        });
      }
    } else {
      const filter = updatedData.filter((value) => value?.id !== responden?.id);
      dispatch(setPayloadNewRekomendasi(filter));
      return;
    }

    dispatch(setPayloadNewRekomendasi(updatedData));
  };

  const handleClickSaveRekomendasi = async () => {
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

    rekomendasiMutate();
    loadingSwal("close");
  };
  // [END] Handler add responden by uker pn
  return (
    <LandingLayoutEWPConsulting>
      <div className="w-[71rem]">
        <div className="pl-0.5 pt-4 pr-4 pb-6">
          <Breadcrumbs data={breadcrumbs} />
          <div className="flex justify-between items-center mb-7">
            <PageTitle text="Risk Issue dan Rekomendasi" />
            <PrevNextNavigation
              baseUrl={pathNameContent}
              routes={routes}
              prevUrl={"/tanggapan-client"}
              nextUrl={"/dokumen"}
              marginLeft={"-60px"}
            />
          </div>
          <div className="mb-4" />
          <div className="flex gap-4 min-h-screen">
            <div className="flex flex-col gap-4 w-full h-fit">
              <TableRiskIssue
                data={dataTables.riskList}
                newLingkup={payloadNewLingkup}
                newRisk={payloadNewRisk}
                selectedEWPId={id}
                selectedLingkupId={payloadNewLingkup?.lingkup_pemeriksaan_id}
                selectedRiskId={selectedRiskId}
                isDisabled={false}
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
                isDisabled={false}
                handleChangeCheckbox={handleChangeChecboxRekomendasi}
                // handleClickSelectedAll={handleClickSelectedAllRespondenPn}
                handleClickSave={handleClickSaveRekomendasi}
              />
            </div>
          </div>
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;
