import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useInformation = ({ id }, isOffRevalidate) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher, {
    revalidateOnFocus: !isOffRevalidate,
    revalidateOnReconnect: !isOffRevalidate,
  });

  return {
    information: data,
    informationError: error,
    informationMutate: mutate,
    informationIsLoading: isLoading,
  };
};

export default useInformation;
