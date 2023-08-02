import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAuditTarget = (id) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/target/all?pat_id=${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    auditTarget: data,
    auditTargetError: error,
    auditTargetMutate: mutate,
    auditTargetIsLoading: isLoading,
  };
};

export default useAuditTarget;
