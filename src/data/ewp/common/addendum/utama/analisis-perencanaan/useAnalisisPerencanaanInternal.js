import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAnalisisPerencanaanInternal = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/analisis_perencanaan/${id}?is_eksternal=false`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    analisisPerencanaanInternal: data,
    analisisPerencanaanInternalError: error,
    analisisPerencanaanInternalMutate: mutate,
    analisisPerencanaanInternalIsLoading: isLoading,
  };
};

export default useAnalisisPerencanaanInternal;
