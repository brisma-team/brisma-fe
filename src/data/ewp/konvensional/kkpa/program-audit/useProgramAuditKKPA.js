import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useProgramAuditKKPA = (params) => {
  const { kkpa_id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/kkpa/program-audit/${kkpa_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    programAuditKKPA: data,
    programAuditKKPAError: error,
    programAuditKKPAMutate: mutate,
    programAuditKKPAIsLoading: isLoading,
  };
};

export default useProgramAuditKKPA;
