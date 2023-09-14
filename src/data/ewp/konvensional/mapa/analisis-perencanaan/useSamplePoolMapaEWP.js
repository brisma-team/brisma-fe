import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useSamplePoolMapaEWP = (type, params) => {
  const { id, mapa_uker_mcr_id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/${mapa_uker_mcr_id}/${type}/pool`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    samplePoolMapaEWP: data,
    samplePoolMapaEWPError: error,
    samplePoolMapaEWPMutate: mutate,
    samplePoolMapaEWPIsLoading: isLoading,
  };
};

export default useSamplePoolMapaEWP;
