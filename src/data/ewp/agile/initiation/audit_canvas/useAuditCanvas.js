import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAuditCanvas = (params) => {
  const { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/assesment/audit_canvas/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    auditCanvas: data,
    auditCanvasError: error,
    auditCanvasMutate: mutate,
    auditCanvasIsLoading: isLoading,
  };
};

export default useAuditCanvas;
