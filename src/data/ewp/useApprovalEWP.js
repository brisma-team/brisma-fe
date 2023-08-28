import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useApprovalEWP = (type) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${type}/approval`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    approvalEWP: data,
    approvalEWPError: error,
    approvalEWPMutate: mutate,
    approvalEWPIsLoading: isLoading,
  };
};

export default useApprovalEWP;
