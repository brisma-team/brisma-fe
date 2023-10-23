import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useKriteriaAuditKKPA = (params) => {
  const { kkpa_id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/kkpa/kriteria/${kkpa_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    kriteriaAuditKKPA: data,
    kriteriaAuditKKPAError: error,
    kriteriaAuditKKPAMutate: mutate,
    kriteriaAuditKKPAIsLoading: isLoading,
  };
};

export default useKriteriaAuditKKPA;
