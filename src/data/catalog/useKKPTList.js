import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useKKPTList(
  year,
  type,
  id,
  page,
  limit = 5,
  kkpttitle,
  uker,
  activity,
  subactivity,
  submajor,
  riskissue,
  auditor
) {
  let filters = ``;
  if (kkpttitle) {
    filters += `&kkpttitle=${kkpttitle}`;
  }
  if (uker) {
    filters += `&uker=${uker}`;
  }
  if (activity) {
    filters += `&activity=${activity}`;
  }
  if (subactivity) {
    filters += `&subactivity=${subactivity}`;
  }
  if (submajor) {
    filters += `&submajor=${submajor}`;
  }
  if (riskissue) {
    filters += `&riskissue=${riskissue}`;
  }
  if (auditor) {
    filters += `&auditor=${auditor}`;
  }
  let parameters =
    `year=${year}&source=${type}&id=${id}&page=${page}&limit=${limit}` +
    filters;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp/kkpt?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(
    id !== null ? path : null,
    withTokenFetcher
  );
  return {
    kkptList: data,
    kkptListError: error,
    kkptListMutate: mutate,
    kkptListIsLoading: isLoading,
  };
}
