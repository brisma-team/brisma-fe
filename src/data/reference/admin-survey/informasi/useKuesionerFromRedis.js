import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useKuesionerFromRedis = ({ id }) => {
  const path = `${process.env.NEXT_PUBLIC_APP}/api/redis?key=templateId-${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    kuesionerFromRedis: data,
    kuesionerFromRedisError: error,
    kuesionerFromRedisMutate: mutate,
    kuesionerFromRedisIsLoading: isLoading,
  };
};

export default useKuesionerFromRedis;
