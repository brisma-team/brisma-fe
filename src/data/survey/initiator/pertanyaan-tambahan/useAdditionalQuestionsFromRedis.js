import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAdditionalQuestionsFromRedis = ({ id }) => {
  const path = `${process.env.NEXT_PUBLIC_APP}/api/redis?key=additionalQuestionsId-${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    additionalQuestionsFromRedis: data,
    additionalQuestionsFromRedisError: error,
    additionalQuestionsFromRedisMutate: mutate,
    additionalQuestionsFromRedisIsLoading: isLoading,
  };
};

export default useAdditionalQuestionsFromRedis;
