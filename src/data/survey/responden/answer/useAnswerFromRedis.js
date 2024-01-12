import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAnswerFromRedis = ({ surveyId, pn }) => {
  const path = `${process.env.NEXT_PUBLIC_APP}/api/redis?key=surveyId-${surveyId}|user-${pn}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    answerFromRedis: data,
    answerFromRedisError: error,
    answerFromRedisMutate: mutate,
    answerFromRedisIsLoading: isLoading,
  };
};

export default useAnswerFromRedis;
