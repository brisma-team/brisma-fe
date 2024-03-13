import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useRiskKKPT = (id) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/list/kkpa_risk/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    riskKKPTData: data,
    riskKKPTDataError: error,
    riskKKPTDataMutate: mutate,
    riskKKPTDataIsLoading: isLoading,
  };
};

export default useRiskKKPT;
