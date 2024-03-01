import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useLingkupAnalisa = (params) => {
  const { id, auditor, lingkup, risk, control, status } = params;
  const path = `${
    process.env.NEXT_PUBLIC_API_URL_EWP
  }/ewp/sbp/kkpa/list/${id}?is_na&auditor=${
    auditor?.pn || ""
  }&lingkup=${lingkup}&risk=${risk?.kode || ""}&control=${
    control?.kode || ""
  }&status=${status?.kode || ""}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    lingkupAnalisa: data,
    lingkupAnalisaError: error,
    lingkupAnalisaMutate: mutate,
    lingkupAnalisaIsLoading: isLoading,
  };
};

export default useLingkupAnalisa;
