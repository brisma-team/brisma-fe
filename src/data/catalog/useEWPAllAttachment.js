import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useEWPAllAttachment(year, type, id, page, limit = 5) {
  let parameters = `year=${year}&source=${type}&id=${id}&page=${page}&limit=${limit}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp/all-attachment?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(
    id !== null ? path : null,
    withTokenFetcher
  );

  return {
    allAttachmentData: data,
    allAttachmentError: error,
    allAttachmentMutate: mutate,
    allAttachmentIsLoading: isLoading,
  };
}
