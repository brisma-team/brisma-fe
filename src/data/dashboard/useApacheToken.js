import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useApacheToken() {
  const path = `${process.env.NEXT_PUBLIC_API_URL_DASHBOARD}/admin/getAccessToken`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    apacheToken: data,
    apacheTokenError: error,
    apacheTokenMutate: mutate,
    apacheTokenIsLoading: isLoading,
  };
}
