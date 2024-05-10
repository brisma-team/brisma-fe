import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useLandingStatus = (params) => {
  const { id, module, submodule } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${module}/${submodule}/status/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    landingStatus: data,
    landingStatusError: error,
    landingStatusMutate: mutate,
    landingStatusIsLoading: isLoading,
  };
};

export default useLandingStatus;
