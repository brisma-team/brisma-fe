import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useDownload(year, id) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/attachment/ewp/${year}/${id}`;
  const { data, error, mutate, isLoading } = useSWR(
    id !== null ? path : null,
    withTokenFetcher
  );

  return {
    downloadData: data,
    downloadDataError: error,
    downloadDataMutate: mutate,
    downloadDataIsLoading: isLoading,
  };
}
