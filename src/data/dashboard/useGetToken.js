import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useGetToken(interval) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_DASHBOARD}/getDashboardList`;
  const { data, error, isLoading } = useSWR(path, withTokenFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: interval || 60000, // 1 menit
  });
  return { data: data, error: error, isLoading: isLoading };
}
