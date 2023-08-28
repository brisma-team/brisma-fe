import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAuditorEWP = ({ id }) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/ewp/${id}/audit_info`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    auditorEWP: data,
    auditorEWPError: error,
    auditorEWPMutate: mutate,
    auditorEWPIsLoading: isLoading,
  };
};

export default useAuditorEWP;
