import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useRiskControl(type, params) {
  const { search, limit } = params;
  let query = "";
  switch (type) {
    case "all":
      query = `/all?search=${search}&limit=${limit}`;
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
