import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

const useRekomendasiList = (params) => {
  const { id, module, kkpt_id, status_action_plan, status_persetujuan } =
    params;

  const path = `${
    process.env.NEXT_PUBLIC_API_URL_RPM
  }/rpm/${module}/rekomendasi?project_rpm_id=${id}&kkpt_id=${kkpt_id}&status_action_plan=${
    status_action_plan || ""
  }&status_persetujuan_evaluasi=${status_persetujuan || ""}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    rekomendasiList: data,
    rekomendasiListError: error,
    rekomendasiListMutate: mutate,
    rekomendasiListIsLoading: isLoading,
  };
};

export default useRekomendasiList;
