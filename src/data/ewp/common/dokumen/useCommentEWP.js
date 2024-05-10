import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useCommentEWP = (params) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${params?.module}/${params?.sub_module}/comment/${params?.id}?ref_bab_mapa_id=${params?.bab}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    commentEWP: data,
    commentEWPError: error,
    commentEWPMutate: mutate,
    commentEWPIsLoading: isLoading,
  };
};

export default useCommentEWP;
