import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useAddendumMAPAById(id) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/mapa/addendum-mapa/detail/${id}`;
  const { data, error, mutate, isLoading } = useSWR(
    id !== null ? path : null,
    withTokenFetcher
  );

  return {
    addendumMAPAData: data,
    addendumMAPADataError: error,
    addendumMAPADataMutate: mutate,
    addendumMAPADataIsLoading: isLoading,
  };
}
