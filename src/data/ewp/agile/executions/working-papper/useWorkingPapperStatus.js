import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useWorkingPapperStatus = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/detail/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    workingPapperStatus: data,
    workingPapperStatusError: error,
    workingPapperStatusMutate: mutate,
    workingPapperStatusIsLoading: isLoading,
  };
};

export default useWorkingPapperStatus;
