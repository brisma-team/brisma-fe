import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useHistorySamplePoolMapaEWP = (params) => {
  const { id, risk_issue_id, sample_pool_id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/${risk_issue_id}/sample_csv/show_bulk?pool_sample_id=${sample_pool_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    historySamplePoolMapaEWP: data,
    historySamplePoolMapaEWPError: error,
    historySamplePoolMapaEWPMutate: mutate,
    historySamplePoolMapaEWPIsLoading: isLoading,
  };
};

export default useHistorySamplePoolMapaEWP;
