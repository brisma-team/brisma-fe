import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useRelatedProjectInfo = (params) => {
  const { id, module } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${
    module || undefined
  }/project_terkait/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    relatedProjectInfo: data,
    relatedProjectInfoError: error,
    relatedProjectInfoMutate: mutate,
    relatedProjectInfoIsLoading: isLoading,
  };
};

export default useRelatedProjectInfo;
