import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useTujuan = (params) => {
  const { id, module } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${module}/addendum/tujuan/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    tujuan: data,
    tujuanError: error,
    tujuanMutate: mutate,
    tujuanIsLoading: isLoading,
  };
};

export default useTujuan;
