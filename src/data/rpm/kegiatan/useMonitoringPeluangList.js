import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useMonitoringPeluangList = (parameters) => {
  const { id, params } = parameters;
  let withParameters = `?page=${params?.page}&limit=${params?.limit}&sort=createdAt ${params?.sort_by}`;
  if (params) {
    if (params?.nama_kkpt != "") {
      withParameters += `&nama_kkpt=${encodeURIComponent(params?.nama_kkpt)}`;
    }
    if (params?.auditor?.pn != "" && params?.auditor?.pn != undefined) {
      withParameters += `&pn_auditor=${params?.auditor?.pn}`;
    }
    if (
      params?.control_kode?.kode != "" &&
      params?.control_kode?.kode != undefined
    ) {
      withParameters += `&control_kode=${params?.control_kode?.kode}`;
    }
    if (params?.risk_kode?.kode != "" && params?.risk_kode?.kode != undefined) {
      withParameters += `&risk_kode=${params?.risk_kode?.kode}`;
    }
    if (params?.judul_lingkup != "") {
      withParameters += `&judul_lingkup=${encodeURIComponent(
        params?.judul_lingkup
      )}`;
    }
  }
  const path = `${
    process.env.NEXT_PUBLIC_API_URL_RPM
  }/rpm/sbp/projects/peluang/list/${id || 0}${withParameters}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);
  return {
    monitoringPeluangList: data,
    monitoringPeluangListError: error,
    monitoringPeluangListMutate: mutate,
    monitoringPeluangListIsLoading: isLoading,
  };
};

export default useMonitoringPeluangList;
