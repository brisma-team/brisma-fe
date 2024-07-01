import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  setObjData,
  setObjPayload,
  setValidationErrors,
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

  const { userSKAI, userSKAIMutate } = useUserSKAI(params, "search");
  const { userSKAIDetail } = useUserSKAIDetail(selectedPn);

  console.log(userSKAIDetail);
  const payload = useSelector(
    (state) => state.anggaranEWPKonsulting.objPayload
  );
  const validation = useSelector(
    (state) => state.anggaranEWPKonsulting.validationErrors
  );

  useEffect(() => {
    const mappingUsers = userSKAI?.data?.data?.map((v) => ({
      id: v.id,
      pn: v.pn,
      name: v.name,
      kode_uka: v.kode_uka,
      name_uka: v.name_uka,
      role: v.role,
    }));
    dispatch(setObjData(mappingUsers));
    setParams({ ...params, total_data: userSKAI?.data?.total_data });
  }, [userSKAI]);

  useEffect(() => {
    const payload =
      userSKAIDetail?.data && typeModal === "update"
        ? _.pick(userSKAIDetail?.data, [
            "pn",
            "name",
            "kode_uka",
            "name_uka",
            "role",
          ])
        : {};
    dispatch(setObjPayload(payload));
  }, [userSKAIDetail, typeModal, showModal]);

  const handleCloseModal = () => {
    confirmationSwal("Apakah Anda ingin menutup modal ini?").then((confirm) => {
      if (confirm.value) {
        setShowModal(false);
        setTypeModal("");
        setSelectedPn("");
        dispatch(resetObjPayload());
        dispatch(resetValidationErrors());
      }
    });
  };

  const handleChangeText = useCallback(
    (property, value) => {
      dispatch(setObjPayload({ ...payload, [property]: value }));
    },
    [dispatch, payload]
  );

  const handleChangeSelect = useCallback(
    (property, value) => {
      dispatch(setObjPayload({ ...payload, [property]: value }));
    },
    [dispatch, payload]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = setErrorValidation(payload, dispatch, {
      schema: anggaranEWPKonsultingSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    });
    if (!valid) return;
    const amount = parseInt(payload.amount.replace(/\./g, ""));
    const payloadWithoutAmount = _.omit(payload, "amount");
    const url = `${
      process.env.NEXT_PUBLIC_API_URL_REFERENCE
    }/reference/user_skai${typeModal === "update" ? "/update" : "/create"}`;
    const data =
      typeModal === "update"
        ? {
            pn: "",
            role_kode: [],
            uka_kode: "",
            ...payloadWithoutAmount,
            amount,
          }
        : { ...payloadWithoutAmount, amount };
    loadingSwal();
    await fetchApi(typeModal === "update" ? "PATCH" : "POST", url, data);
    userSKAIMutate();
    setShowModal(false);
    setTypeModal("");
    setSelectedPn("");
    dispatch(resetObjPayload());
    loadingSwal("close");
  };

  const handleClickAddTable = () => {
    setShowModal(true);
  };

  const handleClickUpdateTable = (pn) => {
    setShowModal(true);
    setTypeModal("update");
    setSelectedPn(pn);
  };

  const handleClickDeleteTable = async (id) => {
    const confirm = await confirmationSwal("Menghapus Pengguna.");
    if (!confirm.value) return;
    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/reference/user_skai/delete/${id}`,
      {}
    );
    userSKAIMutate();
    loadingSwal("close");
  };

  return (
    <LayoutReferenceGeneral>
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex justify-between items-center mb-6">
        <PageTitle text="User S.K.A.I" />
      </div>
      <div className="flex justify-between items-end mb-3">
        <div className="flex justify-between items-center gap-2">
          <div className="w-36 bg-atlasian-blue-light rounded">
            <ButtonField
              handler={() => setShowFilter((show) => !show)}
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
      <div className="w-full">
        <Card>
          <div className="px-6 pt-2 pb-4 w-full">
            <p className="font-bold text-base mb-4">Pustaka Data</p>
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
                setParams((prev) => ({
                  ...prev,
                  page: pageNow,
                  offset: (pageNow - 1) * prev?.limit,
                }))
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
        handleChangeSelect={handleChangeSelect}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
      />
    </LayoutReferenceGeneral>
  );
};

export default index;
