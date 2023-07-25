import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useUserSKAI(param) {
  let path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/user_skai`;

  if (param) {
    path += `/search?${param}`;
  } else {
    path += "/all";
  }

  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    userSKAI: data,
    userSKAIError: error,
    userSKAIMutate: mutate,
    userSKAIIsLoading: isLoading,
  };
}
