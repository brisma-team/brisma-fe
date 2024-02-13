import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useRelatedEWP = (keyword) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/list?keyword=${keyword}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    relatedEWP: data,
    relatedEWPError: error,
    relatedEWPMutate: mutate,
    relatedEWPIsLoading: isLoading,
  };
};

export default useRelatedEWP;
