import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useRPMModuleById(id, moduleType, noEvaluasi) {
  let parameters = `id=${id}&moduleType=${moduleType}&noEvaluasi=${noEvaluasi}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/rpm/module/detail?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    moduleDetail: data,
    moduleDetailError: error,
    moduleDetailMutate: mutate,
    moduleDetailIsLoading: isLoading,
  };
}
