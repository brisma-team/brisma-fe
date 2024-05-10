import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const usePerencanaaanStatus = (params) => {
  const { type, id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/monoff/${type}/status/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    perencanaaanStatus: data,
    perencanaaanStatusError: error,
    perencanaaanStatusMutate: mutate,
    perencanaaanStatusIsLoading: isLoading,
  };
};

export default usePerencanaaanStatus;
