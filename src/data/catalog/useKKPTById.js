import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useKKPTById(year, type, id) {
  let parameters = `year=${year}&source=${type}&id=${id}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp/kkpt/detail?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(
    id !== null ? path : null,
    withTokenFetcher
  );

  return {
    kkptDetail: data,
    kkptDetailError: error,
    kkptDetailMutate: mutate,
    kkptDetailIsLoading: isLoading,
  };
}
