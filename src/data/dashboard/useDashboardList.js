import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useDashboardList(dashboardType, currentPage, limit) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_DASHBOARD}/admin/getDashboardList?type=${dashboardType}&page=${currentPage}&limit=${limit}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);
  return {
    dashboardList: data,
    dashboardListError: error,
    dashboardListMutate: mutate,
    dashboardListIsLoading: isLoading,
  };
}
