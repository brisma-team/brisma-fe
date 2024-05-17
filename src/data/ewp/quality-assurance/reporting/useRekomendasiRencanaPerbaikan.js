import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useRekomendasiRencanaPerbaikan = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/reporting/dokumen_reporting/rekomendasi/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    rekomendasiRencanaPerbaikan: data,
    rekomendasiRencanaPerbaikanError: error,
    rekomendasiRencanaPerbaikanMutate: mutate,
    rekomendasiRencanaPerbaikanIsLoading: isLoading,
  };
};

export default useRekomendasiRencanaPerbaikan;
