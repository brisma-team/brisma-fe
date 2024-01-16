import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAuditTeam = (type, params) => {
  let {
    id,
    tim_id,
    tim_name,
    nama_ma,
    nama_kta,
    nama_ata,
    sort_by,
    limit,
    page,
  } = params;

  let query = "";
  switch (type) {
    case "all":
      query = `/all?pat_id=${id}&page=${page}&limit=${limit}&sortBy=tim_name ${sort_by}&tim_name=${tim_name}&nama_ma=${nama_ma}&nama_kta=${nama_kta}&nama_ata=${nama_ata}`;
      break;
    case "detail":
      query = `?tim_id=${tim_id}&pat_id=${id}`;
      break;
    case "list":
      query = `/list?pat_id=${id}`;
      break;
  }

  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/tim_audit${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    auditTeam: data,
    auditTeamError: error,
    auditTeamMutate: mutate,
    auditTeamIsLoading: isLoading,
  };
};

export default useAuditTeam;
