import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useProjectDetail = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/${id}/audit_info`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    projectDetail: data,
    projectDetailError: error,
    projectDetailMutate: mutate,
    projectDetailIsLoading: isLoading,
  };
};

export default useProjectDetail;
