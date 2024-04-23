import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useUserSKAI(param, type = "search") {
  let path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/user_skai`;

  if (param && type === "search") {
    path += `/search?${param}`;
  } else if (param && type === "pagination") {
    path += `/all?limit=${param?.limit}&offset=${param?.offset}`;
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
