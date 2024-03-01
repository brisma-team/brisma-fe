import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAnalisaData = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpa/analisis_data/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    analisaData: data,
    analisaDataError: error,
    analisaDataMutate: mutate,
    analisaDataIsLoading: isLoading,
  };
};

export default useAnalisaData;
