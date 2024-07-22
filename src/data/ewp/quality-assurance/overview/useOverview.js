import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useOverview = (params) => {
  const {
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

  const queryParams = [];

  if (project_code) queryParams.push(`project_code=${project_code}`);
  if (project_name)
    queryParams.push(`project_name=${encodeURIComponent(project_name)}`);
  if (status_approval?.kode)
    queryParams.push(`status_approval=${status_approval.kode}`);
  if (status_document?.kode)
    queryParams.push(`status_document=${status_document.kode}`);
  if (anggota_tim_audit?.pn)
    queryParams.push(`anggota_tim_audit=${anggota_tim_audit.pn}`);
  if (start_date) queryParams.push(`start_date=${start_date}`);
  if (end_date) queryParams.push(`end_date=${end_date}`);
  if (sort_by) queryParams.push(`sort=createdAt ${sort_by}`);
  if (limit) queryParams.push(`limit=${limit}`);
  if (page) queryParams.push(`page=${page}`);

  const queryString = queryParams.join("&");

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/auditor?${queryString}`;

  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    overview: data,
    overviewError: error,
    overviewMutate: mutate,
    overviewIsLoading: isLoading,
  };
};

export default useOverview;
