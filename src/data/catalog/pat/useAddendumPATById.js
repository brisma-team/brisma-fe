import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useAddendumPATById(id) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/pat/addendum-pat/detail/${id}`;
  const { data, error, mutate, isLoading } = useSWR(
    id !== null ? path : null,
    withTokenFetcher
  );

  return {
    addendumPATData: data,
    addendumPATDataError: error,
    addendumPATDataMutate: mutate,
    addendumPATDataIsLoading: isLoading,
  };
}
