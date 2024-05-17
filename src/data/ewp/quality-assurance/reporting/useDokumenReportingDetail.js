import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDokumenReportingDetail = (params) => {
  const { id, page_type } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/reporting/dokumen_reporting/${page_type}/details/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    dokumenReportingDetail: data,
    dokumenReportingDetailError: error,
    dokumenReportingDetailMutate: mutate,
    dokumenReportingDetailIsLoading: isLoading,
  };
};

export default useDokumenReportingDetail;
