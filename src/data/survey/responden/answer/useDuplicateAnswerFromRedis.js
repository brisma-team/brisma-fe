import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDuplicateAnswerFromRedis = ({ surveyId, pn }) => {
  const path = `${process.env.NEXT_PUBLIC_APP}/api/duplicateRedis?key=surveyId-${surveyId}|user-${pn}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    duplicateAnswerFromRedis: data,
    duplicateAnswerFromRedisError: error,
    duplicateAnswerFromRedisMutate: mutate,
    duplicateAnswerFromRedisIsLoading: isLoading,
  };
};

export default useDuplicateAnswerFromRedis;
