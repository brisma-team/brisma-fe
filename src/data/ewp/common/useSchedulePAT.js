import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useSchedulePAT = (params, module) => {
  let { tahun, name, is_audited, ref_metode, ref_tipe, ref_jenis, ref_tema } =
    params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${
    module || undefined
  }/auditor/pat_jadwal?tahun=${tahun}&name=${name}&is_audited=${
    is_audited?.kode || ""
  }&ref_metode=${ref_metode?.kode || ""}&ref_tipe=${
    ref_tipe?.kode || ""
  }&ref_jenis=${ref_jenis?.kode || ""}&ref_tema=${ref_tema?.kode || ""}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    schedulePAT: data,
    schedulePATError: error,
    schedulePATMutate: mutate,
    schedulePATIsLoading: isLoading,
  };
};

export default useSchedulePAT;
