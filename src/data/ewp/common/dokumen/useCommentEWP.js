import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useCommentEWP = (params) => {
  const ref_bab =
    params?.sub_module == "mapa" ? "ref_bab_mapa_id" : "ref_bab_lha_id";
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${params?.module}/${params?.sub_module}/comment/${params?.id}?${ref_bab}=${params?.bab}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    commentEWP: data,
    commentEWPError: error,
    commentEWPMutate: mutate,
    commentEWPIsLoading: isLoading,
  };
};

export default useCommentEWP;
