import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDocument = (type, params) => {
  let { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/document/${type}?pat_id=${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    documentPAT: data,
    documentPATError: error,
    documentPATMutate: mutate,
    documentPATIsLoading: isLoading,
  };
};

export default useDocument;
