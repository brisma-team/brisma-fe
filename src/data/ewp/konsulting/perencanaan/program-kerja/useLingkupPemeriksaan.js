import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useLingkupPemeriksaan = (params) => {
  const { id, judul_lingkup, pn_pic, risk, control } = params;

  const path = `${
    process.env.NEXT_PUBLIC_API_URL_EWP
  }/ewp/sbp/mapa/lingkup_pemeriksaan/${id}?judul_lingkup=${judul_lingkup}&pn_pic=${pn_pic}&risk_kode=${
    risk?.kode || ""
  }&control_kode=${control?.kode || ""}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    lingkupPemeriksaan: data,
    lingkupPemeriksaanError: error,
    lingkupPemeriksaanMutate: mutate,
    lingkupPemeriksaanIsLoading: isLoading,
  };
};

export default useLingkupPemeriksaan;
