import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useModuleById(year, type, id, moduleType) {
  let parameters = `year=${year}&source=${type}&id=${id}&moduleType=${moduleType}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp/module/detail?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    moduleDetail: data,
    moduleDetailError: error,
    moduleDetailMutate: mutate,
    moduleDetailIsLoading: isLoading,
  };
}
