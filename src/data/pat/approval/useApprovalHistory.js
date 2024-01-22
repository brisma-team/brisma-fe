import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useApprovalHistory() {
  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/approval/history?page=1&limit=1000`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    approvalHistory: data,
    approvalHistoryError: error,
    approvalHistoryMutate: mutate,
    approvalHistoryIsLoading: isLoading,
  };
}
