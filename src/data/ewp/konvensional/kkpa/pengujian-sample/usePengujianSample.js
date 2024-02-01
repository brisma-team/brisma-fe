import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const usePengujianSampleKKPA = ({ kkpa_id }) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/kkpa/pengujian-sample/${kkpa_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    pengujianSampleKKPA: data,
    pengujianSampleKKPAError: error,
    pengujianSampleKKPAMutate: mutate,
    pengujianSampleKKPAIsLoading: isLoading,
  };
};

export default usePengujianSampleKKPA;
