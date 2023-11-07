import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDetailBudgetMapaEWP = (params) => {
  const { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/anggaran/detail/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    detailBudgetMapaEWP: data,
    detailBudgetMapaEWPError: error,
    detailBudgetMapaEWPMutate: mutate,
    detailBudgetMapaEWPIsLoading: isLoading,
  };
};

export default useDetailBudgetMapaEWP;
