import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useDashboardList() {
  const path = `${process.env.NEXT_PUBLIC_API_URL_DASHBOARD}/admin/getDashboardList?page=1&limit=5`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);
  return {
    dashboardList: data,
    dashboardListError: error,
    dashboardListMutate: mutate,
    dashboardListIsLoading: isLoading,
  };
}
