import React, { useEffect, useState } from "react";
import { PatOverviewLayout } from "@/layouts/pat";
import Button from "@atlaskit/button";
import { IconPlus } from "@/components/icons";
import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { CardFilterProjectOverview } from "@/components/molecules/pat/overview";
import useProjectOverview from "@/data/pat/useProjectOverview";
import { CardOverview } from "@/components/molecules/pat/overview";
import { SelectSortFilter } from "@/components/molecules/commons";
import { useSelector, useDispatch } from "react-redux";
import { setSearchParam } from "@/slices/pat/projectOverviewSlice";
import _ from "lodash";
import useApprovalPat from "@/data/pat/useApprovalPat";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "PAT", path: "/pat" },
  { name: "Overview", path: "/pat/projects" },
];

const convertProgressAndPercent = (value) => {
  let progress, percent;
  switch (value) {
    case "On Progress":
      progress = 0.33;
      percent = "33%";
      break;
    case "On Approval":
      progress = 0.66;
      percent = "66%";
      break;
    case "Final":
      progress = 1;
      percent = "100%";
      break;
  }
  return { progress, percent };
};

const index = () => {
  const dispatch = useDispatch();
  const projectOverviewState = useSelector(
    (state) => state.projectOverview.searchParam
  );

  const [openFilter, setOpenFilter] = useState(false);
  const [params, setParams] = useState("");

  const { projectOverview, projectOverviewMutate } = useProjectOverview(params);
  const { approvalPat } = useApprovalPat();

  useEffect(() => {
    projectOverviewMutate;
  }, [params]);

  useEffect(() => {
    const handleSearch = () => {
      setParams(projectOverviewState);
    };
    const debouncedSearch = _.debounce(handleSearch, 2000);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [projectOverviewState]);

  const [data, setData] = useState(null);

  const handleChangeSortBy = (e) => {
    dispatch(setSearchParam({ ...projectOverviewState, sortBy: e.value }));
  };

  useEffect(() => {
    if (projectOverview) {
      const mapping = projectOverview.data.map((v) => {
        return {
          id: v.id,
          title: v.pat_name,
          year: v.tahun,
          progress: convertProgressAndPercent(v.status_pat).progress,
          percent: convertProgressAndPercent(v.status_pat).percent,
          documentStatus: "FINAL",
          apporovalStatus: "Checker Pusat",
          addendum: v.addendum,
          href: `/pat/projects/${v.id}`,
        };
      });
      setData(mapping);
    }
  }, [projectOverview, projectOverviewState]);

  return (
    <PatOverviewLayout data={approvalPat?.data?.header}>
      <div className="pr-40">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Project Overview"} />
        </div>
        {/* Start Filter */}
        <div className="my-3 w-40">
          <Button
            appearance="primary"
            iconBefore={IconPlus}
            onClick={() => setOpenFilter(!openFilter)}
            shouldFitContainer
          >
            Tampilkan Filter
          </Button>
        </div>
        <div className="flex justify-between">
          <CardFilterProjectOverview openFilter={openFilter} />
          <div className="w-full flex justify-end items-end p-2">
            <SelectSortFilter
              optionValue={[
                { label: "Awal", value: "asc" },
                { label: "Akhir", value: "desc" },
              ]}
              change={handleChangeSortBy}
            />
          </div>
        </div>
        {/* End Filter */}
        {/* Start Content */}
        <div className="flex flex-wrap my-4 overflow-hidden -ml-2">
          {data?.length &&
            data.map((v, i) => {
              return (
                <CardOverview
                  key={i}
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
        {/* End Content */}
      </div>
    </PatOverviewLayout>
  );
};

export default index;
