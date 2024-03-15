import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setObjData,
  resetObjData,
} from "@/slices/ewp/konsulting/peluang-peningkatan/overviewDetailPeluangSlice";
import { useOverviewPeluangList } from "@/data/ewp/konsulting/peluang-peningkatan/matrix";
import { DataTables } from "@/components/molecules/rpm/kegiatan";
import { LandingLayoutRPMKegiatan } from "@/layouts/rpm";
const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const matrix_id = 1;
  const baseUrl = `/rpm/kegiatan/overview/${id}`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const data = useSelector((state) => state.overviewDetailPeluang.objData);

  const { projectDetail } = useProjectDetail({ id });
  const { overviewPeluangList } = useOverviewPeluangList({
    id: matrix_id,
  });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "RPM", path: "/rpm" },
      { name: "Overview", path: "/rpm/kegiatan/overview" },
      {
        name: `Peluang Peningkatan Overview`,
        path: `${baseUrl}/peluang-peningkatan`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (overviewPeluangList?.data?.length > 0) {
      const mappingOverview = overviewPeluangList?.data?.map((v) => {
        const { judul_kkpt, status_persetujuan, auditor } = v;
        return {
          matrix_id,
          kkpt_id: v?.id,
          status_persetujuan,
          judul_kkpt,
          auditor,
        };
      });

      dispatch(setObjData(mappingOverview));
    } else {
      dispatch(resetObjData());
    }
  }, [overviewPeluangList]);

  return (
    <LandingLayoutRPMKegiatan>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Monitoring Overview" />
      </div>
      {/* Start Content */}
      <div className="w-[92rem]">
        <DataTables data={data} />
      </div>
      {/* End Content */}
    </LandingLayoutRPMKegiatan>
  );
};

export default index;
