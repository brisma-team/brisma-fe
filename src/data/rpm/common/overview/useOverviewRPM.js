import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useOverviewRPM = (params) => {
  const {
    module,
    page,
    limit,
    sort_by,
    project_code,
    project_name,
    status_approval,
    pic_initiator,
    pic_submitter,
    pic_evaluator,
    pic_negotiator,
  } = params;

  const path = `${
    process.env.NEXT_PUBLIC_API_URL_RPM
  }/rpm/${module}/projects?page=${page}&limit=${limit}&sort_by=createdAt ${sort_by}&project_code=${project_code}&project_name=${project_name}&status_approval=${
    status_approval || ""
  }&pic_initiator=${pic_initiator?.pn || ""}&pic_submitter=${
    pic_submitter?.pn || ""
  }&evaluator=${pic_evaluator?.pn || ""}&pic_negotiator=${
    pic_negotiator?.pn || ""
  }`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);
  return {
    overviewRPM: data,
    overviewRPMError: error,
    overviewRPMMutate: mutate,
    overviewRPMIsLoading: isLoading,
  };
};

export default useOverviewRPM;
