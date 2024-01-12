import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useUser(isOffRevalidate) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_AUTH}/login`;
  const { data, error, mutate } = useSWR(path, withTokenFetcher, {
    revalidateOnFocus: !isOffRevalidate,
    revalidateOnReconnect: !isOffRevalidate,
  });

  return {
    user: data,
    userError: error,
    userMutate: mutate,
  };
}
