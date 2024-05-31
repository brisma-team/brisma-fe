import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

const useObjectOverview = (params) => {
  const { id, module } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/${module}/projects/kkpt/list/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    objectOverview: data,
    objectOverviewError: error,
    objectOverviewMutate: mutate,
    objectOverviewIsLoading: isLoading,
  };
};

export default useObjectOverview;
