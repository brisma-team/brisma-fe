import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useProgramKerja = (params) => {
  const { id, judul_lingkup, pn_pic, risk, control } = params;

  const path = `${
    process.env.NEXT_PUBLIC_API_URL_EWP
  }/ewp/sbp/addendum/program_kerja/${id}?judul_lingkup=${judul_lingkup}&pn_pic=${pn_pic}&risk_kode=${
    risk?.kode || ""
  }&control_kode=${control?.kode || ""}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    programKerja: data,
    programKerjaError: error,
    programKerjaMutate: mutate,
    programKerjaIsLoading: isLoading,
  };
};

export default useProgramKerja;
