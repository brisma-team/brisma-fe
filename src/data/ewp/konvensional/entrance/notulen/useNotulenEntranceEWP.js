import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useNotulenEntranceEWP = (params) => {
  const { notulen_id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/entrance/notulen/${notulen_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    notulenEntranceEWP: data,
    notulenEntranceEWPError: error,
    notulenEntranceEWPMutate: mutate,
    notulenEntranceEWPIsLoading: isLoading,
  };
};

export default useNotulenEntranceEWP;
