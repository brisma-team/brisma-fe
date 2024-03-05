import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useHeaderMatrixData = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/matrix/info_header/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    headerMatrixData: data,
    headerMatrixDataError: error,
    headerMatrixDataMutate: mutate,
    headerMatrixDataIsLoading: isLoading,
  };
};

export default useHeaderMatrixData;
