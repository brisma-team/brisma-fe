import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useUkerAssessmentInfo = (params) => {
  const { id, module } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${
    module || undefined
  }/uker_info/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    ukerAssessmentInfo: data,
    ukerAssessmentInfoError: error,
    ukerAssessmentInfoMutate: mutate,
    ukerAssessmentInfoIsLoading: isLoading,
  };
};

export default useUkerAssessmentInfo;
