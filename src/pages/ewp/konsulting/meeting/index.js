import React, { useEffect, useState } from "react";
import { OverviewLayoutEWP } from "@/layouts/ewp";
import {
  Breadcrumbs,
  ButtonField,
  CustomPagination,
  PageTitle,
} from "@/components/atoms";
import { DataNotFound, SelectSortFilter } from "@/components/molecules/commons";
import { convertDate, copyToClipboard } from "@/helpers";
import _ from "lodash";
import {
  CardFilterOverview,
  ModalAddProjectEWP,
} from "@/components/molecules/ewp/konsulting/overview";
import { CardOverview } from "@/components/molecules/ewp/konsulting/meeting/overview";
import { useApprovalEWP } from "@/data/ewp";
import { useOverviewEWPKonsulting } from "@/data/ewp/konsulting/overview";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "EWP", path: "/ewp" },
  { name: "Meeting Overview", path: "/ewp/konsulting/meeting" },
];

const index = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [totalData, setTotalData] = useState(1);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  const { approvalEWP } = useApprovalEWP("ewp");

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
    // if (overviewEWPKonsulting?.data?.length) {
    setData([
      {
        id: 1,
        tipe: "Onsite",
        meeting_code: "TEST123",
        meeting_name: "Meeting Konsultasi",
        maker: "00999002 - Dandy",
        created_at: "2024-12-12",
        period: "2024-12-12 s/d 2024-12-12",
        pic: [{ pn: "999002", nama: "Dandy" }],
        pembicara: [{ pn: "999002", nama: "Dandy" }],
        desc: "test meeting desc",
        link: "http://localhost:3000/ewp/konsulting/meeting",
      },
    ]);
    setTotalData(1);
    // } else {
    //   setData([]);
    //   setTotalData(1);
    // }
  }, []);

  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };

  const handleClickUrl = (e, url) => {
    e.stopPropagation();
    copyToClipboard(url, "Link meeting berhasil disalin ke clipboard.");
  };

  return (
    <OverviewLayoutEWP data={approvalEWP?.data?.header}>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flexitems-center mb-6">
        <PageTitle text={"Project Overview"} />
      </div>
      <div className="flex justify-between items-end">
        <div className="flex justify-between items-center gap-2">
          <div className="w-36 bg-atlasian-blue-light rounded">
            <ButtonField
              handler={() => setShowFilter(!showFilter)}
              text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
            />
          </div>
          <div className="w-36 rounded bg-atlasian-purple">
            <ButtonField
              handler={() => setShowModal(true)}
              text={"Buat Project"}
            />
            <ModalAddProjectEWP
              showModal={showModal}
              setShowModal={setShowModal}
              mutate={overviewEWPKonsultingMutate}
            />
          </div>
        </div>
        <div className="w-24 rounded bg-atlasian-blue-light">
          <ButtonField handler={() => console.log("test")} text={`Arsip`} />
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
            return (
              <CardOverview key={i} data={v} handleClickUrl={handleClickUrl} />
            );
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
