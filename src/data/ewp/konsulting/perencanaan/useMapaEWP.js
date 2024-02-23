import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useMapaEWP = (type, params) => {
  const {
    id,
    sub_aktivitas_kode,
    sub_aktivitas_name,
    sub_major_kode,
    sub_major_name,
    risk_issue_name,
    risk_issue_kode,
    mcr_id,
    risk_assigned,
  } = params;

  let query = "";
  switch (type) {
    case "penugasan":
      query = `?sub_aktivitas_kode=${sub_aktivitas_kode}&sub_aktivitas_name=${sub_aktivitas_name}&sub_major_kode=${sub_major_kode}&sub_major_name=${sub_major_name}&risk_issue_name=${risk_issue_name}&risk_issue_kode=${risk_issue_kode}&mcr_id=${mcr_id}&risk_assigned=${risk_assigned}`;
      break;
  }

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/${type}/${id}${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    mapaEWP: data,
    mapaEWPError: error,
    mapaEWPMutate: mutate,
    mapaEWPIsLoading: isLoading,
  };
};

export default useMapaEWP;
