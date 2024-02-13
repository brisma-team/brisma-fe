import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useOverviewEWPKonsulting = (params) => {
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

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/auditor?page=${page}&limit=${limit}&sort_by=createdAt ${sort_by}&project_code=${project_code}&project_name=${project_name}&status_approval=${status_approval}&status_document=${status_document}&anggota_tim_audit=${anggota_tim_audit}&start_date=${start_date}&end_date=${end_date}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    overviewEWPKonsulting: data,
    overviewEWPKonsultingError: error,
    overviewEWPKonsultingMutate: mutate,
    overviewEWPKonsultingIsLoading: isLoading,
  };
};

export default useOverviewEWPKonsulting;
