import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useEchannel = () => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/echannel/all`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    echannel: data,
    echannelError: error,
    echannelMutate: mutate,
    echannelIsLoading: isLoading,
  };
};

export default useEchannel;
