import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useWorkingPaperDetail = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/detail/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    workingPaperDetail: data,
    workingPaperDetailError: error,
    workingPaperDetailMutate: mutate,
    workingPaperDetailIsLoading: isLoading,
  };
};

export default useWorkingPaperDetail;
