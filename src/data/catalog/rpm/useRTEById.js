import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useRTEById(id, offset) {
  let parameters = `kkptid=${id}&offset=${offset}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/rpm/rte/detail?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(
    id !== null ? path : null,
    withTokenFetcher
  );

  return {
    rteDetail: data,
    rteDetailError: error,
    rteDetailMutate: mutate,
    rteDetailIsLoading: isLoading,
  };
}
