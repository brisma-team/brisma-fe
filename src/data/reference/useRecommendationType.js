import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useRecommendationType() {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_tipe_rekomendasi/all`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    recommendationType: data,
    recommendationTypeError: error,
    recommendationTypeMutate: mutate,
    recommendationTypeIsLoading: isLoading,
  };
}
