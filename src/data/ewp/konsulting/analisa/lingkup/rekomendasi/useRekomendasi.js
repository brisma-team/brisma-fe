import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useRekomendasi = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpa/rekomendasi/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    rekomendasi: data,
    rekomendasiError: error,
    rekomendasiMutate: mutate,
    rekomendasiIsLoading: isLoading,
  };
};

export default useRekomendasi;
