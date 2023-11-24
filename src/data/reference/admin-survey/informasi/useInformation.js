import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useInformation = ({ id }) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    information: data,
    informationError: error,
    informationMutate: mutate,
    informationIsLoading: isLoading,
  };
};

export default useInformation;
