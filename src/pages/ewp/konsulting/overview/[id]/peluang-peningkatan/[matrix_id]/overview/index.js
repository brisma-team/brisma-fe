import { Breadcrumbs, PageTitle } from "@/components/atoms";
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
} from "@/slices/ewp/konsulting/peluang-peningkatan/overviewDetailPeluangSlice";
import {
  useOverviewPeluangList,
  useOverviewDetailPeluang,
} from "@/data/ewp/konsulting/peluang-peningkatan/matrix";
import {
  confirmationSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import {
  ModalMatrix,
  DataTables,
} from "@/components/molecules/ewp/konsulting/peluang-peningkatan/matrix/overview";
import { PrevNextNavigation } from "@/components/molecules/commons";
import overviewDetailPeluangSchema from "@/helpers/schemas/ewp/konsulting/peluang-peningkatan/overviewDetailPeluangSchema";

const routes = [
  {
    name: "Info Header",
    slug: "info-header",
  },
  {
    name: "Overview",
    slug: "overview",
  },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const dispatch = useDispatch();
  const { id, matrix_id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const pathNameBase = `${baseUrl}/peluang-peningkatan`;
  const pathNameContent = `${baseUrl}/peluang-peningkatan/${matrix_id}`;

  const [showModalMatrix, setShowModalMatrix] = useState(false);
  const [isUpdateMatrix, setIsUpdateMatrix] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [selectedId, setSelectedId] = useState(0);

  const data = useSelector((state) => state.overviewDetailPeluang.objData);
  const payload = useSelector(
    (state) => state.overviewDetailPeluang.objPayload
  );
  const validation = useSelector(
    (state) => state.overviewDetailPeluang.validationErrors
  );

  const { projectDetail } = useProjectDetail({ id });
  const { overviewPeluangList, overviewPeluangListMutate } =
    useOverviewPeluangList({
      id: matrix_id,
    });
  const { overviewPeluangDetail } = useOverviewDetailPeluang({
    id: selectedId,
  });

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
        name: `Peluang Peningkatan`,
        path: `${pathNameBase}`,
      },
      {
        name: `Overview`,
        path: `${pathNameContent}/overview`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (overviewPeluangList?.data?.length > 0) {
      const mappingOverview = overviewPeluangList?.data?.map((v) => {
        const { judul_kkpt, status_persetujuan } = v;
        return {
          matrix_id,
          kkpt_id: v?.id,
          status_persetujuan,
          judul_kkpt,
        };
      });

      dispatch(setObjData(mappingOverview));
    } else {
      dispatch(resetObjData());
    }
  }, [overviewPeluangList]);

  useEffect(() => {
    if (overviewPeluangDetail?.data) {
      const { judul_kkpt } = overviewPeluangDetail.data;
      dispatch(setObjPayload({ judul_kkpt }));
    } else {
      dispatch(resetObjPayload());
    }
  }, [overviewPeluangDetail, showModalMatrix]);

  // [ START ] handler for table matrix
  const handleClickAddMatrix = () => {
    setShowModalMatrix(true);
  };

  const handleClickEdit = (matrix_id) => {
    setSelectedId(matrix_id);
    setIsUpdateMatrix(true);
    setShowModalMatrix(true);
  };

  const handleClickDelete = async (id) => {
    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/delete/${id}`,
      { kkpt_id: id }
    );
    overviewPeluangListMutate();
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
      schema: overviewDetailPeluangSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };

    const validate = setErrorValidation(payload, dispatch, schemaMappings);

    if (validate) {
      loadingSwal();
      if (isUpdateMatrix) {
        await fetchApi(
          "PATCH",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/update/${selectedId}`,
          payload
        );
      } else {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/create`,
          { ...payload, matrix_id }
        );
      }
      setShowModalMatrix(false);
      setIsUpdateMatrix(false);
      overviewPeluangListMutate();
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
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Peluang Peningkatan Overview" />
        <PrevNextNavigation
          baseUrl={pathNameContent}
          routes={routes}
          prevUrl={"/header"}
          nextUrl={"/dokumen"}
          marginLeft={"-60px"}
        />
      </div>
      {/* Start Content */}
      <div className="w-[60rem]">
        <DataTables
          selectedId={id}
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
