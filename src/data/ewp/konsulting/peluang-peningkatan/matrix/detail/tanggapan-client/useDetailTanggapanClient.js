import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDetailTanggapanClient = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/tanggapan/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    tanggapanClientData: data,
    tanggapanClientDataError: error,
    tanggapanClientDataMutate: mutate,
    tanggapanClientDataIsLoading: isLoading,
  };
};

export default useDetailTanggapanClient;
