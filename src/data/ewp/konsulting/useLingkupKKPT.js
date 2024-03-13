import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useLingkupKKPT = (id) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/list/lingkup_pemeriksaan/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    lingkupKKPTData: data,
    lingkupKKPTDataError: error,
    lingkupKKPTDataMutate: mutate,
    lingkupKKPTDataIsLoading: isLoading,
  };
};

export default useLingkupKKPT;
