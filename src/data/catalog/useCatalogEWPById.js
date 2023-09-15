import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useCatalogEWPById(year, type, id) {
  let parameters = `year=${year}&type=${type}&id=${id}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp/detail/${id}?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    data: data,
    error: error,
    mutate: mutate,
    isLoading: isLoading,
  };
}
