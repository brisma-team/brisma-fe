import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useMetode(code) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_metode/all?mtd_dimensi_kode=${code}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    metode: data,
    metodeError: error,
    metodeMutate: mutate,
    metodeIsLoading: isLoading,
  };
}
