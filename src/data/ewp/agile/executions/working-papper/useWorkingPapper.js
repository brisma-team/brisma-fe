import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useWorkingPapper = (params) => {
  const { id, sprint_id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/list/${id}?sprint_id=${sprint_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    workingPapper: data,
    workingPapperError: error,
    workingPapperMutate: mutate,
    workingPapperIsLoading: isLoading,
  };
};

export default useWorkingPapper;
