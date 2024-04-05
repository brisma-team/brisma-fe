import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDetailRingkasan = (params) => {
  const { addendum_id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/summary/details/${addendum_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    detailRingkasan: data,
    detailRingkasanError: error,
    detailRingkasanMutate: mutate,
    detailRingkasanIsLoading: isLoading,
  };
};

export default useDetailRingkasan;
