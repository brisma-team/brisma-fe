import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useNegosiasiDetail = (params) => {
  const { id, module } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/${module}/rekomendasi/nego/details/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    negosiasiDetail: data,
    negosiasiDetailError: error,
    negosiasiDetailMutate: mutate,
    negosiasiDetailIsLoading: isLoading,
  };
};

export default useNegosiasiDetail;
