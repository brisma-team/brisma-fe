import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDocumentEWP = (params) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${params?.module}/${params?.sub_module}/dokumen/${params?.id}?bab=${params?.bab}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    documentEWP: data,
    documentEWPError: error,
    documentEWPMutate: mutate,
    documentEWPIsLoading: isLoading,
  };
};

export default useDocumentEWP;
