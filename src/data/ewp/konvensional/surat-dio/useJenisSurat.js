import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useJenisSurat = () => {

  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_jenis_surat/all`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    jenisSurat: data,
    jenisSuratError: error,
    jenisSuratMutate: mutate,
    jenisSuratLoading: isLoading,
  };
};

export default useJenisSurat;
