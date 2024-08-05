import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useWorkingPaperSample = (params) => {
  const { id, task_type } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/sample/${id}?task_type_kode=${task_type}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    workingPaperSample: data,
    workingPaperSampleError: error,
    workingPaperSampleMutate: mutate,
    workingPaperSampleIsLoading: isLoading,
  };
};

export default useWorkingPaperSample;
