import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useRelatedProject = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/monoff/project_terkait/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    relatedProject: data,
    relatedProjectError: error,
    relatedProjectMutate: mutate,
    relatedProjectIsLoading: isLoading,
  };
};

export default useRelatedProject;
