import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useMatrixDocument = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/matrix/doc/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    matrixDocument: data,
    matrixDocumentError: error,
    matrixDocumentMutate: mutate,
    matrixDocumentIsLoading: isLoading,
  };
};

export default useMatrixDocument;
