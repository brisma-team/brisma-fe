import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useAddendumMAPAList(id) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp/addendum-mapa/${id}`;
  const { data, error, mutate, isLoading } = useSWR(
    id !== null ? path : null,
    withTokenFetcher
  );

  return {
    addendumMAPA: data,
    addendumMAPAError: error,
    addendumMAPAMutate: mutate,
    addendumMAPAIsLoading: isLoading,
  };
}
