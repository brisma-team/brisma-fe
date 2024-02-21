import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDetailAnggaran = (params) => {
  const { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/anggaran/detail/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    detailAnggaran: data,
    detailAnggaranError: error,
    detailAnggaranMutate: mutate,
    detailAnggaranIsLoading: isLoading,
  };
};

export default useDetailAnggaran;
