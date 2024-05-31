import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useProjectEWPList = (params) => {
  const { module, ref_metode, ref_tipe, project_id, page, limit } = params;
  const path = `${
    process.env.NEXT_PUBLIC_API_URL_RPM
  }/rpm/${module}/projects/list_ewp?page=${page}&limit=${limit}&ref_metode=${
    ref_metode?.kode || ""
  }&ref_tipe=${ref_tipe?.kode || ""}&project_name=${project_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    projectEWPList: data,
    projectEWPListError: error,
    projectEWPListMutate: mutate,
    projectEWPListIsLoading: isLoading,
  };
};

export default useProjectEWPList;
