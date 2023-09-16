import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useRoleList() {
  const path = `${process.env.NEXT_PUBLIC_API_URL_DASHBOARD}/admin/getUserRoleList`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);
  return {
    role: data,
    roleError: error,
    roleMutate: mutate,
    roleIsLoading: isLoading,
  };
}
