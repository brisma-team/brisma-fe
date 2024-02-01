import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDuplicateAnswerSimulasiFromRedis = ({ id }) => {
  const path = `${process.env.NEXT_PUBLIC_APP}/api/duplicateRedis?key=simulasiId-${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    duplicateAnswerSimulasiFromRedis: data,
    duplicateAnswerSimulasiFromRedisError: error,
    duplicateAnswerSimulasiFromRedisMutate: mutate,
    duplicateAnswerSimulasiFromRedisIsLoading: isLoading,
  };
};

export default useDuplicateAnswerSimulasiFromRedis;
