import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useOverviewDetailPeluang = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/detail/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    overviewPeluangDetail: data,
    overviewPeluangDetailError: error,
    overviewPeluangDetailMutate: mutate,
    overviewPeluangDetailIsLoading: isLoading,
  };
};

export default useOverviewDetailPeluang;
