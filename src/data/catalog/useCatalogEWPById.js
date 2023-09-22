import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useCatalogEWPById(year, type, id) {
  let parameters = `year=${year}&source=${type}&id=${id}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp/detail?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    ewpDetailData: data,
    ewpDetailError: error,
    ewpDetailMutate: mutate,
    ewpDetailIsLoading: isLoading,
  };
}
