import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useBeritaAcaraEntranceEWP = (params) => {
  const { ba_id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/entrance/ba/${ba_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    beritaAcaraEntranceEWP: data,
    beritaAcaraEntranceEWPError: error,
    beritaAcaraEntranceEWPMutate: mutate,
    beritaAcaraEntranceEWPIsLoading: isLoading,
  };
};

export default useBeritaAcaraEntranceEWP;
