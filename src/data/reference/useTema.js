import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useTema(code) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_tema/all?mtd_jenis_kode=${code}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    tema: data,
    temaError: error,
    temaMutate: mutate,
    temaIsLoading: isLoading,
  };
}
