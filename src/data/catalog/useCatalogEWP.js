import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useCatalogEWP(year, type, page) {
  let parameters = `year=${year}&source=${type}&page=${page}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    ewpData: data,
    ewpDataError: error,
    ewpDataMutate: mutate,
    ewpDataIsLoading: isLoading,
  };
}
