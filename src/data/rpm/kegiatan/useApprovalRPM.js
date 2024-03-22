import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useApprovalRPM = () => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/sbp/projects/approval`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    approvalRPM: data,
    approvalRPMError: error,
    approvalRPMMutate: mutate,
    approvalRPMIsLoading: isLoading,
  };
};

export default useApprovalRPM;
