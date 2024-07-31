import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useWorkingPaper = (params) => {
  const { id, sprint_id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/list/${id}?sprint_id=${sprint_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    workingPaper: data,
    workingPaperError: error,
    workingPaperMutate: mutate,
    workingPaperIsLoading: isLoading,
  };
};

export default useWorkingPaper;
