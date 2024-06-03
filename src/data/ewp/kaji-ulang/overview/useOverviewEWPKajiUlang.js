import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useOverviewEWPKajiUlang = (params) => {
  let {
    project_code,
    project_name,
    status_approval,
    status_document,
    anggota_tim_audit,
    start_date,
    end_date,
    sort_by,
    limit,
    page,
  } = params;

  const path = `${
    process.env.NEXT_PUBLIC_API_URL_EWP
  }/ewp/kaji-ulang/auditor?page=${page}&limit=${limit}&sort_by=createdAt ${sort_by}&project_code=${project_code}&project_name=${project_name}&status_approval=${
    status_approval?.kode || ""
  }&status_document=${status_document?.kode || ""}&anggota_tim_audit=${
    anggota_tim_audit?.pn || ""
  }&start_date=${start_date}&end_date=${end_date}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    overviewEWPKajiUlang: data,
    overviewEWPKajiUlangError: error,
    overviewEWPKajiUlangMutate: mutate,
    overviewEWPKajiUlangIsLoading: isLoading,
  };
};

export default useOverviewEWPKajiUlang;
