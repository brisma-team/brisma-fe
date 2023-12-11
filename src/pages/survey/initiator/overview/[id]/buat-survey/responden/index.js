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
  resetPayloadNewResponden,
  resetPayloadNewUker,
  setDataTables,
  setPayloadNewResponden,
  setPayloadNewUker,
} from "@/slices/survey/respondenSurveySlice";
import { confirmationSwal, errorSwal, fetchApi, loadingSwal } from "@/helpers";
import {
  TableResponden,
  TableUker,
} from "@/components/molecules/survey/responden";

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
      path: `/survey/initiator/overview/${id}/buat-survey`,
    },
    {
      name: `Responden`,
      path: `/survey/initiator/overview/${id}/buat-survey/responden`,
    },
  ];

  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [isAddNewRowResponden, setIsAddNewRowResponden] = useState(false);
  const [isAddNewRowUker, setIsAddNewRowUker] = useState(false);
  const [isAddNewRowUkerPn, setIsAddNewRowUkerPn] = useState(false);
  const [selectedUkerId, setSelectedUkerId] = useState(0);

  const dataTables = useSelector((state) => state.respondenSurvey.dataTables);
  const payloadNewResponden = useSelector(
    (state) => state.respondenSurvey.payloadNewResponden
  );
  const payloadNewUker = useSelector(
    (state) => state.respondenSurvey.payloadNewUker
  );

  const { respondenByPnSurvey, respondenByPnSurveyMutate } =
    useRespondenByPnSurvey({
      id,
    });
  const { respondenByUkerSurvey, respondenByUkerSurveyMutate } =
    useRespondenByUkerSurvey({
      id,
    });
  const { respondenByUkerPnSurvey, respondenByUkerPnSurveyMutate } =
    useRespondenByUkerPnSurvey({
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
    setIsAddNewRowUker(false);
    dispatch(resetPayloadNewUker());
  }, [respondenByUkerSurvey]);

  useEffect(() => {
    if (respondenByUkerPnSurvey?.data?.length) {
      const mapping = respondenByUkerPnSurvey.data.map((responden, index) => {
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
      dispatch(setDataTables({ ...dataTables, respondenUkerPn: mapping }));
    } else {
      dispatch(setDataTables({ ...dataTables, respondenUkerPn: [] }));
    }
    setIsAddNewRowUkerPn(false);
    dispatch(resetPayloadNewResponden());
  }, [respondenByUkerPnSurvey]);

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
    setSelectedUkerId(id);
  };
  // [END] Handler for uker

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
            <TableResponden
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
              <TableResponden
                data={dataTables.respondenUkerPn}
                dataUker={dataTables.respondenUker}
                newResponden={payloadNewResponden}
                selectedUkerId={selectedUkerId}
                handleChangeText={handleChangeTextResponden}
                handleChangeResponden={handleChangeResponden}
                handleClickAddRow={handleClickAddRowResponden}
                handleClickDelete={handleClickDeleteResponden}
                handleClickSave={handleClickSaveResponden}
                withUker={true}
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
