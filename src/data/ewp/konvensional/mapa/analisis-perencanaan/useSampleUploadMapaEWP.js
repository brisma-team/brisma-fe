import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useSampleUploadMapaEWP = (params) => {
  const { id, mapa_uker_mcr_id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/${mapa_uker_mcr_id}/sample_file/upload`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    sampleUploadMapaEWP: data,
    sampleUploadMapaEWPError: error,
    sampleUploadMapaEWPMutate: mutate,
    sampleUploadMapaEWPIsLoading: isLoading,
  };
};

export default useSampleUploadMapaEWP;
