import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useCatalogEWP(year, type) {
  let parameters = `year=${year}&source=${type}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_LOCAL_CATALOG}/catalog/ewp?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    data: data,
    error: error,
    mutate: mutate,
    isLoading: isLoading,
  };
}
