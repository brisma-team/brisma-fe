import { Breadcrumbs, ButtonIconBack, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setObjData,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} from "@/slices/ewp/konsulting/analisa/matrixEWPKonsultingSlice";
import {
  useMatrixDetail,
  useMatrixList,
} from "@/data/ewp/konsulting/analisa/matrix";
import {
  confirmationSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import {
  ModalMatrix,
  DataTables,
} from "@/components/molecules/ewp/konsulting/analisa/matrix";
import matrixEWPKonsultingSchema from "@/helpers/schemas/ewp/konsulting/analisa/matrixEWPKonsultingSchema";

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const pathName = `${baseUrl}/analisa`;

  const [showModalMatrix, setShowModalMatrix] = useState(false);
  const [isUpdateMatrix, setIsUpdateMatrix] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [selectedId, setSelectedId] = useState(0);

  const data = useSelector((state) => state.matrixEWPKonsulting.objData);
  const payload = useSelector((state) => state.matrixEWPKonsulting.objPayload);
  const validation = useSelector(
    (state) => state.matrixEWPKonsulting.validationErrors
  );

  const { projectDetail } = useProjectDetail({ id });
  const { matrixList, matrixListMutate } = useMatrixList({ id });
  const { matrixDetail } = useMatrixDetail({ id: selectedId });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting/overview" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `${baseUrl}/info`,
      },
      {
        name: `Analisa / Matrix Peluang`,
        path: `${pathName}/matrix`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (matrixList?.data?.length) {
      const mappingMatrix = matrixList?.data?.map((v) => {
        const { judul, auditor, createdAt } = v;
        return {
          matrix_id: v?.id,
          judul,
          auditor,
          tanggal: createdAt,
        };
      });

      dispatch(setObjData(mappingMatrix));
    } else {
      dispatch(resetObjData());
    }
  }, [matrixList]);

  useEffect(() => {
    if (matrixDetail?.data) {
      const { judul, auditor } = matrixDetail.data;
      dispatch(setObjPayload({ judul, auditor }));
    } else {
      dispatch(resetObjPayload());
    }
  }, [matrixDetail, showModalMatrix]);

  // [ START ] handler for table matrix
  const handleClickAddMatrix = () => {
    setShowModalMatrix(true);
  };

  const handleClickEdit = (matrix_id) => {
    setSelectedId(matrix_id);
    setIsUpdateMatrix(true);
    setShowModalMatrix(true);
  };

  const handleClickDelete = async (matrix_id) => {
    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpa/rencana_peluang/delete/${matrix_id}`,
      {}
    );
    matrixListMutate();
    loadingSwal("close");
  };
  // [ END ] handler for table matrix

  // [ START ] handler for modal matrix
  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalMatrix(false);
    dispatch(resetObjPayload());
  };

  const handleChangePayload = (property, value) => {
    dispatch(setObjPayload({ ...payload, [property]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schemaMappings = {
      schema: matrixEWPKonsultingSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };

    const validate = setErrorValidation(payload, dispatch, schemaMappings);

    if (validate) {
      loadingSwal();
      if (isUpdateMatrix) {
        await fetchApi(
          "PATCH",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpa/rencana_peluang/update/${selectedId}`,
          payload
        );
      } else {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpa/rencana_peluang/create`,
          { ...payload, ewp_id: id }
        );
      }
      setShowModalMatrix(false);
      setIsUpdateMatrix(false);
      matrixListMutate();
      dispatch(resetObjPayload());
      dispatch(resetValidationErrors());
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal matrix

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex gap-3 items-center mb-7">
        <ButtonIconBack
          backUrl={`/ewp/konsulting/overview/${id}/analisa/lingkup`}
        />
        <PageTitle text="Matrix Peluang Peningkatan" />
      </div>
      {/* Start Content */}
      <div className="w-[60rem]">
        <DataTables
          data={data}
          handleClickAddMatrix={handleClickAddMatrix}
          handleClickEdit={handleClickEdit}
          handleClickDelete={handleClickDelete}
        />
      </div>
      <ModalMatrix
        data={payload}
        validation={validation}
        showModal={showModalMatrix}
        handleChange={handleChangePayload}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
      />
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;
