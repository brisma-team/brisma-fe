import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDocument = (id, bab_id) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/dokumen/${id}?bab=${bab_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    documentData: data,
    documentDataError: error,
    documentDataMutate: mutate,
    documentDataIsLoading: isLoading,
  };
};

export default useDocument;
