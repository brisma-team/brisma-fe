import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useKertasKerjaAnalisa = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/analisis_perencanaan/project/analisa/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    kertasKerjaAnalisa: data,
    kertasKerjaAnalisaError: error,
    kertasKerjaAnalisaMutate: mutate,
    kertasKerjaAnalisaIsLoading: isLoading,
  };
};

export default useKertasKerjaAnalisa;
