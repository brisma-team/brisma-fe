import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useUkaDetail(kode) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/uka/detail/${kode}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    ukaDetail: data,
    ukaDetailError: error,
    ukaDetailMutate: mutate,
    ukaDetailIsLoading: isLoading,
  };
}
