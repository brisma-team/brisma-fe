import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useApproval() {
  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/approval`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    approvalList: data,
    approvalListError: error,
    approvalListMutate: mutate,
    approvalListIsLoading: isLoading,
  };
}
