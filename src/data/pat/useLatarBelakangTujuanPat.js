import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useLatarBelakangTujuanPat = (id) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/ltb?pat_id=${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    latarBelakangTujuanPat: data,
    latarBelakangTujuanPatError: error,
    latarBelakangTujuanPatMutate: mutate,
    latarBelakangTujuanPatIsLoading: isLoading,
  };
};

export default useLatarBelakangTujuanPat;
