import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useRingkasan = (params) => {
  const { id, module } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${module}/addendum/summary/${id}?type=core`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    ringkasan: data,
    ringkasanError: error,
    ringkasanMutate: mutate,
    ringkasanIsLoading: isLoading,
  };
};

export default useRingkasan;
