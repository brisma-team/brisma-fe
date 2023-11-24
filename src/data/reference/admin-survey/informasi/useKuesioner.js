import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useKuesioner = ({ id }) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey/kuesioner/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    kuesioner: data,
    kuesionerError: error,
    kuesionerMutate: mutate,
    kuesionerIsLoading: isLoading,
  };
};

export default useKuesioner;
