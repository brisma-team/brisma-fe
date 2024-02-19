import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useTimTimeplan = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/tim_audit/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    timTimeplan: data,
    timTimeplanError: error,
    timTimeplanMutate: mutate,
    timTimeplanIsLoading: isLoading,
  };
};

export default useTimTimeplan;
