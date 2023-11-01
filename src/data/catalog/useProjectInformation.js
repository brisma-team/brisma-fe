import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useProjectInformation(type, id, source, year) {
  let params = ``;
  if (type == "ewp") {
    params += `?source=${source}&year=${year}`;
  }
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog/${type}/information/${id}`;
  const { data, error, mutate, isLoading } = useSWR(
    type != "ewp" ? path : path + params,
    withTokenFetcher
  );
  return {
    informationData: data,
    informationError: error,
    informationMutate: mutate,
    informationIsLoading: isLoading,
  };
}
