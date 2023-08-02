import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useUkerType(type) {
  let query;
  switch (type) {
    case "all":
      query = `all`;
      break;
    case "list":
      query = `list_uker_type`;
      break;
  }

  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_mapping_uker/${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    ukerType: data,
    ukerTypeError: error,
    ukerTypeMutate: mutate,
    ukerTypeIsLoading: isLoading,
  };
}
