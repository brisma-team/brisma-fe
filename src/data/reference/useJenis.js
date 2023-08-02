import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useJenis(code) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_jenis/all?mtd_tipe_kode=${code}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    jenis: data,
    jenisError: error,
    jenisMutate: mutate,
    jenisIsLoading: isLoading,
  };
}
