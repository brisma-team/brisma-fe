import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useControlDetail = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/program_kerja/control/detail/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    controlDetail: data,
    controlDetailError: error,
    controlDetailMutate: mutate,
    controlDetailIsLoading: isLoading,
  };
};

export default useControlDetail;
