import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAuditBacklog = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/audit_backlog/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    auditBacklog: data,
    auditBacklogError: error,
    auditBacklogMutate: mutate,
    auditBacklogIsLoading: isLoading,
  };
};

export default useAuditBacklog;
