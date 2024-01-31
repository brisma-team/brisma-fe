import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAnswerSimulasiFromRedis = ({ id }) => {
  const path = `${process.env.NEXT_PUBLIC_APP}/api/redis?key=simulasiId-${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    answerSimulasiFromRedis: data,
    answerSimulasiFromRedisError: error,
    answerSimulasiFromRedisMutate: mutate,
    answerSimulasiFromRedisIsLoading: isLoading,
  };
};

export default useAnswerSimulasiFromRedis;
