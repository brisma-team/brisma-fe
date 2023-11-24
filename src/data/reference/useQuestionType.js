import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useQuestionType = () => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_jenis_pertanyaan/all`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    questionType: data,
    questionTypeError: error,
    questionTypeMutate: mutate,
    questionTypeIsLoading: isLoading,
  };
};

export default useQuestionType;
