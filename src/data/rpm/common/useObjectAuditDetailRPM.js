import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

const useObjectAuditDetailRPM = (params) => {
  const { id, module } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/${module}/projects/kkpt/details/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    objectAuditDetailRPM: data,
    objectAuditDetailRPMError: error,
    objectAuditDetailRPMMutate: mutate,
    objectAuditDetailRPMIsLoading: isLoading,
  };
};

export default useObjectAuditDetailRPM;
