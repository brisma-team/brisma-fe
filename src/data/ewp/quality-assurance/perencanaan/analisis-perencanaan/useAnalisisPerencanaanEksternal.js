import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAnalisisPerencanaanEksternal = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/mapa/analisis_perencanaan/${id}?is_eksternal=true`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    analisisPerencanaanEksternal: data,
    analisisPerencanaanEksternalError: error,
    analisisPerencanaanEksternalMutate: mutate,
    analisisPerencanaanEksternalIsLoading: isLoading,
  };
};

export default useAnalisisPerencanaanEksternal;
