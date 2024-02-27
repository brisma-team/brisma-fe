import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDocumentEWP = (sub_modul, bab_id, { id }) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/${sub_modul}/dokumen/${id}?bab=${bab_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    documentEWP: data,
    documentEWPError: error,
    documentEWPMutate: mutate,
    documentEWPIsLoading: isLoading,
  };
};

export default useDocumentEWP;
