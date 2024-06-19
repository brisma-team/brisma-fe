import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDetailAnggaran = (params) => {
  const { id, module } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${module}/addendum/anggaran/details/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    detailAnggaran: data,
    detailAnggaranError: error,
    detailAnggaranMutate: mutate,
    detailAnggaranIsLoading: isLoading,
  };
};

export default useDetailAnggaran;
