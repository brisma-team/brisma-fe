import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useControlList = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/program_kerja/control/list/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    controlList: data,
    controlListError: error,
    controlListMutate: mutate,
    controlListIsLoading: isLoading,
  };
};

export default useControlList;
