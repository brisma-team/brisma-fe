import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useApprovalHistory(pages, limit) {
  const path = `${
    process.env.NEXT_PUBLIC_API_URL_PAT
  }/pat/approval/history?page=${pages}&limit=${limit ? limit : 5}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    approvalHistory: data,
    approvalHistoryError: error,
    approvalHistoryMutate: mutate,
    approvalHistoryIsLoading: isLoading,
  };
}
