import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useUkerAssessment = (params) => {
  const { id, module } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${module}/addendum/uker/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    ukerAssessment: data,
    ukerAssessmentError: error,
    ukerAssessmentMutate: mutate,
    ukerAssessmentIsLoading: isLoading,
  };
};

export default useUkerAssessment;
