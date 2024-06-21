import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAnalisisPerencanaanProyek = (params) => {
  const { uker_id, orgeh_kode, branch_kode } = params;
  const path = `${
    process.env.NEXT_PUBLIC_API_URL_EWP
  }/ewp/qa/addendum/analisis_perencanaan/ewp_list?uker_id=${uker_id}&orgeh=${orgeh_kode}&branch=${branch_kode}&tahun=${
    params?.tahun || ""
  }&page=${params?.page || 1}&limit=7`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    analisisPerencanaanProyek: data,
    analisisPerencanaanProyekError: error,
    analisisPerencanaanProyekMutate: mutate,
    analisisPerencanaanProyekIsLoading: isLoading,
  };
};

export default useAnalisisPerencanaanProyek;
