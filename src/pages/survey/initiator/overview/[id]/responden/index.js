import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { LandingLayoutSurvey } from "@/layouts/survey";
import { NavigationTab } from "@/components/molecules/commons";
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
  setPayloadNewResponden,
  setPayloadNewUker,
  setPayloadNewRespondenPnByUker,
} from "@/slices/survey/initiator/respondenSurveySlice";
import { confirmationSwal, errorSwal, fetchApi, loadingSwal } from "@/helpers";
import {
  TableRespondenPn,
  TableRespondenPnByUker,
  TableUker,
} from "@/components/molecules/survey/initiator/responden";

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const navigationTabItems = [
    { idx: 1, title: "PN Responden" },
    { idx: 2, title: "UKER Responden" },
  ];
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Survei", path: "/survey" },
    { name: "Overview", path: "/survey/initiator/overview" },
    {
      name: `Buat Survei / Template Kuesioner`,
      path: `/survey/initiator/overview/${id}`,
    },
    {
      name: `Responden`,
      path: `/survey/initiator/overview/${id}/responden`,
    },
  ];

  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [isAddNewRowResponden, setIsAddNewRowResponden] = useState(false);
  const [isAddNewRowUker, setIsAddNewRowUker] = useState(false);
  const [isAddNewRowUkerPn, setIsAddNewRowUkerPn] = useState(false);
  const [isDisabledSaveRespondenPnByUker, setIsDisabledSaveRespondenPnByUker] =
    useState(false);
  const [selectedUkerId, setSelectedUkerId] = useState(0);

  const dataTables = useSelector((state) => state.respondenSurvey.dataTables);
  const payloadNewResponden = useSelector(
    (state) => state.respondenSurvey.payloadNewResponden
  );
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
      const mapping = respondenByPnSurvey.data.map((responden, index) => {
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
    setIsAddNewRowResponden(false);
    dispatch(resetPayloadNewResponden());
  }, [respondenByPnSurvey, currentContentStage]);

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
    setIsAddNewRowUker(false);
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
          const { pn_responden, nama_responden, keterangan } = responden;
          return {
            index,
            pn_responden,
            nama_responden,
            keterangan,
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
    setIsAddNewRowUkerPn(false);
    dispatch(resetPayloadNewResponden());
  }, [respondenByUkerPnSurvey]);

  useEffect(() => {
    setIsDisabledSaveRespondenPnByUker(!payloadNewRespondenPnByUker?.length);
  }, [payloadNewRespondenPnByUker]);

  // [START] Handler for responden
  const handleClickAddRowResponden = () => {
    if (currentContentStage === 1) {
      if (!isAddNewRowResponden) {
        const newDataTables = JSON.parse(JSON.stringify(dataTables));
        newDataTables.respondenPn.push({
          index: newDataTables.respondenPn.length,
          id: "",
          pn_responden: "",
          nama_responden: "",
          keterangan: "",
          is_edit: true,
          is_new: true,
        });
        dispatch(setDataTables(newDataTables));
        respondenByPnSurveyMutate();
        setIsAddNewRowResponden(true);
      }
    } else if (currentContentStage === 2) {
      if (!isAddNewRowUkerPn) {
        const newDataTables = JSON.parse(JSON.stringify(dataTables));
        newDataTables.respondenUkerPn.push({
          index: newDataTables.respondenUkerPn.length,
          id: "",
          pn_responden: "",
          nama_responden: "",
          keterangan: "",
          is_edit: true,
          is_new: true,
        });
        dispatch(setDataTables(newDataTables));
        respondenByUkerPnSurveyMutate();
        setIsAddNewRowUkerPn(true);
      }
    }
  };

  const handleClickDeleteResponden = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menghapus data ini?"
    );

    if (!confirm.value) {
      return;
    }
    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/responden/pn/${id}`,
      {}
    );
    setSelectedUkerId(0);
    respondenByPnSurveyMutate();
    respondenByUkerPnSurveyMutate();
    loadingSwal("close");
  };

  const handleClickSaveResponden = async () => {
    loadingSwal();
    if (!payloadNewResponden.pn) {
      await errorSwal("Silahkan pilih responden terlebih dahulu");
      return;
    }

    let path = "";
    const payload = {
      pn_responden: payloadNewResponden.pn,
      nama_responden: payloadNewResponden.name,
      keterangan: payloadNewResponden.keterangan,
    };

    if (currentContentStage === 1) {
      path = `responden/pn/${id}`;
    } else {
      if (!selectedUkerId) {
        await errorSwal("Silahkan pilih UKER terlebih dahulu");
        return;
      }

      path = `responden_uker/${selectedUkerId}`;
      payload.survey_uker_id = selectedUkerId;
    }

    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/${path}`,
      payload
    );
    respondenByPnSurveyMutate();
    respondenByUkerSurveyMutate();
    respondenByUkerPnSurveyMutate();
    dispatch(resetPayloadNewResponden());
    setIsAddNewRowResponden(false);
    loadingSwal("close");
  };

  const handleChangeResponden = (value) => {
    const newPayload = {
      ...payloadNewResponden,
      pn: value.pn,
      name: value.name,
    };

    dispatch(setPayloadNewResponden(newPayload));
  };

  const handleChangeTextResponden = (props, value) => {
    const newPayload = {
      ...payloadNewResponden,
      [props]: value,
    };

    dispatch(setPayloadNewResponden(newPayload));
  };
  // [END] Handler for responden

  // [START] Handler for uker
  const handleClickAddRowUker = () => {
    if (!isAddNewRowUker) {
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
      setIsAddNewRowUker(true);
    }
  };

  const handleClickDeleteUker = async (id) => {
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
    dispatch(resetDataTables());
    loadingSwal("close");
  };

  const handleClickSaveUker = async () => {
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/uker`,
      {
        survey_id: id,
        orgeh_kode: payloadNewUker.orgeh_kode,
        orgeh_name: payloadNewUker.orgeh_name,
        keterangan: payloadNewUker.keterangan,
      }
    );
    respondenByUkerSurveyMutate();
    respondenByUkerPnSurveyMutate();
    dispatch(resetDataTables());
    setSelectedUkerId(0);
    setIsAddNewRowUker(false);
    loadingSwal("close");
  };

  const handleChangeUker = (value) => {
    const newPayload = {
      ...payloadNewUker,
      orgeh_kode: value.orgeh_kode,
      orgeh_name: value.orgeh_name,
    };

    dispatch(setPayloadNewUker(newPayload));
  };

  const handleChangeTextUker = (props, value) => {
    const newPayload = {
      ...payloadNewUker,
      [props]: value,
    };

    dispatch(setPayloadNewUker(newPayload));
  };

  const handleSelectedUker = (id) => {
    dispatch(resetPayloadNewRespondenPnByUker());
    setSelectedUkerId(id);
  };
  // [END] Handler for uker

  // [START] Handler add responden by uker pn
  const handleChangeChecboxByUkerPn = (isChecked, responden) => {
    const updatedData = [...payloadNewRespondenPnByUker];

    if (isChecked) {
      const findId = updatedData.some(
        (value) => value?.pn_responden === responden?.pn_responden
      );

      if (!findId) {
        updatedData.push({
          pn_responden: responden?.pn_responden,
          nama_responden: responden.nama_responden,
        });
      }
    } else {
      const filter = updatedData.filter(
        (value) => value?.pn_responden !== responden?.pn_responden
      );
      dispatch(setPayloadNewRespondenPnByUker(filter));
      return;
    }

    dispatch(setPayloadNewRespondenPnByUker(updatedData));
  };

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
    <LandingLayoutSurvey withoutRightSidebar={true} overflowY={true}>
      <div className="w-[71rem]">
        <div className="pl-0.5 pt-4 pr-4 pb-6">
          <Breadcrumbs data={breadcrumbs} />
          <PageTitle text={"Responden"} />
          <div className="mb-4" />
          <NavigationTab
            items={navigationTabItems}
            currentStage={currentContentStage}
            setCurrentStage={setCurrentContentStage}
            width={"w-64"}
          />
          {currentContentStage === 1 ? (
            <TableRespondenPn
              data={dataTables.respondenPn}
              newResponden={payloadNewResponden}
              handleChangeText={handleChangeTextResponden}
              handleChangeResponden={handleChangeResponden}
              handleClickAddRow={handleClickAddRowResponden}
              handleClickDelete={handleClickDeleteResponden}
              handleClickSave={handleClickSaveResponden}
            />
          ) : (
            <div className="flex flex-col gap-4">
              <TableUker
                data={dataTables.respondenUker}
                newUker={payloadNewUker}
                selectedUkerId={selectedUkerId}
                handleChangeTextUker={handleChangeTextUker}
                handleChangeUker={handleChangeUker}
                handleClickAddRow={handleClickAddRowUker}
                handleClickDelete={handleClickDeleteUker}
                handleClickSave={handleClickSaveUker}
                handleSelectedUker={handleSelectedUker}
              />
              <TableRespondenPnByUker
                data={dataTables.respondenUkerPn}
                selectedResponden={payloadNewRespondenPnByUker}
                selectedUkerId={selectedUkerId}
                isDisabledButtonSave={isDisabledSaveRespondenPnByUker}
                handleChangeChecbox={handleChangeChecboxByUkerPn}
                handleClickSave={handleClickSaveRespondenUkerPn}
              />
            </div>
          )}
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutSurvey>
  );
};

export default index;
