import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useHasilAnalisa = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpa/hasil_analisa/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    hasilAnalisa: data,
    hasilAnalisaError: error,
    hasilAnalisaMutate: mutate,
    hasilAnalisaIsLoading: isLoading,
  };
};

export default useHasilAnalisa;
