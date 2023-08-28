import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useOverviewEWP = (type, params) => {
  let {
    pages,
    limit,
    tahun,
    name,
    is_audited,
    ref_metode,
    ref_tipe,
    ref_jenis,
    ref_tema,
    sortBy,
  } = params;

  let query = "";
  switch (type) {
    case "all":
      query = `?page=${pages}&limit=${limit}&sortBy=name ${sortBy}&name=${name}&is_audited=${is_audited}&ref_metode=${ref_metode}&ref_tipe=${ref_tipe}&ref_jenis=${ref_jenis}&ref_tema=${ref_tema}`;
      break;
    case "jadwal_pat":
      query = `/pat_jadwal?tahun=${tahun}&name=${name}&is_audited=${is_audited}&ref_metode=${ref_metode}&ref_tipe=${ref_tipe}&ref_jenis=${ref_jenis}&ref_tema=${ref_tema}`;
      break;
    case "tahun_pat":
      query = `/pat_year`;
      break;
  }

  if (!pages) pages = 1;
  if (!limit) limit = 8;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/ewp/auditor${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    overviewEWP: data,
    overviewEWPError: error,
    overviewEWPMutate: mutate,
    overviewEWPIsLoading: isLoading,
  };
};

export default useOverviewEWP;
