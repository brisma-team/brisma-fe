import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useUkaList() {
  const path = `${process.env.NEXT_PUBLIC_API_URL_DASHBOARD}/admin/getUkaList`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);
  return {
    uka: data,
    ukaError: error,
    ukaMutate: mutate,
    ukaIsLoading: isLoading,
  };
}
