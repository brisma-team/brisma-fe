import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAuditorDetailEWP = ({ id }) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/ewp/${id}/details`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    auditorDetailEWP: data,
    auditorDetailEWPError: error,
    auditorDetailEWPMutate: mutate,
    auditorDetailEWPIsLoading: isLoading,
  };
};

export default useAuditorDetailEWP;
