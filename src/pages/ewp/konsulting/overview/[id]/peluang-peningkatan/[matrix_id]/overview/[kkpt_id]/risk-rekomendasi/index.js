import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import {
  useRespondenByPnSurvey,
  useRespondenByUkerPnSurvey,
  useRespondenByUkerSurvey,
} from "@/data/survey/initiator/responden";
import {
  resetDataTables,
  resetPayloadNewResponden,
  resetPayloadNewUker,
  resetPayloadNewRespondenPnByUker,
  setDataTables,
  setPayloadNewUker,
  setPayloadNewRespondenPnByUker,
} from "@/slices/survey/initiator/respondenSurveySlice";
import {
  confirmationSwal,
  // errorSwal,
  fetchApi,
  loadingSwal,
} from "@/helpers";
import {
  TableRekomendasi,
  TableRiskIssue,
} from "@/components/molecules/ewp/konsulting/peluang-peningkatan/matrix";
import { PrevNextNavigation } from "@/components/molecules/commons";

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
  const { id, matrix_id } = useRouter().query;
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

  const [selectedUkerId, setSelectedUkerId] = useState(0);
  const dataTables = useSelector((state) => state.respondenSurvey.dataTables);
  const payloadNewUker = useSelector(
    (state) => state.respondenSurvey.payloadNewUker
  );
  const payloadNewRespondenPnByUker = useSelector(
    (state) => state.respondenSurvey.payloadNewRespondenPnByUker
  );
  const { respondenByPnSurvey, respondenByPnSurveyMutate } =
    useRespondenByPnSurvey({
      id,
    });
  const { respondenByUkerSurvey, respondenByUkerSurveyMutate } =
    useRespondenByUkerSurvey({
      id,
    });
  const {
    respondenByUkerPnSurvey,
    respondenByUkerPnSurveyError,
    respondenByUkerPnSurveyMutate,
  } = useRespondenByUkerPnSurvey({
    id: selectedUkerId,
  });

  useEffect(() => {
    if (respondenByPnSurvey?.data?.length) {
      const filterData = respondenByPnSurvey.data.filter((v) => v.is_active);
      const mapping = filterData.map((responden, index) => {
        const { id, pn_responden, nama_responden, keterangan } = responden;
        return {
          index,
          id,
          pn_responden,
          nama_responden,
          keterangan,
          is_edit: false,
          is_new: false,
        };
      });
      dispatch(setDataTables({ ...dataTables, respondenPn: mapping }));
    } else {
      dispatch(setDataTables({ ...dataTables, respondenPn: [] }));
    }
    dispatch(resetPayloadNewResponden());
  }, [respondenByPnSurvey]);

  useEffect(() => {
    if (respondenByUkerSurvey?.data?.length) {
      const mapping = respondenByUkerSurvey.data.map((responden, index) => {
        const { id, orgeh_kode, orgeh_name, jumlah, keterangan } = responden;
        return {
          index,
          id,
          orgeh_kode,
          orgeh_name,
          jumlah,
          keterangan,
          is_edit: false,
          is_new: false,
        };
      });
      dispatch(setDataTables({ ...dataTables, respondenUker: mapping }));
    } else {
      dispatch(setDataTables({ ...dataTables, respondenUker: [] }));
    }
    setIsAddNewRow(false);
    dispatch(resetPayloadNewUker());
  }, [respondenByUkerSurvey]);

  useEffect(() => {
    if (!respondenByUkerPnSurveyError) {
      const mappingDataTablesResponden =
        respondenByUkerPnSurvey?.data?.ref_responden?.map(
          (responden, index) => {
            const { pernr, sname } = responden;
            return {
              index,
              pn_responden: pernr,
              nama_responden: sname,
            };
          }
        );

      const mappingSelectedResponden =
        respondenByUkerPnSurvey?.data?.responden?.map((responden, index) => {
          const { pn_responden, nama_responden } = responden;
          return {
            index,
            pn_responden,
            nama_responden,
          };
        });

      dispatch(
        setDataTables({
          ...dataTables,
          respondenUkerPn: mappingDataTablesResponden,
        })
      );
      dispatch(setPayloadNewRespondenPnByUker(mappingSelectedResponden));
    } else {
      dispatch(setDataTables({ ...dataTables, respondenUkerPn: [] }));
      dispatch(resetPayloadNewRespondenPnByUker());
    }
    dispatch(resetPayloadNewResponden());
  }, [respondenByUkerPnSurvey]);

  // [START] Handler for uker
  const handleClickAddRow = () => {
    if (!isAddNewRow) {
      const newDataTables = JSON.parse(JSON.stringify(dataTables));
      newDataTables.respondenUker.push({
        index: newDataTables.respondenUker.length,
        id: "",
        orgeh_kode: "",
        orgeh_name: "",
        jumlah: 0,
        keterangan: "",
        is_edit: true,
        is_new: true,
      });
      dispatch(setDataTables(newDataTables));
      respondenByPnSurveyMutate();
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
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/uker/${id}`,
      {}
    );

    respondenByPnSurveyMutate();
    respondenByUkerPnSurveyMutate();
    respondenByUkerSurveyMutate();
    setSelectedUkerId(0);
    dispatch(resetDataTables());
    loadingSwal("close");
  };

  //   const handleClickSave = async () => {
  //     loadingSwal();
  //     if (!payloadNewUker.orgeh_kode) {
  //       await errorSwal("Silahkan pilih uker terlebih dahulu");
  //       return;
  //     }
  //     await fetchApi(
  //       "POST",
  //       `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/uker`,
  //       {
  //         survey_id: id,
  //         orgeh_kode: payloadNewUker.orgeh_kode,
  //         orgeh_name: payloadNewUker.orgeh_name,
  //         keterangan: payloadNewUker.keterangan,
  //       }
  //     );
  //     respondenByUkerSurveyMutate();
  //     respondenByUkerPnSurveyMutate();
  //     dispatch(resetDataTables());
  //     setSelectedUkerId(0);
  //     setIsAddNewRow(false);
  //     loadingSwal("close");
  //   };

  const handleChangeValue = (value) => {
    const newPayload = {
      ...payloadNewUker,
      orgeh_kode: value.orgeh_kode,
      orgeh_name: value.orgeh_name,
    };

    dispatch(setPayloadNewUker(newPayload));
  };

  //   const handleChangeTextUker = (props, value) => {
  //     const newPayload = {
  //       ...payloadNewUker,
  //       [props]: value,
  //     };

  //     dispatch(setPayloadNewUker(newPayload));
  //   };

  const handleSelectedValue = (id) => {
    dispatch(resetPayloadNewRespondenPnByUker());
    setSelectedUkerId(id);
  };
  // [END] Handler for uker

  // [START] Handler add responden by uker pn
  //   const handleChangeChecboxByUkerPn = (isChecked, responden) => {
  //     const updatedData = [...payloadNewRespondenPnByUker];

  //     if (isChecked) {
  //       const findId = updatedData.some(
  //         (value) => value?.pn_responden === responden?.pn_responden
  //       );

  //       if (!findId) {
  //         updatedData.push({
  //           pn_responden: responden?.pn_responden,
  //           nama_responden: responden.nama_responden,
  //         });
  //       }
  //     } else {
  //       const filter = updatedData.filter(
  //         (value) => value?.pn_responden !== responden?.pn_responden
  //       );
  //       dispatch(setPayloadNewRespondenPnByUker(filter));
  //       return;
  //     }

  //     dispatch(setPayloadNewRespondenPnByUker(updatedData));
  //   };

  //   const handleClickSelectedAllRespondenPn = (e) => {
  //     if (e.target.checked) {
  //       dispatch(
  //         setPayloadNewRespondenPnByUker(dataTables?.respondenUkerPn || [])
  //       );
  //     } else {
  //       dispatch(setPayloadNewRespondenPnByUker([]));
  //     }
  //   };

  const handleClickSaveRespondenUkerPn = async () => {
    loadingSwal();
    const payload = payloadNewRespondenPnByUker?.map((responden) => {
      const { pn_responden, nama_responden } = responden;
      return {
        survey_id: id,
        survey_uker_id: selectedUkerId,
        pn_responden,
        nama_responden,
      };
    });

    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/responden_uker/${selectedUkerId}`,
      payload
    );

    respondenByPnSurveyMutate();
    respondenByUkerPnSurveyMutate();
    respondenByUkerSurveyMutate();
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
                data={dataTables.respondenUker}
                newUker={payloadNewUker}
                selectedUkerId={selectedUkerId}
                isDisabled={false}
                // handleChangeTextUker={handleChangeTextUker}
                handleChangeUker={handleChangeValue}
                handleClickAddRow={handleClickAddRow}
                handleClickDelete={handleClickDelete}
                // handleClickSave={handleClickSave}
                handleSelectedUker={handleSelectedValue}
              />
              <TableRekomendasi
                data={dataTables.respondenUkerPn}
                selectedRekomendasi={payloadNewRespondenPnByUker}
                selectedUkerId={selectedUkerId}
                isDisabled={false}
                // handleChangeChecbox={handleChangeChecboxByUkerPn}
                // handleClickSelectedAll={handleClickSelectedAllRespondenPn}
                handleClickSave={handleClickSaveRespondenUkerPn}
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
