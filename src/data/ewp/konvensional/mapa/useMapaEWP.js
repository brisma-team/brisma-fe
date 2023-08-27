import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useMapaEWP = (type, params) => {
  const { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/${type}/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    mapaEWP: data,
    mapaEWPError: error,
    mapaEWPMutate: mutate,
    mapaEWPIsLoading: isLoading,
  };
};

export default useMapaEWP;
