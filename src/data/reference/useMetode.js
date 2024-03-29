import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useMetode(type, code) {
  let query = "";
  switch (type) {
    case "all":
      query = `all?mtd_dimensi_kode=${code}`;
      break;
    case "list":
      query = `list`;
      break;
  }

  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_metode/${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    metode: data,
    metodeError: error,
    metodeMutate: mutate,
    metodeIsLoading: isLoading,
  };
}
