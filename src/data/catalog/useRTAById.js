import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useRTAById(
  year,
  type,
  id,
  kategori = "all",
  limit = null
) {
  let parameters = `year=${year}&source=${type}&id=${id}&kategori=${kategori}`;
  if (limit != null) parameters += `&limit=${limit}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp/rta/detail?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(
    id !== null ? path : null,
    withTokenFetcher
  );

  return {
    rtaDetail: data,
    rtaDetailError: error,
    rtaDetailMutate: mutate,
    rtaDetailIsLoading: isLoading,
  };
}
