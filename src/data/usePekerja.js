import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function usePekerja(params, _for) {
  let query = "";
  if (_for) query = `?for=${_for}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/search/pekerja/${params}${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    pekerja: data,
    pekerjaError: error,
    pekerjaMutate: mutate,
    pekerjaIsLoading: isLoading,
  };
}
