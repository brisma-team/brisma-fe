import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const usePlanningAnalysisEWP = (type, params) => {
  const {
    id,
    uker_id,
    aktivitas_id,
    aktivitas_kode,
    sub_aktivitas_kode,
    risk_id,
  } = params;

  let query = "";
  switch (type) {
    case "sub_aktivitas":
      query = `${id}/sub_aktivitas?uker_id=${uker_id}&aktivitas_id=${aktivitas_id}&aktivitas_kode=${aktivitas_kode}`;
      break;
    case "risk_issue_list":
      query = `${id}/risk?sub_kode=${sub_aktivitas_kode}&uker_id=${uker_id}`;
      break;
    case "risk_issue_detail":
      query = `risk/${risk_id}`;
  }
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    planningAnalysisEWP: data,
    planningAnalysisEWPError: error,
    planningAnalysisEWPMutate: mutate,
    planningAnalysisEWPIsLoading: isLoading,
  };
};

export default usePlanningAnalysisEWP;
