import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDetailAuditBacklog = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/audit_backlog/details/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    detailAuditBacklog: data,
    detailAuditBacklogError: error,
    detailAuditBacklogMutate: mutate,
    detailAuditBacklogIsLoading: isLoading,
  };
};

export default useDetailAuditBacklog;
