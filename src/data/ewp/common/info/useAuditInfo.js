import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAuditInfo = (params) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${params?.module}/${params?.id}/audit_info`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    auditInfo: data,
    auditInfoError: error,
    auditInfoMutate: mutate,
    auditInfoIsLoading: isLoading,
  };
};

export default useAuditInfo;
