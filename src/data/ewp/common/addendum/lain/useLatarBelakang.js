import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useLatarBelakang = (params) => {
  const { id, module } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${module}/addendum/latar_belakang/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    latarBelakang: data,
    latarBelakangError: error,
    latarBelakangMutate: mutate,
    latarBelakangIsLoading: isLoading,
  };
};

export default useLatarBelakang;
