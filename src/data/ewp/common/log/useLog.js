import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useLog = (params) => {
  const { id, module } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${module}/log?module=ewp&module_id=${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    log: data,
    logError: error,
    logMutate: mutate,
    logIsLoading: isLoading,
  };
};

export default useLog;
