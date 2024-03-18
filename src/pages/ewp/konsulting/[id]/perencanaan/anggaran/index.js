import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useDispatch } from "react-redux";
import {
  setObjData,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} from "@/slices/ewp/konsulting/perencanaan/anggaranEWPKonsultingSlice";
import { useSelector } from "react-redux";
import {
  confirmationSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import _ from "lodash";
import {
  ModalAddBudget,
  DataTables,
} from "@/components/molecules/ewp/konsulting/perencanaan/anggaran";
import {
  useAnggaran,
  useDetailAnggaran,
} from "@/data/ewp/konsulting/perencanaan/anggaran";
import anggaranEWPKonsultingSchema from "@/helpers/schemas/ewp/konsulting/perencanaan/anggaranEWPKonsultingSchema";

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

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const data = useSelector((state) => state.anggaranEWPKonsulting.objData);
  const payload = useSelector(
    (state) => state.anggaranEWPKonsulting.objPayload
  );
  const validation = useSelector(
    (state) => state.anggaranEWPKonsulting.validationErrors
  );

  const { projectDetail } = useProjectDetail({ id });
  const { anggaran, anggaranMutate } = useAnggaran({ id });
  const { detailAnggaran } = useDetailAnggaran({ id: selectedId });

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
        name: `Anggaran`,
        path: `${baseUrl}/perencanaan/anggaran`,
      },
    ]);
  }, [projectDetail]);

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
      schema: anggaranEWPKonsultingSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };
    const validate = setErrorValidation(payload, dispatch, schemaMapping);

    if (validate) {
      loadingSwal();
      if (typeModal === "update") {
        await fetchApi(
          "PATCH",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/anggaran/${id}`,
          { id: selectedId, ...payload }
        );
      } else {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/anggaran/${id}`,
          payload
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
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle text="Anggaran" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/tim-timeplan"}
          nextUrl={"/program-kerja"}
          marginLeft={"-60px"}
        />
      </div>
      {/* Start Content */}
      <div className="w-full">
        <Card>
          <div className="px-6 pt-2 pb-4 w-full">
            <p className="ml-2 font-bold text-base">Usulan Anggaran</p>
            <div className="my-2 " />
            <DataTables
              data={data}
              setShowModal={setShowModal}
              handleClickAdd={handleClickAddTable}
              handleClickUpdate={handleClickUpdateTable}
              handleClickDelete={handleClickDeleteTable}
            />
          </div>
        </Card>
      </div>
      <ModalAddBudget
        data={payload}
        showModal={showModal}
        validation={validation}
        handleChangeText={handleChangeText}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
      />
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;
