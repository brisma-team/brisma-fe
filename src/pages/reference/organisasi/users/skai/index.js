import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  setObjData,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} from "@/slices/ewp/konsulting/perencanaan/anggaranEWPKonsultingSlice";
import {
  confirmationSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import useUserSKAI from "@/data/useUserSKAI";
import useUserSKAIDetail from "@/data/useUserSKAIDetail";
import {
  Breadcrumbs,
  ButtonField,
  Card,
  CustomPagination,
  PageTitle,
} from "@/components/atoms";
import {
  ModalAddUserSKAI,
  UserSkaiDataTables,
  CardFilterUserSKAI,
} from "@/components/molecules/reference/organisasi";
import anggaranEWPKonsultingSchema from "@/helpers/schemas/ewp/konsulting/perencanaan/anggaranEWPKonsultingSchema";

import { LayoutReferenceGeneral } from "@/layouts/reference";

const index = () => {
  const dispatch = useDispatch();

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [selectedPn, setSelectedPn] = useState("");

  // const [filter, setFilter] = useState({
  //   personal_number: "",
  //   name: "",
  //   uka_kode: "",
  //   role_kode: [],
  // });

  const [params, setParams] = useState({
    pn: "",
    name: "",
    uka_kode: "",
    role_kode: "",
    limit: 10,
    offset: 1,
    page: 1,
    total_data: 10,
  });

  const payload = useSelector(
    (state) => state.anggaranEWPKonsulting.objPayload
  );
  const validation = useSelector(
    (state) => state.anggaranEWPKonsulting.validationErrors
  );

  // const { user } = useUser();
  const { userSKAI, userSKAIMutate } = useUserSKAI(params, "search");
  const { userSKAIDetail } = useUserSKAIDetail(selectedPn);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "Reference", path: "/reference" },
      { name: "Organisasi", path: "/reference/organisasi" },
      {
        name: `User S.K.A.I`,
        path: "/reference/organisasi/users/skai",
      },
    ]);
  }, []);

  useEffect(() => {
    if (userSKAI?.data?.data?.length) {
      const mappingUsers = userSKAI?.data?.data?.map((v) => {
        return _.pick(v, ["id", "pn", "name", "kode_uka", "name_uka", "role"]);
      });
      dispatch(setObjData(mappingUsers));
      setParams({ ...params, total_data: userSKAI?.data?.total_data });
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
      <div className="flex justify-between items-end mb-3">
        <div className="flex justify-between items-center gap-2">
          <div className="w-36 bg-atlasian-blue-light rounded">
            <ButtonField
              handler={() => setShowFilter(!showFilter)}
              text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
            />
          </div>
        </div>
      </div>
      <div className="mb-5">
        <CardFilterUserSKAI
          showFilter={showFilter}
          filter={params}
          setFilter={setParams}
        />
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
            <CustomPagination
              defaultCurrentPage={1}
              perPage={params?.limit}
              totalData={params?.total_data}
              handleSetPagination={async (start, end, pageNow) =>
                setParams((prev) => {
                  return {
                    ...prev,
                    page: pageNow,
                    offset: (pageNow - 1) * prev?.limit,
                  };
                })
              }
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
