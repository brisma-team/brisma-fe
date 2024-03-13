import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useKKPTRekomendasi = (params) => {
  const { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/kkpt_rekomendasi/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    rekomendasiData: data,
    rekomendasiError: error,
    rekomendasiMutate: mutate,
    rekomendasiIsLoading: isLoading,
  };
};

export default useKKPTRekomendasi;
