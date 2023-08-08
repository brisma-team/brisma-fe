import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useProjectOverview = (params) => {
  let {
    pages,
    limit,
    project_name,
    status_approver,
    status_pat,
    sortBy,
    year,
  } = params;

  if (!pages) pages = 1;
  if (!limit) limit = 8;

  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/auditors?page=${pages}&limit=${limit}&project_name=${project_name}&status_approver=${status_approver}&status_pat=${status_pat}&tahun=${year}&sortBy=name ${sortBy}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    projectOverview: data,
    projectOverviewError: error,
    projectOverviewMutate: mutate,
    projectOverviewIsLoading: isLoading,
  };
};

export default useProjectOverview;
