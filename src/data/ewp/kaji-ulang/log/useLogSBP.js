import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useLogSBP = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/kaji-ulang/log?module=ewp&module_id=${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    logSBP: data,
    logSBPError: error,
    logSBPMutate: mutate,
    logSBPIsLoading: isLoading,
  };
};

export default useLogSBP;
