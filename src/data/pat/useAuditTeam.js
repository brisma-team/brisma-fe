import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAuditTeam = (type, params) => {
  let {
    id,
    tim_id,
    pages,
    limit,
    tim_name,
    nama_ma,
    nama_kta,
    nama_ata,
    sortBy,
  } = params;

  if (!pages) pages = 1;
  if (!limit) limit = 8;
  let query = "";
  switch (type) {
    case "all":
      query = `/all?pat_id=${id}&page=${pages}&limit=${limit}&sortBy=tim_name ${sortBy}&tim_name=${tim_name}&nama_ma=${nama_ma}&nama_kta=${nama_kta}&nama_ata=${nama_ata}`;
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
