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
import { CardFilterOverview } from "@/components/molecules/ewp/konsulting/overview";
import { CardOverview } from "@/components/molecules/rpm/kegiatan/overview/rekomendasi";
import { useOverviewEWPKonsulting } from "@/data/ewp/konsulting/overview";
import { LandingLayoutRPMKegiatan } from "@/layouts/rpm";
import { IconFile } from "@/components/icons";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "EWP", path: "/ewp" },
  { name: "Consulting / Overview", path: "/ewp/konsulting/overview" },
];

const index = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [totalData, setTotalData] = useState(1);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    project_code: "",
    project_name: "",
    status_approval: "",
    status_document: "",
    anggota_tim_audit: "",
    start_date: "",
    end_date: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });
  const [params, setParams] = useState({
    project_code: "",
    project_name: "",
    status_approval: "",
    status_document: "",
    anggota_tim_audit: "",
    start_date: "",
    end_date: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });

  const { overviewEWPKonsulting, overviewEWPKonsultingMutate } =
    useOverviewEWPKonsulting(params);

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
      overviewEWPKonsultingMutate();
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  useEffect(() => {
    if (overviewEWPKonsulting?.data?.length) {
      const mapping = overviewEWPKonsulting.data.map((v) => {
        const {
          createdAt,
          need_approved,
          number_adendum,
          status_name,
          status_persetujuan_name,
          project_id,
          project_name,
          initiator,
        } = v;
        return {
          id: v?.id,
          tipe: v?.ref_tipe?.nama,
          jenis: v?.ref_jenis?.nama,
          project_code: project_id,
          project_name: project_name,
          period: `${convertDate(
            v?.info_periode_pelaksanaan_start,
            "-",
            "d"
          )} s/d ${convertDate(v?.info_periode_pelaksanaan_end, "-", "d")}`,
          auditor: v?.info_team_audit?.auditor || [],
          auditee: v?.info_team_audit?.auditee || [],
          ata: v?.info_team_audit?.ata || [],
          document_status: status_name,
          approval_status: status_persetujuan_name,
          addendum: number_adendum,
          need_approval: need_approved,
          href: `/ewp/projects/konsulting/${v?.id}/info`,
          created_at: createdAt,
          maker: `${initiator?.pn} - ${initiator?.nama}`,
        };
      });
      setData(mapping);
      setTotalData(overviewEWPKonsulting?.pagination?.totalData);
    } else {
      setData([]);
      setTotalData(1);
    }
  }, [overviewEWPKonsulting]);

  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };

  return (
    <LandingLayoutRPMKegiatan>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flexitems-center mb-6">
        <PageTitle text={"Rekomendasi Overview"} />
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
            handler={() => console.log("test")}
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
    </LandingLayoutRPMKegiatan>
  );
};

export default index;
