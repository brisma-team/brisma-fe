import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useRiskIssue = (kode) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_risk_issue/${kode}/all`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    riskIssue: data,
    riskIssueError: error,
    riskIssueMutate: mutate,
    riskIssueIsLoading: isLoading,
  };
};

export default useRiskIssue;
