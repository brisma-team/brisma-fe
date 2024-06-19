import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAnggaran = (params) => {
  const { id, module } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${module}/addendum/anggaran/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    anggaran: data,
    anggaranError: error,
    anggaranMutate: mutate,
    anggaranIsLoading: isLoading,
  };
};

export default useAnggaran;
