import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useWorkflow = (type, params) => {
  let { id } = params;

  let query = "";
  switch (type) {
    case "detail":
      query = `?pat_id=${id}`;
      break;
    case "log":
      query = `/log?pat_id=${id}`;
      break;
  }

  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/workflow${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    workflow: data,
    workflowError: error,
    workflowMutate: mutate,
    workflowIsLoading: isLoading,
  };
};

export default useWorkflow;
