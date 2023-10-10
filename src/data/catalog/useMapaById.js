import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useMapaById(year, type, id) {
  let parameters = `year=${year}&source=${type}&id=${id}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp/mapa/detail?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    mapaDetail: data,
    mapaDetailError: error,
    mapaDetailMutate: mutate,
    mapaDetailIsLoading: isLoading,
  };
}
