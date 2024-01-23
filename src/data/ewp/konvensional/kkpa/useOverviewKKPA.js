import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useOverviewKKPA = (params) => {
  const {
    id,
    is_na,
    status,
    risk_issue_kode,
    risk_issue_name,
    sub_major_kode,
    sub_major_name,
    sub_aktivitas_kode,
    sub_aktivitas_name,
    aktivitas_kode,
    aktivitas_name,
    branch,
    orgeh,
    limit,
    page,
  } = params;

  const path = `${
    process.env.NEXT_PUBLIC_API_URL_EWP
  }/ewp/kkpa/list/${id}?is_na=${is_na}&limit=${limit}&page=${page}&status=${
    status?.kode || ""
  }&risk_issue_kode=${risk_issue_kode}&risk_issue_name=${risk_issue_name}&sub_major_kode=${sub_major_kode}&sub_major_name=${sub_major_name}&sub_aktivitas_kode=${sub_aktivitas_kode}&sub_aktivitas_name=${sub_aktivitas_name}&aktivitas_kode=${aktivitas_kode}&aktivitas_name=${aktivitas_name}branch=${branch}&orgeh=${orgeh}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    overviewKKPA: data,
    overviewKKPAError: error,
    overviewKKPAMutate: mutate,
    overviewKKPAIsLoading: isLoading,
  };
};

export default useOverviewKKPA;
