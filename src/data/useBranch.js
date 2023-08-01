import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useBranch(keyword) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/search/branch/${keyword}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    branch: data,
    branchError: error,
    branchMutate: mutate,
    branchIsLoading: isLoading,
  };
}
