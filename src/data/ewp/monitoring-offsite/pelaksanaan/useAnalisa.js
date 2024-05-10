import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAnalisa = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/monoff/kkpa/analisa/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    analisa: data,
    analisaError: error,
    analisaMutate: mutate,
    analisaIsLoading: isLoading,
  };
};

export default useAnalisa;
