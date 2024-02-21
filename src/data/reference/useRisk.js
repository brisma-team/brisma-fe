import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useRisk = (type, params) => {
  const { keyword } = params;
  let query = "";
  switch (type) {
    case "all":
      query = `/${keyword}`;
      break;
  }
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_risk_issue${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    risk: data,
    riskError: error,
    riskMutate: mutate,
    riskIsLoading: isLoading,
  };
};

export default useRisk;
