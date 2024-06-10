import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useGetApprovalProjectPAT = (temp_id) => {
  const path =
    `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/ewp/need_approval/` + temp_id;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    workflowTempData: data,
    workflowTempDataError: error,
    workflowTempDataMutate: mutate,
    workflowTempDataIsLoading: isLoading,
  };
};

export default useGetApprovalProjectPAT;
