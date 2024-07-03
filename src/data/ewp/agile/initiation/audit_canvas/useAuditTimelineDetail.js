import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAuditTimelineDetail = (params) => {
  const { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/assesment/audit_canvas/audit_timeline/details/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    auditTimelineDetail: data,
    auditTimelineDetailError: error,
    auditTimelineDetailMutate: mutate,
    auditTimelineDetailIsLoading: isLoading,
  };
};

export default useAuditTimelineDetail;
