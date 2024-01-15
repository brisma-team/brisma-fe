import React, { useEffect, useState } from "react";
import { PatOverviewLayout } from "@/layouts/pat";
import {
  Breadcrumbs,
  ButtonField,
  CustomPagination,
  PageTitle,
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
import { useRouter } from "next/router";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "PAT", path: "/pat" },
  { name: "Overview", path: "/pat/projects" },
];

const convertProgressAndPercent = (approvers, status_approver, status_pat) => {
  let progress, percent;
  switch (status_pat) {
    case "Final":
      progress = 1;
      percent = "100%";
      break;
    case "On Approver":
      progress = 0.6;
      percent = "66%";
      break;
    case "On Progress":
      progress = 0.3;
      percent = "33%";
      break;
    default:
      progress = 0;
      percent = "0%";
      break;
  }

  return { progress, percent };
};

const index = () => {
  const router = useRouter();
  const [totalData, setTotalData] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [params, setParams] = useState({
    project_name: "",
    status_approver: "",
    status_pat: "",
    year: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });
  const [filter, setFilter] = useState({
    project_name: "",
    status_approver: "",
    status_pat: "",
    year: "",
    sort_by: "ASC",
    limit: 8,
    page: 1,
  });

  const { projectOverview, projectOverviewMutate, projectOverviewError } =
    useProjectOverview(params);
  const { approvalPat } = useApprovalPat();

  useEffect(() => {
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        page: 1,
      };
    });
  }, [filter.limit]);

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
      setTotalData(projectOverview?.pagination?.totalData);
    }
  }, [projectOverview, params]);

  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };

  const handleApproval = (id) => {
    router.push(`projects/${id}/dokumen?is_approval=true`);
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
        <div className="w-36 rounded bg-atlasian-blue-light">
          <ButtonField
            handler={() => setOpenFilter(!openFilter)}
            text={openFilter ? `Tutup Filter` : `Tampilkan Filter`}
          />
        </div>
        <div className="w-40 rounded bg-atlasian-purple">
          <ButtonField
            handler={() => setShowModal(true)}
            text={"Buat Project"}
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
          <SelectSortFilter
            change={handleChangeFilter}
            options={[4, 8, 16, 32, 50, 100]}
          />
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
                  handleApproval={handleApproval}
                />
              );
            })}
          </div>
        )
      )}
      <CustomPagination
        perPage={filter.limit}
        handleSetPagination={(start, end, pageNow) =>
          handleChangeFilter("page", pageNow)
        }
        defaultCurrentPage={filter.page}
        totalData={totalData}
      />
      {/* End Content */}
      <ModalCreateProjectPAT
        showModal={showModal}
        setShowModal={setShowModal}
        mutate={projectOverviewMutate}
      />
    </PatOverviewLayout>
  );
};

export default index;
