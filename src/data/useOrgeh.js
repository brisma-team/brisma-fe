import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useOrgeh(keyword) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/search/orgeh/${keyword}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    orgeh: data,
    orgehError: error,
    orgehMutate: mutate,
    orgehIsLoading: isLoading,
  };
}
