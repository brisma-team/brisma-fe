import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useKKPAList(
  year,
  type,
  id,
  page,
  limit = 5,
  activity,
  subactivity,
  submajor,
  riskissue,
  auditor
) {
  let filters = ``;
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
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/ewp/kkpa?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    kkpaList: data,
    kkpaListError: error,
    kkpaListMutate: mutate,
    kkpaListIsLoading: isLoading,
  };
}
