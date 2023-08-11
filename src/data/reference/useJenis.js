import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useJenis(type, code) {
  let query = "";
  switch (type) {
    case "all":
      query = `all?mtd_tipe_kode=${code}`;
      break;
    case "list":
      query = `list`;
      break;
  }

  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_jenis/${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    jenis: data,
    jenisError: error,
    jenisMutate: mutate,
    jenisIsLoading: isLoading,
  };
}
