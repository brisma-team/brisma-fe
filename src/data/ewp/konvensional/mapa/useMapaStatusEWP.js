import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useMapaStatusEWP = ({ id }) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/status/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    mapaStatusEWP: data,
    mapaStatusEWPError: error,
    mapaStatusEWPMutate: mutate,
    mapaStatusEWPIsLoading: isLoading,
  };
};

export default useMapaStatusEWP;
