import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useNotification(type, params) {
  const { limit, page } = params;

  let query = "";
  switch (type) {
    case "all":
      query = `?page=${page}&limit=${limit}`;
      break;
    case "detail":
      query = `/details`;
      break;
  }
  const path = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/notifikasi${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    notification: data,
    notificationError: error,
    notificationMutate: mutate,
    notificationIsLoading: isLoading,
  };
}
