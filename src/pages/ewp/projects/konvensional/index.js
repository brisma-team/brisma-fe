import React, { useEffect, useState } from "react";
import { OverviewLayoutEWP } from "@/layouts/ewp";
import { IconFile, IconPlus } from "@/components/icons";
import {
  Breadcrumbs,
  PageTitle,
  Pagination,
  Spinner,
} from "@/components/atoms";
import {
  CardOverview,
  ModalAddProjectEWP,
} from "@/components/molecules/ewp/konvensional/overview";
import { DataNotFound, SelectSortFilter } from "@/components/molecules/commons";
import { useOverviewEWP } from "@/data/ewp/konvensional";
import { convertDate } from "@/helpers";
import Button from "@atlaskit/button";
import _ from "lodash";
import CardFilterProjectOverview from "@/components/molecules/ewp/konvensional/overview/CardFilterProjectOverview";
import { useApprovalEWP } from "@/data/ewp";
import { useRef } from "react";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "EWP", path: "/ewp" },
  { name: "Overview", path: "/ewp/projects/konvensional" },
];

const convertProgressAndPercent = (status) => {
  let progress, percent;
  switch (status) {
    case "mapa":
      progress = 0.14;
      percent = "14%";
      break;
    case "entrance":
      progress = 0.28;
      percent = "28%";
      break;
    case "pelaksanaan":
      progress = 0.42;
      percent = "42%";
      break;
    case "exit":
      progress = 0.56;
      percent = "56%";
      break;
    case "penyusunan LHA":
      progress = 0.7;
      percent = "70%";
      break;
    case "dokumen":
      progress = 0.85;
      percent = "85%";
      break;
    case "final":
      progress = 1;
      percent = "100%";
      break;
  }
  return { progress, percent };
};

const index = () => {
  const ref = useRef(null);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState("ASC");
  const [filter, setFilter] = useState({
    name: "",
    is_audited: false,
    ref_metode: "",
    ref_tipe: "",
    ref_jenis: "",
    ref_tema: "",
  });
  const [params, setParams] = useState({
    name: "",
    is_audited: false,
    ref_metode: "",
    ref_tipe: "",
    ref_jenis: "",
    ref_tema: "",
  });

  const { overviewEWP, overviewEWPError, overviewEWPMutate } = useOverviewEWP(
    "all",
    {
      ...params,
      pages: currentPage,
      limit: 8,
      sortBy,
    }
  );

  const { approvalEWP } = useApprovalEWP("ewp");

  const handleChangeSortBy = (e) => {
    setSortBy(e.value);
  };

  useEffect(() => {
    console.log("ref => ", ref);
  }, [ref]);

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
      overviewEWPMutate();
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  useEffect(() => {
    if (overviewEWP) {
      const mapping = overviewEWP.data.map((v) => {
        return {
          id: v?.id,
          jenis: v?.ref_jenis?.nama,
          projectId: v?.project_id,
          projectName: v?.project_name,
          period: `${convertDate(
            v?.info_periode_pelaksanaan_start,
            "-",
            "d"
          )} s/d ${convertDate(v?.info_periode_pelaksanaan_end, "-", "d")}`,
          progress: convertProgressAndPercent(v?.status_name).progress,
          percent: convertProgressAndPercent(v?.status_name).percent,
          ma: v?.info_team_audit?.ma,
          kta: v?.info_team_audit?.kta,
          ata: v?.info_team_audit?.ata,
          documentStatus: v?.status_name,
          approvalStatus: v?.status_approver
            ? `On ${v?.status_approver?.pn}`
            : ``,
          addendum: v?.number_adendum.toString(),
          needApproval: v?.need_approved,
          href: `/ewp/projects/konvensional/${v?.id}/info`,
        };
      });
      setData(mapping);
      setTotalPages(overviewEWP?.page?.totalPage);
    }
  }, [overviewEWP]);

  return (
    <OverviewLayoutEWP data={approvalEWP?.data?.header}>
      <div className="pr-40">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Project Overview"} />
        </div>
        <div className="flex justify-between items-end">
          {/* Start Filter */}
          <div className="flex justify-between items-center gap-2">
            <div className="w-36">
              <Button
                appearance="primary"
                onClick={() => setShowFilter(!showFilter)}
                shouldFitContainer
              >
                {showFilter ? `Tutup Filter` : `Tampilkan Filter`}
              </Button>
            </div>
            <div className="w-36">
              <Button
                appearance="danger"
                iconBefore={<IconPlus />}
                onClick={() => setShowModal(true)}
                shouldFitContainer
              >
                Buat Project
              </Button>
              <ModalAddProjectEWP
                showModal={showModal}
                setShowModal={setShowModal}
                mutate={overviewEWPMutate}
              />
            </div>
          </div>
          <div className="w-24">
            <Button
              appearance="primary"
              onClick={() => setShowModal(true)}
              shouldFitContainer
              iconBefore={<IconFile />}
            >
              Arsip
            </Button>
          </div>
        </div>
        <div className="relative">
          <CardFilterProjectOverview
            showFilter={showFilter}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
        <div className="w-full min-h-[8.8rem] flex items-end justify-end">
          <SelectSortFilter change={handleChangeSortBy} />
        </div>
        {/* End Filter */}
        {/* Start Content */}
        <div className="flex flex-wrap my-4 overflow-hidden -ml-2">
          {overviewEWPError ? (
            <DataNotFound />
          ) : data?.length ? (
            data.map((v, i) => {
              return <CardOverview key={i} data={v} callbackRef={ref} />;
            })
          ) : (
            <Spinner />
          )}
        </div>
        <Pagination pages={totalPages} setCurrentPage={setCurrentPage} />
        {/* End Content */}
      </div>
    </OverviewLayoutEWP>
  );
};

export default index;
