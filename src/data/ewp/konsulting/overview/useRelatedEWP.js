import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useRelatedEWP = (params) => {
  const { date, project_name, project_id, ref_tipe, ref_jenis } = params;
  const path = `${
    process.env.NEXT_PUBLIC_API_URL_EWP
  }/ewp/sbp/list?date=${date}&project_name=${project_name}&project_id=${project_id}&ref_tipe=${
    ref_tipe?.kode || ""
  }&ref_jenis=${ref_jenis?.kode || ""}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    relatedEWP: data,
    relatedEWPError: error,
    relatedEWPMutate: mutate,
    relatedEWPIsLoading: isLoading,
  };
};

export default useRelatedEWP;
