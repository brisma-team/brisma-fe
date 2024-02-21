import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useLingkupPemeriksaan = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/lingkup_pemeriksaan/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    lingkupPemeriksaan: data,
    lingkupPemeriksaanError: error,
    lingkupPemeriksaanMutate: mutate,
    lingkupPemeriksaanIsLoading: isLoading,
  };
};

export default useLingkupPemeriksaan;
