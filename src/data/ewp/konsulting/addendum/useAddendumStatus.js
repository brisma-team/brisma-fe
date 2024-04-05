import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAddendumStatus = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/status/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);
  return {
    status: data,
    statusError: error,
    statusMutate: mutate,
    statusIsLoading: isLoading,
  };
};

export default useAddendumStatus;
