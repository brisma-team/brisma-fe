import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useDispatch, useSelector } from "react-redux";
import {
  setObjData,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} from "@/slices/ewp/quality-assurance/perencanaan/anggaranEWPQualityAssuranceSlice";
import {
  confirmationSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import _ from "lodash";
import {
  ModalAddAnggaran,
  TableAnggaran,
} from "@/components/molecules/ewp/common/anggaran";
import {
  useAnggaran,
  useDetailAnggaran,
} from "@/data/ewp/quality-assurance/perencanaan/anggaran";
import anggaranEWPSchema from "@/helpers/schemas/ewp/common/anggaranEWPSchema";
import useUser from "@/data/useUser";
import { useLandingStatus } from "@/data/ewp/common";
import { useAuditInfo } from "@/data/ewp/common/info";

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
  const [showModal, setShowModal] = useState(false);
  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isOnProgress, setIsOnProgress] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const data = useSelector(
    (state) => state.anggaranEWPQualityAssurance.objData
  );
  const payload = useSelector(
    (state) => state.anggaranEWPQualityAssurance.objPayload
  );
  const validation = useSelector(
    (state) => state.anggaranEWPQualityAssurance.validationErrors
  );

  const { user } = useUser();
  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { anggaran, anggaranMutate } = useAnggaran({ id: params?.id });
  const { detailAnggaran } = useDetailAnggaran({ id: selectedId });
  const { landingStatus } = useLandingStatus({
    module: "qa",
    submodule: "mapa",
    id: params?.id,
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
        name: `Anggaran`,
        path: `${pathName}/anggaran`,
      },
    ]);
    setIsCloseSubmodule(
      Boolean(auditInfo?.data?.realisasi?.penyusunan_mapa_real_end)
    );
    setIsInitiator(
      Boolean(auditInfo?.data?.project_info?.initiator?.pn === user?.data?.pn)
    );
  }, [auditInfo]);

  useEffect(() => {
    if (landingStatus?.data) {
      setIsOnProgress(
        Boolean(landingStatus?.data?.status_persetujuan_name == "On Progress")
      );
    }
  }, [landingStatus]);

  useEffect(() => {
    if (anggaran?.data?.length) {
      const mappingAnggaran = anggaran?.data?.map((v) => {
        return _.pick(v, [
          "id",
          "tipe_anggaran_name",
          "amount",
          "deskripsi",
          "tanggal",
          "tanggal_end",
        ]);
      });
      dispatch(setObjData(mappingAnggaran));
    } else {
      dispatch(resetObjData());
    }
  }, [anggaran]);

  useEffect(() => {
    if (detailAnggaran?.data && typeModal === "update") {
      dispatch(
        setObjPayload(
          _.pick(detailAnggaran?.data, [
            "tipe_anggaran_name",
            "tanggal",
            "tanggal_end",
            "amount",
            "deskripsi",
          ])
        )
      );
    } else {
      dispatch(resetObjPayload());
    }
  }, [detailAnggaran, typeModal, showModal]);

  // [ START ] handler for modal
  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModal(false);
    setTypeModal("");
    setSelectedId("");
    dispatch(resetObjPayload());
    dispatch(resetValidationErrors());
  };

  const handleChangeText = (property, value) => {
    const updatedData = {
      ...payload,
      [property]: value,
    };
    dispatch(setObjPayload(updatedData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: anggaranEWPSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };
    const validate = setErrorValidation(payload, dispatch, schemaMapping);

    const objPayload = {
      amount: parseInt(payload?.amount?.replace(/\./g, "")),
      ..._.omit(payload, ["amount"]),
    };

    if (validate) {
      loadingSwal();
      if (typeModal === "update") {
        await fetchApi(
          "PATCH",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/mapa/anggaran/${params?.id}`,
          { id: selectedId, ...objPayload }
        );
      } else {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/mapa/anggaran/${params?.id}`,
          objPayload
        );
      }

      anggaranMutate();
      setShowModal(false);
      setTypeModal("");
      setSelectedId("");
      dispatch(resetObjPayload());
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal

  // [ START ] handler for table
  const handleClickAddTable = () => {
    setShowModal(true);
  };

  const handleClickUpdateTable = async (id) => {
    setShowModal(true);
    setTypeModal("update");
    setSelectedId(id);
  };

  const handleClickDeleteTable = async (id) => {
    const confirm = await confirmationSwal("Menghapus Anggaran.");

    if (!confirm.value) {
      return;
    }
    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/anggaran/${id}`,
      { id }
    );
    anggaranMutate();
    loadingSwal("close");
  };
  // [ END ] handler for table

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle text="Anggaran" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/jadwal"}
          nextUrl={"/dokumen"}
          marginLeft={"-67px"}
        />
      </div>
      {/* Start Content */}
      <div className="w-full">
        <Card>
          <div className="px-6 pt-2 pb-4 w-full">
            <p className="ml-2 font-bold text-base">Usulan Anggaran</p>
            <div className="my-2 " />
            <TableAnggaran
              data={data}
              setShowModal={setShowModal}
              handleClickAdd={handleClickAddTable}
              handleClickUpdate={handleClickUpdateTable}
              handleClickDelete={handleClickDeleteTable}
              withoutButtonAction={
                !(isInitiator && !isCloseSubmodule && isOnProgress)
              }
            />
          </div>
        </Card>
      </div>
      <ModalAddAnggaran
        data={payload}
        showModal={showModal}
        validation={validation}
        handleChangeText={handleChangeText}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
      />
      {/* End Content */}
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;
