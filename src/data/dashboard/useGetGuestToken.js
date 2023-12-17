import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useGetGuestToken(id, interval) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_DASHBOARD}/getGuestToken/${id}`;
  const { data, error, isLoading } = useSWR(path, withTokenFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: interval || 60000, // 1 menit
  });
  return { guestData: data, error: error, isLoading: isLoading };
}
