import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useGetGuestToken(id) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_DASHBOARD}/getGuestToken/${id}`;
  const { data, error, isLoading } = useSWR(path, withTokenFetcher);
  return { guestData: data, error: error, isLoading: isLoading };
}
