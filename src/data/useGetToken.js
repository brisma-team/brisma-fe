import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useGetToken() {
  const path = "http://192.168.100.110:4444/getGuestToken";
  const { data, error, isLoading } = useSWR(path, withTokenFetcher);
  return { data: data, error: error, isLoading: isLoading };
}
