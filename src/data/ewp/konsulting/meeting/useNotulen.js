import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useNotulen = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/meeting/notulen/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    notulen: data,
    notulenError: error,
    notulenMutate: mutate,
    notulenIsLoading: isLoading,
  };
};

export default useNotulen;
