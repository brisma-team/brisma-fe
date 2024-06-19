import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useJadwal = (params) => {
  const { id, module } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${module}/addendum/jadwal/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    jadwal: data,
    jadwalError: error,
    jadwalMutate: mutate,
    jadwalIsLoading: isLoading,
  };
};

export default useJadwal;
