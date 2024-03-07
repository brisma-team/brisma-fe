import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useBulkDownloadDocument = (params) => {
  const { ref_document_id, id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/wrapup/all/${id}?ref_document_id=${ref_document_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    bulkDownloadDocument: data,
    bulkDownloadDocumentError: error,
    bulkDownloadDocumentMutate: mutate,
    bulkDownloadDocumentIsLoading: isLoading,
  };
};

export default useBulkDownloadDocument;
