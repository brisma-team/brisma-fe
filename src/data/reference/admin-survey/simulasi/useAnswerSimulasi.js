import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAnswerSimulasi = ({ id }) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey/simulasi/kuesioner/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    answerSimulasi: data,
    answerSimulasiError: error,
    answerSimulasiMutate: mutate,
    answerSimulasiIsLoading: isLoading,
  };
};

export default useAnswerSimulasi;
