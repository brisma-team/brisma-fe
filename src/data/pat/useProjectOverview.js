import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useProjectOverview = (params) => {
  let {
    project_name,
    status_approver,
    status_pat,
    year,
    sort_by,
    page,
    limit,
  } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/auditors?page=${page}&limit=${limit}&project_name=${project_name}&status_approver=${status_approver}&status_pat=${status_pat}&tahun=${year}&sortBy=name ${sort_by}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    projectOverview: data,
    projectOverviewError: error,
    projectOverviewMutate: mutate,
    projectOverviewIsLoading: isLoading,
  };
};

export default useProjectOverview;
