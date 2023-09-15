import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useCatalogEWPKKPTById(id) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp/kkpt/detail/${id}?id=${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    data: data,
    error: error,
    mutate: mutate,
    isLoading: isLoading,
  };
}
