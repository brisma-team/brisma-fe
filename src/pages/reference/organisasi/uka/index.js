import {
  Breadcrumbs,
  ButtonField,
  Card,
  CustomPagination,
  PageTitle,
} from "@/components/atoms";
import { useState, useEffect, useCallback } from "react";
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
  errorSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import _ from "lodash";
import {
  CardFilterUKA,
  ModalAddUKA,
  UkaDataTables,
} from "@/components/molecules/reference/organisasi";
// import anggaranEWPKonsultingSchema from "@/helpers/schemas/ewp/konsulting/perencanaan/anggaranEWPKonsultingSchema";
import { LayoutReferenceGeneral } from "@/layouts/reference";
import useUka from "@/data/useUka";
import ukaSchema from "@/helpers/schemas/reference/ukaSchema";
import { useRouter } from "next/router";
import useUser from "@/data/useUser";

const index = () => {
  const dispatch = useDispatch();
  const baseUrl = "/reference/";
  const router = useRouter();
  const pathName = `${baseUrl}/perencanaan`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [params, setParams] = useState({
    kode: "",
    name: "",
    branch: "",
    orgeh: "",
    limit: 10,
    page: 1,
    offset: 1,
    total_data: 10,
  });
  const { uka, ukaMutate } = useUka(params, "search");
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

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "Reference", path: "/reference" },
      { name: "Organisasi", path: "/reference/organisasi" },
      {
        name: "Unit Kantor Audit",
        path: pathName,
      },
    ]);
  }, []);

  useEffect(() => {
    if (uka?.data?.data?.length) {
      const mappingUkas = uka?.data?.data?.map((v) => {
        return _.pick(v, [
          "kode",
          "name",
          "branch",
          "branch_name",
          "orgeh",
          "orgeh_name",
        ]);
      });
      dispatch(setObjData(mappingUkas));
      setParams({ ...params, total_data: uka?.data?.total_data });
    } else {
      dispatch(resetObjData());
    }
  }, [uka]);

  // useEffect(() => {
  //   if (userSKAIDetail?.data && typeModal === "update") {
  //     dispatch(
  //       setObjPayload(
  //         _.pick(userSKAIDetail?.data, [
  //           "pn",
  //           "name",
  //           "kode_uka",
  //           "name_uka",
  //           "role",
  //         ])
  //       )
  //     );
  //   } else {
  //     dispatch(resetObjPayload());
  //   }
  // }, [userSKAIDetail, typeModal, showModal]);

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
    dispatch(resetObjPayload());
    dispatch(resetValidationErrors());
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
      kode: payload?.kode,
      name: payload?.name,
      branch: payload?.branch?.value?.branch,
      branch_name: payload?.branch?.value?.branch_name,
      orgeh: payload?.orgeh?.value?.orgeh,
      orgeh_name: payload?.orgeh?.value?.orgeh_name,
    };
    const schemaMapping = {
      schema: ukaSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };
    const validate = setErrorValidation(
      transformedPayload,
      dispatch,
      schemaMapping
    );

    if (validate) {
      loadingSwal();
      if (typeModal === "update") {
        await fetchApi(
          "PATCH",
          `${process.env.NEXT_PUBLIC_API_URL_REFERENCE}/reference/uka/update`,
          { ...transformedPayload }
        );
      } else {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_REFERENCE}/reference/uka/create`,
          transformedPayload
        );
      }

      ukaMutate();
      setShowModal(false);
      setTypeModal("");
      dispatch(resetObjPayload());
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal

  // [ START ] handler for table
  const handleClickAddTable = () => {
    setShowModal(true);
  };

  const handleClickUpdateTable = async () => {
    setShowModal(true);
    setTypeModal("update");
  };

  const handleClickDeleteTable = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin akan menghapus UKA ini?."
    );

    if (!confirm.value) {
      return;
    }
    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/reference/uka/delete/${id}`,
      {}
    );
    ukaMutate();
    loadingSwal("close");
  };
  // [ END ] handler for table

  return (
    <LayoutReferenceGeneral>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle text="Unit Kantor Audit" />
      </div>
      <div className="flex justify-between items-end mb-3">
        <div className="flex justify-between items-center gap-2">
          <div className="w-36 bg-atlasian-blue-light rounded">
            <ButtonField
              handler={() => setShowFilter(!showFilter)}
              text={showFilter ? "Tutup Filter" : "Tampilkan Filter"}
            />
          </div>
        </div>
      </div>
      <div className="mb-5">
        <CardFilterUKA
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
            <UkaDataTables
              data={uka?.data?.data}
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
      <ModalAddUKA
        data={payload}
        typeModal={typeModal}
        showModal={showModal}
        validation={validation}
        handleChangeText={handleChangeText}
        handleChangeSelect={handleChangeSelect}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
      />
      {/* End Content */}
    </LayoutReferenceGeneral>
  );
};

export default index;
