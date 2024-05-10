import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useUkerAssessment = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/monoff/mapa/uker_info/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    userAssessment: data,
    userAssessmentError: error,
    userAssessmentMutate: mutate,
    userAssessmentIsLoading: isLoading,
  };
};

export default useUkerAssessment;
