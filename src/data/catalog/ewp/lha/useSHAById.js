import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useSHAById(year, type, id) {
  let parameters = `year=${year}&source=${type}&id=${id}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp/sha/detail?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    shaDetail: data,
    shaDetailError: error,
    shaDetailMutate: mutate,
    shaDetailIsLoading: isLoading,
  };
}
