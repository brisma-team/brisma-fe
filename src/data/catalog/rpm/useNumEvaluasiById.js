import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useNumEvaluasById(id) {
  const path = `${
    process.env.NEXT_PUBLIC_API_URL_CATALOG
  }/catalog/rpm/num-evaluasi/detail?id=${id}&source=${2}`;
  const { data, error, mutate, isLoading } = useSWR(
    id !== null ? path : null,
    withTokenFetcher
  );

  return {
    numEvaluasiDetail: data,
    numEvaluasiDetailError: error,
    numEvaluasiDetailMutate: mutate,
    numEvaluasiDetailIsLoading: isLoading,
  };
}
