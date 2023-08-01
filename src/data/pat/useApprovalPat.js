import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useApprovalPat = () => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/approval`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    approvalPat: data,
    approvalPatError: error,
    approvalPatMutate: mutate,
    approvalPatIsLoading: isLoading,
  };
};

export default useApprovalPat;
