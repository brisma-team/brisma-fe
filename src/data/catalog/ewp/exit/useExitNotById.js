import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useExitNotById(year, type, id) {
  let parameters = `year=${year}&source=${type}&id=${id}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp/exit-notulen/detail?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    exitNotDetail: data,
    exitNotDetailError: error,
    exitNotDetailMutate: mutate,
    exitNotDetailIsLoading: isLoading,
  };
}
