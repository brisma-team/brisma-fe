import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useLandingEntranceEWP = (params) => {
  const { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/entrance/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    landingEntranceEWP: data,
    landingEntranceEWPError: error,
    landingEntranceEWPMutate: mutate,
    landingEntranceEWPIsLoading: isLoading,
  };
};

export default useLandingEntranceEWP;
