import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useOverviewPeluangList = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/list/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    overviewPeluangList: data,
    overviewPeluangListError: error,
    overviewPeluangListMutate: mutate,
    overviewPeluangListIsLoading: isLoading,
  };
};

export default useOverviewPeluangList;
