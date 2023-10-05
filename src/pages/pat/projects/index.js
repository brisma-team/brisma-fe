import React, { useEffect, useState } from "react";
import { PatOverviewLayout } from "@/layouts/pat";
import Button from "@atlaskit/button";
import { IconPlus } from "@/components/icons";
import {
  Breadcrumbs,
  ButtonField,
  PageTitle,
  Pagination,
} from "@/components/atoms";
import {
  CardFilterProjectOverview,
  ModalCreateProjectPAT,
} from "@/components/molecules/pat/overview";
import useProjectOverview from "@/data/pat/useProjectOverview";
import { CardOverview } from "@/components/molecules/pat/overview";
import { DataNotFound, SelectSortFilter } from "@/components/molecules/commons";
import _ from "lodash";
import useApprovalPat from "@/data/pat/useApprovalPat";
import { decimalToPercentage } from "@/helpers";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "PAT", path: "/pat" },
  { name: "Overview", path: "/pat/projects" },
];

const convertProgressAndPercent = (approvers, status_approver, status_pat) => {
  let progress, percent;
  const findIndex = approvers?.findIndex((v) => v.pn === status_approver?.pn);
  if (status_pat === "Final") {
    progress = 1;
    percent = "100%";
  } else if (status_approver && find) {
    const sum = (findIndex + 1) / approvers.length;
    progress = sum;
    percent = decimalToPercentage(sum);
  } else if (!status_approver) {
    progress = 0;
    percent = "0%";
  }
  return { progress, percent };
};

const index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [params, setParams] = useState({
    project_name: "",
    status_approver: "",
    status_pat: "",
    sortBy: "",
    year: "",
  });
  const [filter, setFilter] = useState({
    project_name: "",
    status_approver: "",
    status_pat: "",
    sortBy: "",
    year: "",
  });

  const { projectOverview, projectOverviewMutate, projectOverviewError } =
    useProjectOverview({
      ...params,
      pages: currentPage,
      limit: 8,
    });
  const { approvalPat } = useApprovalPat();

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
      projectOverviewMutate;
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  useEffect(() => {
    if (projectOverview) {
      const mapping = projectOverview.data.map((v) => {
        return {
          id: v.id,
          title: v.pat_name,
          year: v.tahun,
          progress: convertProgressAndPercent(
            v?.approvers,
            v?.status_approver,
            v?.status_pat
          ).progress,
          percent: convertProgressAndPercent(
            v?.approvers,
            v?.status_approver,
            v?.status_pat
          ).percent,
          documentStatus: v?.status_pat,
          apporovalStatus: v?.status_approver
            ? `On ${v?.status_approver?.pn}`
            : `-`,
          addendum: v?.riwayat_adendum.toString(),
          href: `/pat/projects/${v.id}`,
        };
      });
      setData(mapping);
      setTotalPages(projectOverview?.page?.totalPage);
    }
  }, [projectOverview, params]);

  const handleChangeSortBy = (e) => {
    setFilter({ ...filter, sortBy: e.value });
  };

  return (
    <PatOverviewLayout data={approvalPat?.data?.header}>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle text={"Project Overview"} />
      </div>
      {/* Start Filter */}
      <div className="flex gap-3 items-center">
        <div className="my-3 w-40">
          <Button
            appearance="primary"
            iconBefore={<IconPlus />}
            onClick={() => setOpenFilter(!openFilter)}
            shouldFitContainer
          >
            Tampilkan Filter
          </Button>
        </div>
        <div className="w-40 rounded bg-atlasian-purple">
          <ButtonField
            handler={() => setShowModal(true)}
            text={"Buat Project"}
          />
          <ModalCreateProjectPAT
            showModal={showModal}
            setShowModal={setShowModal}
            mutate={projectOverviewMutate}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <CardFilterProjectOverview
          openFilter={openFilter}
          filter={filter}
          setFilter={setFilter}
        />
        <div className="w-full flex justify-end items-end p-2">
          <SelectSortFilter change={handleChangeSortBy} />
        </div>
      </div>
      {/* End Filter */}
      {/* Start Content */}
      {projectOverviewError ? (
        <DataNotFound />
      ) : (
        data?.length && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-4 overflow-hidden -ml-2">
            {data.map((v, i) => {
              return (
                <CardOverview
                  key={i}
                  id={v.id}
                  title={v.title}
                  year={v.year}
                  progress={v.progress}
                  percent={v.percent}
                  documentStatus={v.documentStatus}
                  apporovalStatus={v.apporovalStatus}
                  addendum={v.addendum}
                  href={v.href}
                />
              );
            })}
          </div>
        )
      )}
      <Pagination pages={totalPages} setCurrentPage={setCurrentPage} />
      {/* End Content */}
    </PatOverviewLayout>
  );
};

export default index;
