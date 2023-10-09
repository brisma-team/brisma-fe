import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useRiskControl(type) {
  let query = "";
  switch (type) {
    case "all":
      query = `/all`;
      break;
  }

  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_control${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    riskControl: data,
    riskControlError: error,
    riskControlMutate: mutate,
    riskControlIsLoading: isLoading,
  };
}
