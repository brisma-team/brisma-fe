import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useRTAById(
  year,
  type,
  id,
  kategori = "all",
  limit = null,
  kkpttitle = "",
  uker = "",
  activity = "",
  subactivity = "",
  submajor = "",
  riskissue = "",
  auditor = ""
) {
  let parameters = `year=${year}&source=${type}&id=${id}&kategori=${kategori}&kkpttitle=${kkpttitle}&uker=${uker}&activity=${activity}&subactivity=${subactivity}&submajor=${submajor}&riskissue=${riskissue}&auditor=${auditor}`;
  if (limit != null) parameters += `&limit=${limit}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp/rta/detail?${parameters}`;
  const { data, error, mutate, isLoading, isValidating } = useSWR(
    id !== null ? path : null,
    withTokenFetcher
  );

  return {
    rtaDetail: data,
    rtaDetailError: error,
    rtaDetailMutate: mutate,
    rtaDetailIsLoading: isLoading,
    rtaDetailIsValidating: isValidating,
  };
}
