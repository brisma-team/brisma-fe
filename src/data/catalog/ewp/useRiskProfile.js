import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useRiskProfile(id) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp/risk-profile/detail?id=${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);
  return {
    riskProfileData: data,
    riskProfileError: error,
    riskProfileMutate: mutate,
    riskProfileIsLoading: isLoading,
  };
}
