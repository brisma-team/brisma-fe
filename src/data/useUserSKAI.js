import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useUserSKAI(param, type = "search") {
  let path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/user_skai`;
  if (param) {
    if (type === "search") {
      const { pn, name, limit, uka_kode, role_kode, offset } = param;
      const searchParams = new URLSearchParams();

      if (pn) searchParams.append("pn", pn);
      if (name) searchParams.append("name", name);
      if (uka_kode?.value) searchParams.append("uka_kode", uka_kode?.value);
      if (role_kode?.value) searchParams.append("role_kode", role_kode?.value);
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
    userSKAI: data,
    userSKAIError: error,
    userSKAIMutate: mutate,
    userSKAIIsLoading: isLoading,
  };
}
