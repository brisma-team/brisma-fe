import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDocumentType = () => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/wrapup/part/list`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    documentType: data,
    documentTypeError: error,
    documentTypeMutate: mutate,
    documentTypeIsLoading: isLoading,
  };
};

export default useDocumentType;
