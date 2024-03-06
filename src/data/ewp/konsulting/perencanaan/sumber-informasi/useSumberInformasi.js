import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useSumberInformasi = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/si/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    sumberInformasi: data,
    sumberInformasiError: error,
    sumberInformasiMutate: mutate,
    sumberInformasiIsLoading: isLoading,
  };
};

export default useSumberInformasi;
