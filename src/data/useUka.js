import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useUka(param = "", type = "") {
  let path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/uka`;
  if (param && type === "search") {
    path += `/search?${param}`;
  } else if (param && type === "pagination") {
    path += `/all?limit=${param?.limit}&offset=${param?.offset}`;
  } else {
    path += `/all`;
  }
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    uka: data,
    ukaError: error,
    ukaMutate: mutate,
    ukaIsLoading: isLoading,
  };
}
