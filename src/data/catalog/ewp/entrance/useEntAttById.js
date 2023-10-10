import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useEntAttById(year, type, id) {
  let parameters = `year=${year}&source=${type}&id=${id}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp/entrance-attendance/detail?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    entAttDetail: data,
    entAttDetailError: error,
    entAttDetailMutate: mutate,
    entAttDetailIsLoading: isLoading,
  };
}
