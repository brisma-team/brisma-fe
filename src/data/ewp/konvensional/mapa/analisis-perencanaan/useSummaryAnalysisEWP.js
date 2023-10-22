import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useSummaryAnalysisEWP = (params) => {
  const {
    id,
    uker_name,
    uker_kode,
    aktivitas,
    sub_aktivitas,
    sub_major,
    risk,
    tipe_uker,
  } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/summary?uker_name=${uker_name}&aktivitas=${aktivitas}&sub_aktivitas=${sub_aktivitas}&uker_kode=${uker_kode}&sub_major=${sub_major}&risk=${risk}&tipe_uker=${tipe_uker}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    summaryAnalysisEWP: data,
    summaryAnalysisEWPError: error,
    summaryAnalysisEWPMutate: mutate,
    summaryAnalysisEWPIsLoading: isLoading,
  };
};

export default useSummaryAnalysisEWP;
