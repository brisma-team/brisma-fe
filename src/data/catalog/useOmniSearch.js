import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useOmniSearch(type, year = 2023, words = "--") {
  const parameters = `?type=${type}&year=${year}&words=${words}`;
  const path =
    `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/omni-search/find` +
    parameters;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    omni: data,
    omniError: error,
    omniMutate: mutate,
    omniIsLoading: isLoading,
  };
}
