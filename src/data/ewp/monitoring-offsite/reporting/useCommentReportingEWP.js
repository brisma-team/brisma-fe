import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useCommentReportingEWP = ({ id, bab }) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/monoff/reporting/comment/${id}?ref_bab_kkpa_id=${bab}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    commentReportingEWP: data,
    commentReportingEWPError: error,
    commentReportingEWPMutate: mutate,
    commentReportingEWPIsLoading: isLoading,
  };
};

export default useCommentReportingEWP;
