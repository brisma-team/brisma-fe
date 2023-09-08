import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useActivity = () => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_aktivitas/all`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    activity: data,
    activityError: error,
    activityMutate: mutate,
    activityIsLoading: isLoading,
  };
};

export default useActivity;
