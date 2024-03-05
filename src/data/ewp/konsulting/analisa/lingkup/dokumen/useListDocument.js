import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useListDocument = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpa/dokumen/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    listDocument: data,
    listDocumentError: error,
    listDocumentMutate: mutate,
    listDocumentIsLoading: isLoading,
  };
};

export default useListDocument;
