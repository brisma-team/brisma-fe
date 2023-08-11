import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useDashboardID() {
  const path = `${process.env.NEXT_PUBLIC_API_URL_DASHBOARD}/dashboard/id`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    dashboardID: data,
    dashboardIDError: error,
    dashboardIDMutate: mutate,
    dashboardIDIsLoading: isLoading,
  };
}
