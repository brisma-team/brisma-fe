import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useApprovalResponden = () => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey_responden/approval`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    approvalResponden: data,
    approvalRespondenError: error,
    approvalRespondenMutate: mutate,
    approvalRespondenIsLoading: isLoading,
  };
};

export default useApprovalResponden;
