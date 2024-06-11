import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

const useSummary = (params) => {
  const { id, module, kkpt_id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/${module}/rekomendasi?project_rpm_id=${id}&kkpt_id=${kkpt_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    summary: data,
    summaryError: error,
    summaryMutate: mutate,
    summaryIsLoading: isLoading,
  };
};

export default useSummary;
