import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useLandingStatus = (id) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/status/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    landingStatus: data,
    landingStatusError: error,
    landingStatusMutate: mutate,
    landingStatusIsLoading: isLoading,
  };
};

export default useLandingStatus;
