import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useUkaType() {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/uka_type/all`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    ukaType: data,
    ukaTypeError: error,
    ukaTypeMutate: mutate,
    ukaTypeIsLoading: isLoading,
  };
}
