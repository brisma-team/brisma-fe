import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useAddendumPATList(id) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/pat/addendum-pat/${id}`;
  const { data, error, mutate, isLoading } = useSWR(
    id !== null ? path : null,
    withTokenFetcher
  );

  return {
    addendumPAT: data,
    addendumPATError: error,
    addendumPATMutate: mutate,
    addendumPATIsLoading: isLoading,
  };
}
