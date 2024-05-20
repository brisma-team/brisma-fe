import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDokumenReporting = (params) => {
  const { id, page_type } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/reporting/dokumen_reporting/${page_type}/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    dokumenReporting: data,
    dokumenReportingError: error,
    dokumenReportingMutate: mutate,
    dokumenReportingIsLoading: isLoading,
  };
};

export default useDokumenReporting;
