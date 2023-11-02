import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useHistoryCommentMapaEWP = (params) => {
  const { id, sub_aktivitas_id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/sub_aktivitas/comment?sub_aktivitas_id=${sub_aktivitas_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    historyCommentMapaEWP: data,
    historyCommentMapaEWPError: error,
    historyCommentMapaEWPMutate: mutate,
    historyCommentMapaEWPIsLoading: isLoading,
  };
};

export default useHistoryCommentMapaEWP;
