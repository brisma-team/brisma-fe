import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useTipe(type, code) {
  let query = "";
  switch (type) {
    case "all":
      query = `all?mtd_metode_kode=${code}`;
      break;
    case "list":
      query = `list`;
      break;
  }

  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_tipe/${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    tipe: data,
    tipeError: error,
    tipeMutate: mutate,
    tipeIsLoading: isLoading,
  };
}
