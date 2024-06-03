import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useBeritaAcara = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/meeting/ba/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    beritaAcara: data,
    beritaAcaraError: error,
    beritaAcaraMutate: mutate,
    beritaAcaraIsLoading: isLoading,
  };
};

export default useBeritaAcara;
