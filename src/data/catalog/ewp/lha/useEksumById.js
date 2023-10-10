import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useEksumById(year, type, id) {
  let parameters = `year=${year}&source=${type}&id=${id}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp/eksum/detail?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    eksumDetail: data,
    eksumDetailError: error,
    eksumDetailMutate: mutate,
    eksumDetailIsLoading: isLoading,
  };
}
