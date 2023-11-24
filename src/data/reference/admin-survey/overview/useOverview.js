import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useOverview = ({ params }) => {
  const {
    page,
    limit,
    sort_by,
    kode,
    judul,
    nama_pembuat,
    status,
    jenis,
    tanggal_pembuatan,
    tanggal_approval,
  } = params;
  let query = `?page=${page}&limit=${limit}&sort_by=${sort_by}&kode=${kode}&judul=${judul}&nama_pembuat=${nama_pembuat}&status=${status}&jenis=${jenis}&tanggal_pembuatan=${tanggal_pembuatan}&tanggal_approval=${tanggal_approval}`;

  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey/all${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    overview: data,
    overviewError: error,
    overviewMutate: mutate,
    overviewIsLoading: isLoading,
  };
};

export default useOverview;
