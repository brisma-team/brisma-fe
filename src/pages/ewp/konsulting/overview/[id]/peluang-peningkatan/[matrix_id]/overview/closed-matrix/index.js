import {
  Breadcrumbs,
  ButtonField,
  ButtonIconBack,
  PageTitle,
} from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setObjData,
  setObjPayload,
  resetObjData,
  resetObjPayload,
} from "@/slices/ewp/konsulting/peluang-peningkatan/matrixEWPKonsultingSlice";
import {
  useMatrixDetail,
  useMatrixList,
} from "@/data/ewp/konsulting/peluang-peningkatan/closed-matrix";
import { fetchApi, loadingSwal } from "@/helpers";
import { DataTables } from "@/components/molecules/ewp/konsulting/peluang-peningkatan/closed-matrix";

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const pathName = `${baseUrl}/peluang-peningkatan`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [
    selectedId,
    //  setSelectedId
  ] = useState(0);

  const data = useSelector((state) => state.matrixEWPKonsulting.objData);

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
        name: `Peluang Peningkatan / Closed Matrix Overview `,
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
  }, [matrixDetail]);

  // [ START ] handler for table matrix

  const handleClickRevoke = async (matrix_id) => {
    loadingSwal();
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/matrix/undelete/${matrix_id}`,
      {}
    );
    matrixListMutate();
    loadingSwal("close");
  };
  // [ END ] handler for table matrix

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex gap-3 items-center mb-7">
        <ButtonIconBack
          backUrl={`/ewp/konsulting/overview/${id}/peluang-peningkatan/matrix`}
        />
        <PageTitle text="Matrix Peluang Peningkatan Overview (Closed)" />
      </div>
      <div className="flex gap-3 items-center mb-4">
        <div className="w-39 bg-atlasian-blue-light rounded">
          <ButtonField text="Tampilkan Filter" />
        </div>
      </div>
      {/* Start Content */}
      <div className="w-[60rem]">
        <DataTables data={data} handleClickRevoke={handleClickRevoke} />
      </div>
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;
