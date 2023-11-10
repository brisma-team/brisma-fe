import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useCommentMapaEWP = ({ id, bab }) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/comment/${id}?ref_bab_mapa_id=${bab}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    commentMapaEWP: data,
    commentMapaEWPError: error,
    commentMapaEWPMutate: mutate,
    commentMapaEWPIsLoading: isLoading,
  };
};

export default useCommentMapaEWP;
