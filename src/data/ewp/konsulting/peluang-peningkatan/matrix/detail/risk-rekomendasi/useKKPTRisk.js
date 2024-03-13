import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useKKPTRisk = (params) => {
  const { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/kkpt_risk/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    riskData: data,
    riskError: error,
    riskMutate: mutate,
    risIsLoading: isLoading,
  };
};

export default useKKPTRisk;
