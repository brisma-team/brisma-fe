import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useTema(type, code) {
  let query = "";
  switch (type) {
    case "all":
      query = `all?mtd_jenis_kode=${code}`;
      break;
    case "list":
      query = `list`;
      break;
  }

  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_tema/${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    tema: data,
    temaError: error,
    temaMutate: mutate,
    temaIsLoading: isLoading,
  };
}
