import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useCatalogRPM(
  year = 2023,
  type,
  pageNum = 1,
  pageLimit = 5,
  name
) {
  let parameters = `year=${year}&source=${1}&pageNum=${pageNum}&pageLimit=${pageLimit}&name=${name}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/rpm?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    data: data,
    error: error,
    mutate: mutate,
    isLoading: isLoading,
  };
}
