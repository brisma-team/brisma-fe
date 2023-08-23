import React, { useEffect, useState } from "react";
import { EwpOverviewLayout } from "@/layouts/ewp";
import { IconPlus } from "@/components/icons";
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
import { DataNotFound } from "@/components/molecules/commons";
import { useOverviewEWP } from "@/data/ewp/konvensional";
import { convertDate } from "@/helpers";
import Button from "@atlaskit/button";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [typeModal, setTypeModal] = useState(null);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [params, setParams] = useState({
  //   project_name: "",
  //   status_approver: "",
  //   status_pat: "",
  //   sortBy: "",
  //   year: "",
  // });
  // const [filter, setFilter] = useState({
  //   project_name: "",
  //   status_approver: "",
  //   status_pat: "",
  //   sortBy: "",
  //   year: "",
  // });

  const {
    overviewEWP,
    overviewEWPIsLoading,
    overviewEWPError,
    overviewEWPMutate,
  } = useOverviewEWP("all", {
    pages: currentPage,
    limit: 8,
  });

  // useEffect(() => {
  //   const handleSearch = () => {
  //     setParams(filter);
  //     projectOverviewMutate;
  //   };
  //   const debouncedSearch = _.debounce(handleSearch, 800);
  //   debouncedSearch();
  //   return () => {
  //     debouncedSearch.cancel();
  //   };
  // }, [filter]);

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
          href: `/ewp/projects/konvensional/${v?.id}`,
        };
      });
      setData(mapping);
      setTotalPages(overviewEWP?.page?.totalPage);
    }
  }, [overviewEWP]);

  return (
    <EwpOverviewLayout>
      <div className="pr-40">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Project Overview"} />
        </div>
        <div className="flex justify-between items-center mb-6">
          {/* Start Filter */}
          <div className="flex justify-between items-center gap-2">
            <div className="w-36">
              <Button
                appearance="primary"
                onClick={() => setOpenFilter(!openFilter)}
                shouldFitContainer
              >
                Tampilkan Filter
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
                typeModal={typeModal}
                mutate={overviewEWPMutate}
              />
            </div>
          </div>
          <div className="w-40">
            <Button
              appearance="primary"
              onClick={() => setShowModal(true)}
              shouldFitContainer
            >
              Arsip
            </Button>
          </div>
        </div>
        {/* End Filter */}
        {/* Start Content */}
        <div className="flex flex-wrap my-4 overflow-hidden -ml-2">
          {overviewEWPError ? (
            <DataNotFound />
          ) : data?.length ? (
            data.map((v, i) => {
              return <CardOverview key={i} data={v} />;
            })
          ) : (
            <Spinner />
          )}
        </div>
        <Pagination pages={totalPages} setCurrentPage={setCurrentPage} />
        {/* End Content */}
      </div>
    </EwpOverviewLayout>
  );
};

export default index;
