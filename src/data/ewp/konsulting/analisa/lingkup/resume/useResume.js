import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useResume = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpa/resume/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    resume: data,
    resumeError: error,
    resumeMutate: mutate,
    resumeIsLoading: isLoading,
  };
};

export default useResume;
