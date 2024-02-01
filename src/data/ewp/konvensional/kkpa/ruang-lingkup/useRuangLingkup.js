import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useRuangLingkupKKPA = ({ kkpa_id }) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/kkpa/ruang-lingkup/${kkpa_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    ruangLingkupKKPA: data,
    ruangLingkupKKPAError: error,
    ruangLingkupKKPAMutate: mutate,
    ruangLingkupKKPAIsLoading: isLoading,
  };
};

export default useRuangLingkupKKPA;
