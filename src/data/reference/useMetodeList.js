import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useMetodeList() {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_metode/list`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    metode: data,
    metodeError: error,
    metodeMutate: mutate,
    metodeIsLoading: isLoading,
  };
}
