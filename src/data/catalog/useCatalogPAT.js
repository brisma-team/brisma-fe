import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useCatalogPAT(year, type, page) {
  let parameters = `year=${year}&source=${1}&pageNum=${page}&pageLimit=${5}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/pat?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    data: data,
    error: error,
    mutate: mutate,
    isLoading: isLoading,
  };
}
