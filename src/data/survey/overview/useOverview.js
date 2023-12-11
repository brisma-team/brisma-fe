import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useOverview = (type, params) => {
  const {
    page,
    limit,
    sort_by,
    nama_pembuat,
    pn_responden,
    project_code,
    jenis_survey,
    status_approver,
    status_survey,
    tanggal_dimulai,
    tanggal_selesai,
  } = params;

  let query = "";
  switch (type) {
    case "all":
      query = `?page=${page}&limit=${limit}&sort_by=${sort_by}&nama_pembuat=${nama_pembuat}&pn_responden=${pn_responden}&project_code=${project_code}&status_approver=${status_approver}&status_survey=${status_survey}&jenis_survey=${jenis_survey}&tanggal_dimulai=${tanggal_dimulai}&tanggal_selesai=${tanggal_selesai}`;
      break;
  }
  const path = `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/overview/${type}${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    overview: data,
    overviewError: error,
    overviewMutate: mutate,
    overviewIsLoading: isLoading,
  };
};

export default useOverview;
