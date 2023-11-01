import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useOverviewPAT(id) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/pat/detail/${id}`;
  const { data, error, mutate, isLoading } = useSWR(
    id !== null ? path : null,
    withTokenFetcher
  );

  return {
    overviewDetail: data,
    overviewDetailError: error,
    overviewDetailMutate: mutate,
    overviewDetailIsLoading: isLoading,
  };
}
