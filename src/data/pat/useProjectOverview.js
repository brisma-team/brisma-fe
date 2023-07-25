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

  let query = "";
  if (!pages) pages = 1;
  if (!limit) limit = 8;
  if (project_name) query += `&project_name=${project_name}`;
  if (status_approver) query += `&status_approver=${status_approver}`;
  if (status_pat) query += `&status_pat=${status_pat}`;
  if (year) query += `&tahun=${year}`;
  if (sortBy) query += `&sortBy=name ${sortBy}`;

  console.log("QUERY => ", query);

  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/auditors?page=${pages}&limit=${limit}${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    projectOverview: data,
    projectOverviewError: error,
    projectOverviewMutate: mutate,
    projectOverviewIsLoading: isLoading,
  };
};

export default useProjectOverview;
