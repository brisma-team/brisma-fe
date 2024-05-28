import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

const useTimOverview = (params) => {
  const { id, module } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/${module}/projects/tim/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    timOverview: data,
    timOverviewError: error,
    timOverviewMutate: mutate,
    timOverviewIsLoading: isLoading,
  };
};

export default useTimOverview;
