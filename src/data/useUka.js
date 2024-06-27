import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useUka(param = "", type = "") {
  let path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/uka`;
  if (param) {
    if (type === "search") {
      const { uka_kode, name, branch, orgeh, limit, offset } = param;
      const searchParams = new URLSearchParams();

      if (uka_kode) searchParams.append("kode", uka_kode);
      if (name) searchParams.append("name", name);
      if (branch?.value)
        searchParams.append("branch", branch?.value?.branch_kode);
      if (orgeh?.value) searchParams.append("orgeh", orgeh?.value?.orgeh_kode);
      if (limit) searchParams.append("limit", limit);
      if (offset) searchParams.append("offset", offset);

      path += `/search?${searchParams.toString()}`;
    } else if (type === "pagination") {
      const { limit, offset } = param;
      path += `/all?${new URLSearchParams({ limit, offset }).toString()}`;
    }
  } else {
    path += `/all`;
  }
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    uka: data,
    ukaError: error,
    ukaMutate: mutate,
    ukaIsLoading: isLoading,
  };
}
