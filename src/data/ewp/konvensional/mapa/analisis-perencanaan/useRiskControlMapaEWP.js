import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useRiskControlMapaEWP = (params) => {
  const { risk_issue_id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${risk_issue_id}/risk_control`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    riskControlMapaEWP: data,
    riskControlMapaEWPError: error,
    riskControlMapaEWPMutate: mutate,
    riskControlMapaEWPIsLoading: isLoading,
  };
};

export default useRiskControlMapaEWP;
