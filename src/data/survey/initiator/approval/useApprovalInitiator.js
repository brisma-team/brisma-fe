import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useApprovalInitiator = () => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/approval`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    approvalInitiator: data,
    approvalInitiatorError: error,
    approvalInitiatorMutate: mutate,
    approvalInitiatorIsLoading: isLoading,
  };
};

export default useApprovalInitiator;
