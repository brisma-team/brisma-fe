import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useMatrixDetail = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpa/rencana_peluang/detail/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    matrixDetail: data,
    matrixDetailError: error,
    matrixDetailMutate: mutate,
    matrixDetailIsLoading: isLoading,
  };
};

export default useMatrixDetail;
