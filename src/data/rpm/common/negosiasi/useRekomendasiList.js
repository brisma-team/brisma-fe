import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

const useRekomendasiList = (params) => {
  const { id, module, kkpt_id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/${module}/rekomendasi/nego?project_rpm_id=${id}&kkpt_id=${kkpt_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    rekomendasiList: data,
    rekomendasiListError: error,
    rekomendasiListMutate: mutate,
    rekomendasiListIsLoading: isLoading,
  };
};

export default useRekomendasiList;
