import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDetailTask = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/task/detail/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    detailTask: data,
    detailTaskError: error,
    detailTaskMutate: mutate,
    detailTaskIsLoading: isLoading,
  };
};

export default useDetailTask;
