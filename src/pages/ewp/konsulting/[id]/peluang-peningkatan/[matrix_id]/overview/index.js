import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setObjData,
  setObjDataPicControl,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjDataPicControl,
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
import { useTimTimeplan } from "@/data/ewp/konsulting/perencanaan/tim-timeplan";
import matrixEWPKonsultingSchema from "@/helpers/schemas/ewp/konsulting/peluang-peningkatan/matrixEWPKonsultingSchema";
import useUser from "@/data/useUser";

const routes = [
  {
    name: "Header",
    slug: "header",
  },
  {
    name: "Peluang Peningkatan",
    slug: "overview",
  },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const dispatch = useDispatch();
  const { id, matrix_id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/${id}`;
  const pathNameBase = `${baseUrl}/peluang-peningkatan`;
  const pathNameContent = `${baseUrl}/peluang-peningkatan/${matrix_id}`;

  const [showModalMatrix, setShowModalMatrix] = useState(false);
  const [isUpdateMatrix, setIsUpdateMatrix] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);

  const data = useSelector((state) => state.overviewDetailPeluang.objData);
  const payload = useSelector(
    (state) => state.overviewDetailPeluang.objPayload
  );
  const validation = useSelector(
    (state) => state.overviewDetailPeluang.validationErrors
  );
  const dataPIC = useSelector(
    (state) => state.overviewDetailPeluang.objDataPicControl
  );

  const { projectDetail } = useProjectDetail({ id });
  const { overviewPeluangList, overviewPeluangListMutate } =
    useOverviewPeluangList({
      id: matrix_id,
    });
  const { overviewPeluangDetail } = useOverviewDetailPeluang({
    id: selectedId,
  });
  const { timTimeplan, timTimeplanError } = useTimTimeplan({
    id,
  });
  const { user } = useUser();

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `${baseUrl}/info`,
      },
      {
        name: `Peluang Peningkatan`,
        path: `${pathNameBase}`,
      },
      {
        name: `Pustaka Peluang Peningkatan`,
        path: `${pathNameContent}/overview`,
      },
    ]);

    setIsCloseSubmodule(
      Boolean(projectDetail?.data?.realisasi?.peluang_peningkatan_real_end)
    );
    setIsInitiator(
      Boolean(
        projectDetail?.data?.project_info?.initiator?.pn === user?.data?.pn
      )
    );
  }, [projectDetail, user]);

  useEffect(() => {
    if (overviewPeluangList?.data?.length > 0) {
      const mappingOverview = overviewPeluangList?.data?.map((v) => {
        const {
          judul_kkpt,
          status_persetujuan,
          auditor,
          risk_issue,
          lingkup,
          control,
        } = v;
        return {
          matrix_id,
          kkpt_id: v?.id,
          status_persetujuan,
          judul_kkpt,
          auditor,
          risk_issue,
          lingkup,
          control,
        };
      });

      dispatch(setObjData(mappingOverview));
    } else {
      dispatch(resetObjData());
    }
  }, [overviewPeluangList]);

  useEffect(() => {
    if (isUpdateMatrix && overviewPeluangDetail?.data) {
      const { judul_kkpt, auditor } = overviewPeluangDetail.data;
      dispatch(setObjPayload({ judul_kkpt, auditor }));
    } else {
      dispatch(resetObjPayload());
    }
  }, [overviewPeluangDetail, showModalMatrix, isUpdateMatrix]);

  useEffect(() => {
    if (!timTimeplanError) {
      const timAuditInfo = timTimeplan?.data?.tim_audit;
      const mappingAuditor = timAuditInfo?.auditor?.length
        ? timAuditInfo?.auditor?.map((v) => {
            const { pn, nama } = v;
            return {
              pn,
              nama,
            };
          })
        : [];

      const mappingATA = timAuditInfo?.ata?.length
        ? timAuditInfo?.ata?.map((v) => {
            const { pn, nama } = v;
            return {
              pn,
              nama,
            };
          })
        : [];

      const mergeMapping = [...mappingAuditor, ...mappingATA];
      const mapping = mergeMapping?.length
        ? mergeMapping?.map((v) => {
            return { label: v?.nama, value: { pn: v?.pn, name: v?.nama } };
          })
        : [];
      dispatch(setObjDataPicControl(mapping));
    } else {
      dispatch(resetObjDataPicControl());
    }
  }, [timTimeplan]);

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
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menghapus data ini?"
    );
    if (!confirm.value) {
      return;
    }

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
    setIsUpdateMatrix(false);
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
      <div className="w-[83rem] bg-white">
        <DataTables
          selectedId={id}
          data={data}
          withoutButton={!(isInitiator && !isCloseSubmodule)}
          handleClickAddMatrix={handleClickAddMatrix}
          handleClickEdit={handleClickEdit}
          handleClickDelete={handleClickDelete}
        />
      </div>
      <ModalMatrix
        data={payload}
        dataPIC={dataPIC}
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
