import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { useState, useEffect } from "react";
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
  ModalAddUserSKAI,
  UserSkaiDataTables,
} from "@/components/molecules/reference/organisasi";
import anggaranEWPKonsultingSchema from "@/helpers/schemas/ewp/konsulting/perencanaan/anggaranEWPKonsultingSchema";
import useUserSKAI from "@/data/useUserSKAI";
import useUserSKAIDetail from "@/data/useUserSKAIDetail";
import { LayoutReferenceGeneral } from "@/layouts/reference";
// import useUser from "@/data/useUser";

const index = () => {
  const dispatch = useDispatch();
  const baseUrl = `/reference/`;
  const pathName = `${baseUrl}/perencanaan`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  // const [isOnProgress, setIsOnProgress] = useState(false);
  // const [isInitiator, setIsInitiator] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [selectedPn, setSelectedPn] = useState("");

  const payload = useSelector(
    (state) => state.anggaranEWPKonsulting.objPayload
  );
  const validation = useSelector(
    (state) => state.anggaranEWPKonsulting.validationErrors
  );

  // const { user } = useUser();
  const { userSKAI, userSKAIMutate } = useUserSKAI();
  const { userSKAIDetail } = useUserSKAIDetail(selectedPn);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "Reference", path: "/reference" },
      { name: "Organisasi", path: "/reference/organisasi" },
      {
        name: `User S.K.A.I`,
        path: pathName,
      },
    ]);
    // setIsCloseSubmodule(
    //   Boolean(projectDetail?.data?.realisasi?.penyusunan_mapa_real_end)
    // );
    // setIsInitiator(
    //   Boolean(
    //     projectDetail?.data?.project_info?.initiator?.pn === user?.data?.pn
    //   )
    // );
    // setIsOnProgress(
    //   Boolean(
    //     projectDetail?.data?.project_info?.status_persetujuan_name ==
    //       "On Progress"
    //   )
    // );
  }, []);

  useEffect(() => {
    if (userSKAI?.data?.data?.length) {
      const mappingUsers = userSKAI?.data?.data?.map((v) => {
        return _.pick(v, ["id", "pn", "name", "kode_uka", "name_uka", "role"]);
      });
      dispatch(setObjData(mappingUsers));
    } else {
      dispatch(resetObjData());
    }
  }, [userSKAI]);

  useEffect(() => {
    if (userSKAIDetail?.data && typeModal === "update") {
      dispatch(
        setObjPayload(
          _.pick(userSKAIDetail?.data, [
            "pn",
            "name",
            "kode_uka",
            "name_uka",
            "role",
          ])
        )
      );
    } else {
      dispatch(resetObjPayload());
    }
  }, [userSKAIDetail, typeModal, showModal]);

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
    setSelectedPn("");
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

    const objPayload = {
      amount: parseInt(payload?.amount?.replace(/\./g, "")),
      ..._.omit(payload, ["amount"]),
    };

    if (validate) {
      loadingSwal();
      if (typeModal === "update") {
        await fetchApi(
          "PATCH",
          `${process.env.NEXT_PUBLIC_API_URL_REFERENCE}/reference/user_skai/update`,
          { pn: "", role_kode: [], uka_kode: "", ...objPayload }
        );
      } else {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_REFERENCE}/referencee/user_skai/create`,
          objPayload
        );
      }

      userSKAIMutate();
      setShowModal(false);
      setTypeModal("");
      setSelectedPn("");
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
    setSelectedPn(id);
  };

  const handleClickDeleteTable = async (id) => {
    const confirm = await confirmationSwal("Menghapus Pengguna.");

    if (!confirm.value) {
      return;
    }
    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/reference/user_skai/delete/${id}`,
      {}
    );
    userSKAIMutate();
    loadingSwal("close");
  };
  // [ END ] handler for table

  return (
    <LayoutReferenceGeneral>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle text="User S.K.A.I" />
      </div>
      {/* Start Content */}
      <div className="w-full">
        <Card>
          <div className="px-6 pt-2 pb-4 w-full">
            <p className="ml-2 font-bold text-base">Pustaka Data</p>
            <div className="my-2 " />
            <UserSkaiDataTables
              data={userSKAI?.data?.data}
              setShowModal={setShowModal}
              handleClickAdd={handleClickAddTable}
              handleClickUpdate={handleClickUpdateTable}
              handleClickDelete={handleClickDeleteTable}
            />
          </div>
        </Card>
      </div>
      <ModalAddUserSKAI
        data={payload}
        typeModal={typeModal}
        showModal={showModal}
        validation={validation}
        handleChangeText={handleChangeText}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
      />
      {/* End Content */}
    </LayoutReferenceGeneral>
  );
};

export default index;
