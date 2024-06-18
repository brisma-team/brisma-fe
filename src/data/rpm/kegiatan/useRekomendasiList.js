import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useRekomendasiList = (parameters) => {
  const { rpm_id, kkpt_id, params } = parameters;
  let withParameters = `?kkpt_id=${kkpt_id || ""}&project_rpm_id=${
    rpm_id | ""
  }&page=${params?.page}&limit=${params?.limit}&sort=createdAt ${
    params?.sort_by
  }`;
  if (params) {
    if (params?.judul_lingkup != "") {
      withParameters += `&judul_lingkup=${encodeURIComponent(
        params?.judul_lingkup
      )}`;
    }
    if (params?.desc != "") {
      withParameters += `&desc=${encodeURIComponent(params?.desc)}`;
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
    if (params?.status_complete != "" && params?.status_complete != undefined) {
      withParameters += `&status_complete=${params?.status_complete}`;
    }
    if (
      params?.batas_waktu_start != "" &&
      params?.batas_waktu_start != undefined &&
      params?.batas_waktu_end != undefined &&
      params?.batas_waktu_end != ""
    ) {
      withParameters += `&batas_waktu_start=${params?.batas_waktu_start}&batas_waktu_end=${params?.batas_waktu_end}`;
    }
  }

  const path =
    `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/sbp/rekomendasi` +
    withParameters;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    rekomendasiList: data,
    rekomendasiListError: error,
    rekomendasiListMutate: mutate,
    rekomendasiListIsLoading: isLoading,
  };
};

export default useRekomendasiList;
