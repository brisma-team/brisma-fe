import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useViewAllKKPA(
  year,
  type,
  id,
  activity = "",
  subactivity = "",
  submajor = "",
  riskissue = "",
  auditor = ""
) {
  let parameters = `year=${year}&source=${type}&id=${id}&activity=${activity}&subactivity=${subactivity}&submajor=${submajor}&riskissue=${riskissue}&auditor=${auditor}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp/kkpa/detail-all?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(
    id !== null ? path : null,
    withTokenFetcher
  );

  return {
    kkpaAllDetail: data,
    kkpaAllDetailError: error,
    kkpaAllDetailMutate: mutate,
    kkpaAllDetailIsLoading: isLoading,
  };
}
