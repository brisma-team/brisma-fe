import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useOverviewRPMKonsulting = (params) => {
  let withParams = `?page=${params?.page}&limit=${params?.limit}&sort=createdAt ${params?.sort_by}`;

  if (params?.project_code != "" && params?.project_code != undefined) {
    withParams += `&project_id=${params?.project_code}`;
  }
  if (params?.project_name != "" && params?.project_name != undefined) {
    withParams += `&nama=${params?.project_name}`;
  }
  if (params?.inisiator?.pn != "" && params?.inisiator?.pn != undefined) {
    withParams += `&pn_initiator=${params?.inisiator?.pn}`;
  }
  if (
    params?.status_persetujuan != "" &&
    params?.status_persetujuan != undefined
  ) {
    withParams += `&status_persetujuan=${params?.status_persetujuan?.kode}`;
  }
  if (params?.tanggal_inisiasi != "" && params?.tanggal_inisiasi != undefined) {
    withParams += `&tanggal_inisiasi=${params?.tanggal_inisiasi}`;
  }

  const path =
    `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/sbp/projects` + withParams;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);
  return {
    overviewRPMKonsulting: data,
    overviewRPMKonsultingError: error,
    overviewRPMKonsultingMutate: mutate,
    overviewRPMKonsultingIsLoading: isLoading,
  };
};

export default useOverviewRPMKonsulting;
