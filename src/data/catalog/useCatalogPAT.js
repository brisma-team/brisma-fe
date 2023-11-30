import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useCatalogPAT(
  year,
  type,
  page,
  limit = 5,
  name,
  auditOffice,
  addendum
) {
  let parameters = `year=${year}&source=${1}&pageNum=${page}&pageLimit=${limit}&name=${name}&auditOffice=${auditOffice}&addendum=${addendum}`;
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/pat?${parameters}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    patListData: data,
    patListError: error,
    patListMutate: mutate,
    patListIsLoading: isLoading,
  };
}
