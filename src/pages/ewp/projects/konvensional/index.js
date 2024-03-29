import React, { useEffect, useState } from "react";
import { OverviewLayoutEWP } from "@/layouts/ewp";
import { IconFile } from "@/components/icons";
import {
  Breadcrumbs,
  ButtonField,
  CustomPagination,
  PageTitle,
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
  const [totalData, setTotalData] = useState(1);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    is_audited: false,
    ref_metode: "",
    ref_tipe: "",
    ref_jenis: "",
    ref_tema: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });
  const [params, setParams] = useState({
    name: "",
    is_audited: false,
    ref_metode: "",
    ref_tipe: "",
    ref_jenis: "",
    ref_tema: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });

  const { overviewEWP, overviewEWPError, overviewEWPMutate } = useOverviewEWP(
    "all",
    params
  );

  const { approvalEWP } = useApprovalEWP("ewp");

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
    if (overviewEWP?.data?.length) {
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
      setTotalData(overviewEWP?.pagination?.totalData);
    } else {
      setData([]);
      setTotalData(1);
    }
  }, [overviewEWP]);

  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };

  return (
    <OverviewLayoutEWP data={approvalEWP?.data?.header}>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle text={"Project Overview"} />
      </div>
      <div className="flex justify-between items-end">
        {/* Start Filter */}
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
        <SelectSortFilter
          change={handleChangeFilter}
          options={[4, 8, 16, 50, 100]}
        />
      </div>
      {/* End Filter */}
      {/* Start Content */}
      {overviewEWPError ? (
        <DataNotFound />
      ) : (
        data?.length && (
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3 my-4">
            {data.map((v, i) => {
              return <CardOverview key={i} data={v} callbackRef={ref} />;
            })}
          </div>
        )
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
