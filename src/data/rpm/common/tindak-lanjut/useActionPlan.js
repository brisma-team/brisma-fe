import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useActionPlan = (params) => {
  const { id, module } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/${module}/rekomendasi/action_plan/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    actionPlan: data,
    actionPlanError: error,
    actionPlanMutate: mutate,
    actionPlanIsLoading: isLoading,
  };
};

export default useActionPlan;
