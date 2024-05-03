import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useTim = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/mapa/tim_audit/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    tim: data,
    timError: error,
    timMutate: mutate,
    timIsLoading: isLoading,
  };
};

export default useTim;
