import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDetailRingkasan = (params) => {
  const { id, module } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${module}/addendum/summary/details/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    detailRingkasan: data,
    detailRingkasanError: error,
    detailRingkasanMutate: mutate,
    detailRingkasanIsLoading: isLoading,
  };
};

export default useDetailRingkasan;
