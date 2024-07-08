import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
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
  errorSwal,
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
import userSkaiSchema from "@/helpers/schemas/reference/userSkaiSchema";

import { LayoutReferenceGeneral } from "@/layouts/reference";
import useUser from "@/data/useUser";

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [selectedPn, setSelectedPn] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
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
  const { user } = useUser();
  const payload = useSelector(
    (state) => state.anggaranEWPKonsulting.objPayload
  );
  const validation = useSelector(
    (state) => state.anggaranEWPKonsulting.validationErrors
  );

  useEffect(() => {
    if (user !== undefined) {
      const { role_kode } = user.data;

      // Check if any role_kode is between 1 and 6
      const isAuthorized = role_kode.some(
        (code) => parseInt(code) >= 1 && parseInt(code) <= 6
      );

      if (!isAuthorized) {
        // Display error message with a delay
        errorSwal("Maaf, Anda tidak diizinkan mengakses halaman ini.");
        // Redirect to unauthorized page after 2 seconds
        const timeout = setTimeout(() => {
          router.push("/reference/");
        }, 2000); // 2 seconds timeout

        return () => clearTimeout(timeout); // Cleanup timeout if component unmounts
      }
      setIsAuthorized(isAuthorized);
    }
  }, [user]);

  // useEffect(() => {

  // }, [isAuthorized]);

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
    if (userSKAIDetail !== undefined) {
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

      const transformedPayload = {
        pn: {
          label: `${payload.pn} - ${payload.name}`,
          value: {
            pn: payload.pn,
            name: payload.name,
            jabatan: "", // Assuming "MANAGER" as jabatan, modify if needed
          },
        },
        uka_kode: {
          label: `${payload.kode_uka} - ${payload.name_uka}`,
          value: payload.kode_uka,
        },
        role_kode: payload?.role?.map((roles) => ({
          label: `${roles.kode_role} - ${roles.name_role}`,
          value: roles.kode_role,
        })),
      };

      dispatch(setObjPayload(transformedPayload));
    }
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
    const transformedPayload = {
      pn: payload.pn.value.pn,
      name: payload.pn.value.name,
      uka_kode: payload.uka_kode.value,
      role_kode: payload.role_kode.map((role) => role.value),
    };
    const valid = setErrorValidation(transformedPayload, dispatch, {
      schema: userSkaiSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    });

    if (!valid) return;

    const url = `${
      process.env.NEXT_PUBLIC_API_URL_SUPPORT
    }/reference/user_skai${typeModal === "update" ? "/update" : "/create"}`;

    const data =
      typeModal === "update"
        ? { pn: "", role_kode: [], uka_kode: "", ...transformedPayload }
        : transformedPayload;

    loadingSwal();

    try {
      await fetchApi(typeModal === "update" ? "PATCH" : "POST", url, data);
      userSKAIMutate();
      setShowModal(false);
      setTypeModal("");
      setSelectedPn("");
      dispatch(resetObjPayload());
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      loadingSwal("close");
    }
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
    const confirm = await confirmationSwal(
      "Aktivitas ini akan menghapus pengguna. Apakah anda yakin?"
    );
    if (!confirm.value) return;
    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/user_skai/delete/${id}`,
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
              withoutButtonAction={!isAuthorized}
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
