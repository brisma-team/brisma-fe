import {
  Breadcrumbs,
  ButtonField,
  Card,
  CustomPagination,
  PageTitle,
} from "@/components/atoms";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setObjData,
  resetObjData,
} from "@/slices/ewp/konsulting/peluang-peningkatan/overviewDetailPeluangSlice";
import { useMonitoringPeluangList } from "@/data/rpm/kegiatan";
import { DataTables } from "@/components/molecules/rpm/kegiatan";
import { LandingLayoutRPMKegiatan } from "@/layouts/rpm";
import { CardFilterOverview } from "@/components/molecules/rpm/kegiatan/overview/peluang-peningkatan";
import { SelectSortFilter } from "@/components/molecules/commons";
import _ from "lodash";

const CardTotalRekomendasi = ({ data }) => {
  return (
    <div className="w-[28rem] h-22">
      <Card>
        <div className="flex justify-between gap-2 px-2">
          <Card>
            <div className="flex gap-4 justify-between items-center px-2">
              <p className="text-xs">Total Rekomendasi</p>
              <div className="font-bold p-2">
                {data?.total_rekomendasi || 0}
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex gap-4 justify-between items-center px-2">
              <p className="text-xs">Incompleted Rekomendasi</p>
              <div className="font-bold p-2">
                {data?.total_incompleted || 0}
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex gap-4 justify-between items-center px-2">
              <span className="text-xs">Completed Rekomendasi</span>
              <span className="font-bold p-2">
                {data?.total_completed || 0}
              </span>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const baseUrl = `/rpm/kegiatan/${id}`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [totalData, setTotalData] = useState(1);
  const [datas, setDatas] = useState({
    total_rekomendasi: 0,
    total_incompleted: 0,
    total_completed: 0,
  });

  const [filter, setFilter] = useState({
    control_kode: "",
    risk_kode: "",
    judul_lingkup: "",
    nama_kkpt: "",
    auditor: "",
    sort_by: "ASC",
    limit: 2,
    page: 1,
  });
  const [params, setParams] = useState({
    control_kode: "",
    risk_kode: "",
    judul_lingkup: "",
    nama_kkpt: "",
    auditor: "",
    sort_by: "ASC",
    limit: 2,
    page: 1,
  });

  const data = useSelector((state) => state.overviewDetailPeluang.objData);

  const { monitoringPeluangList, monitoringPeluangListMutate } =
    useMonitoringPeluangList({
      id,
      params,
    });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "RPM", path: "/rpm" },
      { name: "Kegiatan Overview", path: "/rpm/kegiatan" },
      {
        name: `Landing Monitoring`,
        path: `${baseUrl}`,
      },
      {
        name: `Peluang Peningkatan`,
        path: `${baseUrl}/peluang-peningkatan`,
      },
    ]);
  }, [id]);

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
      monitoringPeluangListMutate();
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  useEffect(() => {
    if (monitoringPeluangList?.data?.kkpt?.length > 0) {
      let total_acc_rekomendasi = 0;
      let total_acc_incomplete = 0;
      let total_acc_onprogress = 0;
      let total_acc_complete = 0;

      const mappingOverview = monitoringPeluangList?.data?.kkpt?.map((v) => {
        const {
          nama_kkpt,
          project_rpm,
          auditor,
          total_incomplete,
          total_onprogress,
          total_complete,
          total_rekomendasi,
          rpm_action_plan,
        } = v;
        total_acc_rekomendasi += parseInt(total_rekomendasi);
        total_acc_incomplete += parseInt(total_incomplete);
        total_acc_onprogress += parseInt(total_onprogress);
        total_acc_complete += parseInt(total_complete);

        return {
          matrix_id: v?.id,
          kkpt_id: v?.kkpt_id,
          status_persetujuan: project_rpm?.status_persetujuan,
          judul_kkpt: nama_kkpt,
          auditor,
          total_incomplete,
          total_onprogress,
          total_complete,
          total_rekomendasi,
          rpm_action_plan,
        };
      });
      setDatas({
        total_rekomendasi: parseInt(total_acc_rekomendasi),
        total_incompleted: parseInt(total_acc_incomplete),
        total_onprogress: parseInt(total_acc_onprogress),
        total_completed: parseInt(total_acc_complete),
      });

      dispatch(setObjData(mappingOverview));
    } else {
      dispatch(resetObjData());
    }
    setTotalData(monitoringPeluangList?.data?.pagination?.totalData);
  }, [monitoringPeluangList]);

  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };

  return (
    <LandingLayoutRPMKegiatan>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Peluang Peningkatan Overview" />
      </div>
      <div className="flex justify-between items-end">
        <div className="flex justify-between items-center gap-2">
          <div className="w-36 bg-atlasian-blue-light rounded">
            <ButtonField
              handler={() => setShowFilter(!showFilter)}
              text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
            />
          </div>
        </div>
      </div>
      <div>
        <CardFilterOverview
          showFilter={showFilter}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      {/* Start Content */}
      <div className="w-[92rem] flex pr-16 mb-3 mt-5">
        <div className="items-end justify-end">
          <CardTotalRekomendasi data={datas} />
        </div>
        <div className="w-full flex items-end justify-end">
          <SelectSortFilter
            change={handleChangeFilter}
            options={[4, 8, 16, 50, 100]}
          />
        </div>
      </div>
      <div className="w-[92rem] pr-16">
        <Card>
          <div className="w-full px-4 py-2">
            <DataTables data={data} />
          </div>
        </Card>
        <CustomPagination
          perPage={filter.limit}
          defaultCurrentPage={1}
          handleSetPagination={(start, end, pageNow) =>
            handleChangeFilter("page", pageNow)
          }
          totalData={totalData}
        />
      </div>

      {/* End Content */}
    </LandingLayoutRPMKegiatan>
  );
};

export default index;
