import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useTipe(code) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_tipe/all?mtd_metode_kode=${code}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    tipe: data,
    tipeError: error,
    tipeMutate: mutate,
    tipeIsLoading: isLoading,
  };
}
