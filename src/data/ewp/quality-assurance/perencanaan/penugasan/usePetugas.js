import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const usePetugas = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/mapa/penugasan/petugas/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    petugas: data,
    petugasError: error,
    petugasMutate: mutate,
    petugasIsLoading: isLoading,
  };
};

export default usePetugas;
