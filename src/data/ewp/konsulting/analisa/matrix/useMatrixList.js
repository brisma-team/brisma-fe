import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useMatrixList = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpa/rencana_peluang/all/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    matrixList: data,
    matrixListError: error,
    matrixListMutate: mutate,
    matrixListIsLoading: isLoading,
  };
};

export default useMatrixList;
