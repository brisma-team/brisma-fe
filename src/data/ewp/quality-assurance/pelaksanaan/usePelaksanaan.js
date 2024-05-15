import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const usePelaksanaan = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/kkpa/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    pelaksanaan: data,
    pelaksanaanError: error,
    pelaksanaanMutate: mutate,
    pelaksanaanIsLoading: isLoading,
  };
};

export default usePelaksanaan;
