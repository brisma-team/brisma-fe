import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useCatalogRPM() {
  let parameters = `pageNum=${1}&pageLimit=${5}&source=${2}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/rpm?${parameters}`;
  console.log(path);
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    data: data,
    error: error,
    mutate: mutate,
    isLoading: isLoading,
  };
}
