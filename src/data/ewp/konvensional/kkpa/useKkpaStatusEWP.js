import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useKkpaStatusEWP = ({ id }) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/kkpa/kkpa-status/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    kkpaStatusEWP: data,
    kkpaStatusEWPError: error,
    kkpaStatusEWPMutate: mutate,
    kkpaStatusEWPIsLoading: isLoading,
  };
};

export default useKkpaStatusEWP;
