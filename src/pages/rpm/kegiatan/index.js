import React, { useEffect, useState } from "react";
import {
  Breadcrumbs,
  ButtonField,
  CustomPagination,
  PageTitle,
} from "@/components/atoms";
import { DataNotFound, SelectSortFilter } from "@/components/molecules/commons";
import { convertDate } from "@/helpers";
import _ from "lodash";
import { CardOverview } from "@/components/molecules/rpm/kegiatan";
import { CardFilterOverview } from "@/components/molecules/rpm/kegiatan/overview";
import { useApprovalRPM, useOverviewRPMKonsulting } from "@/data/rpm/kegiatan";
import { IconFile } from "@/components/icons";
import { OverviewLayoutEWP } from "@/layouts/ewp";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "RPM", path: "/rpm" },
  { name: "Kegiatan Overview", path: "/rpm/kegiatan/overview" },
];

const convertProgressAndPercent = (status) => {
  let progress, percent;
  switch (status) {
    case "On Progress":
      progress = 0.3;
      percent = "30%";
      break;
    case "On Approver":
      progress = 0.6;
      percent = "60%";
      break;
    case "Final":
      progress = 1;
      percent = "100%";
      break;
  }
  return { progress, percent };
};

const index = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [totalData, setTotalData] = useState(1);
  const [data, setData] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({
    project_code: "",
    project_name: "",
    status_persetujuan: "",
    inisiator: "",
    tanggal_inisiasi: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });
  const [params, setParams] = useState({
    project_code: "",
    project_name: "",
    status_persetujuan: "",
    inisiator: "",
    tanggal_inisiasi: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });

  const { approvalRPM } = useApprovalRPM();

  const { overviewRPMKonsulting, overviewRPMKonsultingMutate } =
    useOverviewRPMKonsulting(params);

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
      overviewRPMKonsultingMutate();
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  useEffect(() => {
    if (overviewRPMKonsulting?.data?.length) {
      const mapping = overviewRPMKonsulting.data.map((v) => {
        const {
          createdAt,
          num_evaluasi,
          status_rpm,
          status_persetujuan,
          project_id,
          nama_project,
          create_by,
        } = v;
        return {
          id: v?.id,
          tipe: v?.ref_tipe?.nama,
          jenis: v?.ref_jenis?.nama,
          project_code: project_id,
          project_name: nama_project,
          period: `${convertDate(
            v?.info_periode_pelaksanaan_start,
            "-",
            "d"
          )} s/d ${convertDate(v?.info_periode_pelaksanaan_end, "-", "d")}`,
          progress: convertProgressAndPercent(v?.status_persetujuan).progress,
          percent: convertProgressAndPercent(v?.status_persetujuan).percent,
          auditor: v?.info_team_audit?.auditor || [],
          auditee: v?.info_team_audit?.auditee || [],
          ata: v?.info_team_audit?.ata || [],
          document_status: status_rpm,
          approval_status: status_persetujuan,
          evaluasi: num_evaluasi,
          href: `/rpm/kegiatan/${v?.id}`,
          created_at: createdAt,
          maker: `${create_by?.pn} - ${create_by?.nama}`,
        };
      });
      setData(mapping);
      setTotalData(overviewRPMKonsulting?.pagination?.totalData);
    } else {
      setData([]);
      setTotalData(1);
    }
  }, [overviewRPMKonsulting]);

  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };
  return (
    <OverviewLayoutEWP data={approvalRPM?.data?.header}>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flexitems-center mb-6">
        <PageTitle text={"RPM Kegiatan Overview"} />
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
        <div className="w-24 rounded bg-atlasian-blue-light">
          <ButtonField
            icon={<IconFile primaryColor="white" />}
            isCentered={false}
            text={`Arsip`}
          />
        </div>
      </div>
      <div className="">
        <CardFilterOverview
          showFilter={showFilter}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <div className="w-full mt-6 flex items-end justify-end">
        <SelectSortFilter
          change={handleChangeFilter}
          options={[4, 8, 16, 50, 100]}
        />
      </div>
      {/* End Filter */}
      {/* Start Content */}
      {data?.length ? (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3 my-4">
          {data.map((v, i) => {
            return <CardOverview key={i} data={v} />;
          })}
        </div>
      ) : (
        <DataNotFound />
      )}
      <CustomPagination
        perPage={filter.limit}
        defaultCurrentPage={1}
        handleSetPagination={(start, end, pageNow) =>
          handleChangeFilter("page", pageNow)
        }
        totalData={totalData}
      />
      {/* End Content */}
    </OverviewLayoutEWP>
  );
};

export default index;
