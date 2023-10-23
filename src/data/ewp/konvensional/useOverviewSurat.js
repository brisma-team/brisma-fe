import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useOverviewSurat = (id) => {

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/surat_dio/all/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    suratEWP: data,
    suratEWPError: error,
    suratEWPMutate: mutate,
    suratEWPLoading: isLoading,
  };
};

export default useOverviewSurat;
