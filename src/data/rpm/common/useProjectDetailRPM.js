import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

const useProjectDetailRPM = (params) => {
  const { id, module } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/${module}/projects/details/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    projectDetailRPM: data,
    projectDetailRPMError: error,
    projectDetailRPMMutate: mutate,
    projectDetailRPMIsLoading: isLoading,
  };
};

export default useProjectDetailRPM;
