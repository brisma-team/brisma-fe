import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useKategoriAnggaran() {
  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/ref_kategori_anggaran`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    kategoriAnggaran: data,
    kategoriAnggaranError: error,
    kategoriAnggaranMutate: mutate,
    kategoriAnggaranIsLoading: isLoading,
  };
}
